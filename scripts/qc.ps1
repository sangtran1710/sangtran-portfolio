# Portfolio QC Tester - sangtran-portfolio-v2
# Run: powershell -ExecutionPolicy Bypass -File scripts\qc.ps1

param([string]$Url = "http://localhost:3000")

$ROOT = Split-Path -Parent $PSScriptRoot
$PASS = 0; $FAIL = 0; $WARN = 0

function Check {
    param([string]$Label, [bool]$Ok, [string]$Detail = "")
    if ($Ok) {
        Write-Host "  [PASS] $Label $Detail" -ForegroundColor Green
        $script:PASS++
    } else {
        Write-Host "  [FAIL] $Label $Detail" -ForegroundColor Red
        $script:FAIL++
    }
}

function HttpStatus {
    param([string]$Uri)
    try {
        $r = Invoke-WebRequest -Uri $Uri -Method Head -TimeoutSec 6 -UseBasicParsing -ErrorAction Stop
        return [int]$r.StatusCode
    } catch {
        $code = $_.Exception.Response.StatusCode.value__
        if ($code) { return [int]$code } else { return 0 }
    }
}

function FileBytes {
    param([string]$Path)
    if (Test-Path $Path) { return (Get-Item $Path).Length } else { return -1 }
}

function GrepCode {
    param([string]$Pattern)
    $files = Get-ChildItem -Path $ROOT -Include "*.ts","*.tsx" -Recurse -ErrorAction SilentlyContinue
    foreach ($f in $files) {
        if (Select-String -Path $f.FullName -Pattern $Pattern -Quiet -ErrorAction SilentlyContinue) {
            return $true
        }
    }
    return $false
}

# == 1. DEV SERVER ==
Write-Host ""
Write-Host "=== 1. DEV SERVER ===" -ForegroundColor Cyan
$serverUp = (HttpStatus $Url) -eq 200
Check "Dev server running at $Url" $serverUp
if (-not $serverUp) {
    Write-Host "  Server not running. Start with: npm run dev" -ForegroundColor Red
    exit 1
}

# == 2. PAGES ==
Write-Host ""
Write-Host "=== 2. PAGES ===" -ForegroundColor Cyan
$pages = @("/", "/projects", "/about")
foreach ($p in $pages) {
    $s = HttpStatus "$Url$p"
    Check "Page '$p' returns 200" ($s -eq 200) "(got $s)"
}

# == 3. VIDEO ==
Write-Host ""
Write-Host "=== 3. VIDEO ===" -ForegroundColor Cyan
$videoPath = "$ROOT\public\video\reel_final.mp4"
$videoBytes = FileBytes $videoPath
$videoMB = [math]::Round($videoBytes / 1MB, 1)
Check "reel_final.mp4 on disk (>1MB)" ($videoBytes -gt 1000000) "(${videoMB}MB)"

$vidStatus = HttpStatus "$Url/video/reel_final.mp4"
Check "reel_final.mp4 HTTP 200" ($vidStatus -eq 200) "(got $vidStatus)"

$staleRef = GrepCode "showreel\.mp4"
Check "No stale 'showreel.mp4' in code" (-not $staleRef)

# == 4. RnD IMAGES ==
Write-Host ""
Write-Host "=== 4. RnD IMAGES ===" -ForegroundColor Cyan
$rndImages = @(
    "/images/LevelUp.png",
    "/images/ETH.png",
    "/images/Iphone%2011.png",
    "/images/FoodCourt.png",
    "/images/SmartMenu.png"
)
foreach ($img in $rndImages) {
    $name = ($img -split "/")[-1]
    $s = HttpStatus "$Url$img"
    Check "$name HTTP 200" ($s -eq 200) "(got $s)"
}

# == 5. BROKEN FILE REFERENCES ==
Write-Host ""
Write-Host "=== 5. BROKEN FILE REFS ===" -ForegroundColor Cyan
$badFiles = @("havoc-proof-01.png","havoc-proof-02.png","havoc-proof-03.png","havoc-proof-04.png","placeholder.png")
foreach ($bad in $badFiles) {
    $found = GrepCode [regex]::Escape($bad)
    Check "'$bad' not referenced in code" (-not $found)
}

# == 6. KEY FILES EXIST ==
Write-Host ""
Write-Host "=== 6. KEY FILES ===" -ForegroundColor Cyan
$keyFiles = @(
    "components\PageLoader.tsx",
    "components\home\HeroSection.tsx",
    "components\home\ShowreelSection.tsx",
    "components\home\RndSection.tsx",
    "components\home\FeaturedProjects.tsx",
    "components\home\StudioLogoStrip.tsx",
    "data\portfolio.ts",
    "app\layout.tsx",
    "app\globals.css"
)
foreach ($f in $keyFiles) {
    Check "$f exists" (Test-Path "$ROOT\$f")
}

# == 7. CODE INTEGRITY ==
Write-Host ""
Write-Host "=== 7. CODE INTEGRITY ===" -ForegroundColor Cyan

$layout = Get-Content "$ROOT\app\layout.tsx" -Raw -ErrorAction SilentlyContinue
Check "PageLoader imported in layout.tsx" ($layout -match "PageLoader")
Check "PageLoader rendered in layout.tsx" ($layout -match "<PageLoader")

$portfolio = Get-Content "$ROOT\data\portfolio.ts" -Raw -ErrorAction SilentlyContinue
Check "showreelUrl = reel_final.mp4" ($portfolio -match "reel_final\.mp4")

$heroSrc = Get-Content "$ROOT\components\home\HeroSection.tsx" -Raw -ErrorAction SilentlyContinue
Check "HeroSection uses HERO.showreelUrl" ($heroSrc -match "showreelUrl")

$rndSrc = Get-Content "$ROOT\components\home\RndSection.tsx" -Raw -ErrorAction SilentlyContinue
Check "RndSection imports RND_PROJECTS" ($rndSrc -match "RND_PROJECTS")
Check "RndSection has id='rnd'" ($rndSrc -match 'id="rnd"')

# == 8. JS BUNDLE ==
Write-Host ""
Write-Host "=== 8. JS BUNDLE ===" -ForegroundColor Cyan
$html = (Invoke-WebRequest -Uri $Url -UseBasicParsing -ErrorAction SilentlyContinue).Content
if ($html) {
    $jsMatch = [regex]::Match($html, '/_next/static/chunks/main-app\.js[^"]*')
    if ($jsMatch.Success) {
        $jsUrl = $Url + $jsMatch.Value
        $jsStatus = HttpStatus $jsUrl
        Check "main-app.js bundle loads 200" ($jsStatus -eq 200) "(got $jsStatus)"
    } else {
        Write-Host "  [WARN] main-app.js not in HTML (normal in some dev states)" -ForegroundColor Yellow
        $script:WARN++
    }
} else {
    Write-Host "  [WARN] Could not fetch HTML to check JS bundle" -ForegroundColor Yellow
    $script:WARN++
}

# == SUMMARY ==
Write-Host ""
Write-Host "==========================================" -ForegroundColor White
if ($FAIL -eq 0) {
    Write-Host "  QC PASSED: $PASS checks OK, $WARN warnings" -ForegroundColor Green
    Write-Host "  Ready for user: $Url" -ForegroundColor Green
} else {
    Write-Host "  QC FAILED: $FAIL errors must be fixed first" -ForegroundColor Red
    Write-Host "  Passed=$PASS  Failed=$FAIL  Warnings=$WARN" -ForegroundColor Yellow
}
Write-Host "==========================================" -ForegroundColor White
Write-Host ""

exit $FAIL
