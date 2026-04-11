# Clean verification for AI/code agents.
# Run from repo root: npm run verify

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$NextDir = Join-Path $Root ".next"
$BuildLog = Join-Path $env:TEMP "sangtran-portfolio-build.log"

function Fail {
    param([string]$Message)
    Write-Host ""
    Write-Host "[FAIL] $Message" -ForegroundColor Red
    exit 1
}

function Assert-PathInsideRoot {
    param([string]$Path)
    $resolved = (Resolve-Path $Path -ErrorAction SilentlyContinue)
    if (-not $resolved) {
        return
    }

    $fullPath = $resolved.Path
    if (-not $fullPath.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
        Fail "Refusing to touch path outside repo: $fullPath"
    }
}

Set-Location $Root

$devServer = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
    Select-Object -First 1

if ($devServer) {
    $process = Get-Process -Id $devServer.OwningProcess -ErrorAction SilentlyContinue
    $processName = if ($process) { $process.ProcessName } else { "unknown" }
    Fail "Port 3000 is already used by PID $($devServer.OwningProcess) ($processName). Stop npm run dev before clean build verification, then restart it after verify passes."
}

Write-Host "[INFO] Running npm run lint..." -ForegroundColor Cyan
& npm run lint
if ($LASTEXITCODE -ne 0) {
    Fail "npm run lint failed. Fix lint warnings/errors before handoff."
}

if (Test-Path $NextDir) {
    Assert-PathInsideRoot $NextDir
    Write-Host "[INFO] Removing stale .next before build..." -ForegroundColor Cyan
    Remove-Item -LiteralPath $NextDir -Recurse -Force
}

Write-Host "[INFO] Running npm run build..." -ForegroundColor Cyan
$output = & npm run build 2>&1
$exitCode = $LASTEXITCODE
$output | Tee-Object -FilePath $BuildLog

if ($exitCode -ne 0) {
    Fail "npm run build failed. See log: $BuildLog"
}

$warningLines = $output | Select-String -Pattern "(?i)\bwarn(ing)?\b"
if ($warningLines) {
    Write-Host ""
    Write-Host "[WARNINGS DETECTED]" -ForegroundColor Yellow
    $warningLines | ForEach-Object { Write-Host $_.Line -ForegroundColor Yellow }
    Fail "Build completed with warnings. Treat warnings as failures and fix them before handing off."
}

Write-Host ""
Write-Host "[PASS] Clean build completed with zero warnings." -ForegroundColor Green
