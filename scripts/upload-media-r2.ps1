<#
.SYNOPSIS
Uploads all video files under public/ to a Cloudflare R2 bucket with immutable caching.

.EXAMPLE
npx wrangler login
.\scripts\upload-media-r2.ps1 -Bucket "henry-vfx-media"
#>
param(
  [Parameter(Mandatory = $true)]
  [string]$Bucket
)

$ErrorActionPreference = "Stop"
$publicDir = Join-Path $PSScriptRoot "..\public"
$publicRoot = (Resolve-Path $publicDir).Path

$videos = Get-ChildItem -Path $publicRoot -Recurse -File -Include *.mp4, *.webm
Write-Host "Found $($videos.Count) video files under public/."

foreach ($file in $videos) {
  $key = $file.FullName.Substring($publicRoot.Length + 1).Replace("\", "/")
  $contentType = if ($file.Extension -eq ".webm") { "video/webm" } else { "video/mp4" }

  Write-Host "Uploading $key ($contentType)..."
  npx wrangler r2 object put "$Bucket/$key" `
    --file "$($file.FullName)" `
    --content-type "$contentType" `
    --cache-control "public, max-age=31536000, immutable" `
    --remote
}

Write-Host "Done. Set NEXT_PUBLIC_MEDIA_BASE_URL to your R2 custom domain (e.g. https://media.henry-vfx.com)."
