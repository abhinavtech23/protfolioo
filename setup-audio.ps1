# Abhinav Portfolio — Audio Setup Script
# Copies the identified high-fidelity sound files from Downloads into the project public folder.

$projectRoot = "c:\Users\dell\portfolio abhinav"
$destDir = "$projectRoot\public\audio"
$downloadsDir = "c:\Users\dell\Downloads"

# Create audio directory if it doesn't exist
New-Item -ItemType Directory -Force -Path $destDir | Out-Null

$audioMap = @{
    "alexis_gaming_cam-camera-shutter-346101.mp3" = "flipbook_sfx.mp3"
    "dragon-studio-boom-copyright-free-487662.mp3" = "cinematic_boom.mp3"
    "aberrantrealities-cinematic-whoosh-sweep-airy-transition-effect-01-407104.mp3" = "metallic_sheen.mp3"
}

Write-Host "`n=== Copying audio files ===" -ForegroundColor Cyan

foreach ($entry in $audioMap.GetEnumerator()) {
    $src = Join-Path $downloadsDir $entry.Key
    $dest = Join-Path $destDir $entry.Value

    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dest -Force
        Write-Host "  [OK] $($entry.Key) -> $($entry.Value)" -ForegroundColor Green
    } else {
        Write-Host "  [SKIP] Not found in Downloads: $($entry.Key)" -ForegroundColor Yellow
    }
}

Write-Host "`n=== Audio setup complete! ===" -ForegroundColor Green
