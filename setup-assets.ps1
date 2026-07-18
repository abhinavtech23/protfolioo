# Abhinav Portfolio — Asset Setup Script
# Run this once from the project root to copy & rename images for the intro montage.

$projectRoot = "c:\Users\dell\portfolio abhinav"
$srcDir = "$projectRoot\assests"
$destDir = "$projectRoot\public\images\montage"
$resumeDir = "$projectRoot\public\resume"

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path $destDir | Out-Null
New-Item -ItemType Directory -Force -Path $resumeDir | Out-Null

# Define source → destination mapping
$imageMap = @{
    "WhatsApp Image 2026-05-03 at 14.24.28 (1).jpeg" = "montage-01.jpg"
    "WhatsApp Image 2026-05-03 at 14.24.28.jpeg" = "montage-02.jpg"
    "WhatsApp Image 2026-05-03 at 14.24.29.jpeg" = "montage-03.jpg"
    "1765946888223.jfif" = "montage-04.jpg"
    "1767188481439.jfif" = "montage-05.jpg"
    "1767188508937.jfif" = "montage-06.jpg"
    "1767188527840.jfif" = "montage-07.jpg"
    "1767188536061.jfif" = "montage-08.jpg"
    "1772471818681.jfif" = "montage-09.jpg"
    "1773663045482.jfif" = "montage-10.jpg"
    "1773663045730.jfif" = "montage-11.jpg"
}

Write-Host "`n=== Copying montage images ===" -ForegroundColor Cyan

foreach ($entry in $imageMap.GetEnumerator()) {
    $src = Join-Path $srcDir $entry.Key
    $dest = Join-Path $destDir $entry.Value

    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dest -Force
        Write-Host "  [OK] $($entry.Key) -> $($entry.Value)" -ForegroundColor Green
    } else {
        Write-Host "  [SKIP] Not found: $($entry.Key)" -ForegroundColor Yellow
    }
}

# Copy resume
$resumeSrc = Join-Path $srcDir "Abhinav_Tiwari_Resume_Google_v3.pdf"
$resumeDest = Join-Path $resumeDir "Abhinav_Tiwari_Resume.pdf"

Write-Host "`n=== Copying resume ===" -ForegroundColor Cyan
if (Test-Path $resumeSrc) {
    Copy-Item -Path $resumeSrc -Destination $resumeDest -Force
    Write-Host "  [OK] Resume copied" -ForegroundColor Green
} else {
    Write-Host "  [SKIP] Resume not found" -ForegroundColor Yellow
}

Write-Host "`n=== Asset setup complete! ===" -ForegroundColor Green
Write-Host "Next: Run 'npm install' then 'npm run dev'`n"
