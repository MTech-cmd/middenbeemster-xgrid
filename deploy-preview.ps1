# deploy-preview.ps1
# Bouwt beide designs en zet ze als voorblad op GitHub Pages
# Gebruik: vanuit de repo root: .\deploy-preview.ps1

$ErrorActionPreference = "Stop"
$repoRoot = $PSScriptRoot

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Midden-Beemster Design Preview Deploy" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Stap 0: Huidige branch onthouden
Set-Location $repoRoot
$currentBranch = (git rev-parse --abbrev-ref HEAD).Trim()
Write-Host "[1/6] Huidige branch: $currentBranch" -ForegroundColor Yellow

# Check of er uncommitted wijzigingen zijn
$statusOutput = git status --porcelain
$didStash = $false
if ($statusOutput) {
    Write-Host "      Uncommitted wijzigingen gevonden - tijdelijk opslaan (stash)..." -ForegroundColor DarkYellow
    git stash push -m "deploy-preview temp stash"
    $didStash = $true
}

# Tijdelijke output map aanmaken
$outDir = Join-Path $repoRoot "preview-dist"
if (Test-Path $outDir) {
    Remove-Item $outDir -Recurse -Force
}
New-Item -ItemType Directory -Path $outDir | Out-Null

# Stap 1: Design 2 bouwen (huidige branch)
Write-Host ""
Write-Host "[2/6] Design 2 bouwen (branch: $currentBranch)..." -ForegroundColor Yellow

Set-Location (Join-Path $repoRoot "client")
npx vite build --base "/middenbeemster-xgrid/design2/"

$design2Src = Join-Path $repoRoot "client\dist"
$design2Dst = Join-Path $outDir "design2"
Copy-Item $design2Src $design2Dst -Recurse -Force
Write-Host "      Design 2 klaar -> preview-dist/design2/" -ForegroundColor Green

# Stap 2: Design 1 bouwen (homepageDesign2 branch)
Write-Host ""
Write-Host "[3/6] Wisselen naar branch homepageDesign2 voor Design 1..." -ForegroundColor Yellow

Set-Location $repoRoot
git checkout homepageDesign2

Set-Location (Join-Path $repoRoot "client")
Write-Host "      npm install voor Design 1..." -ForegroundColor DarkYellow
npm install --silent
npx vite build --base "/middenbeemster-xgrid/design1/"

$design1Src = Join-Path $repoRoot "client\dist"
$design1Dst = Join-Path $outDir "design1"
Copy-Item $design1Src $design1Dst -Recurse -Force
Write-Host "      Design 1 klaar -> preview-dist/design1/" -ForegroundColor Green

# Stap 3: Terug naar originele branch
Write-Host ""
Write-Host "[4/6] Terug naar branch: $currentBranch..." -ForegroundColor Yellow

Set-Location $repoRoot
git checkout $currentBranch

if ($didStash) {
    Write-Host "      Stash terugplaatsen..." -ForegroundColor DarkYellow
    git stash pop
}

# Stap 4: Landingspagina kopiëren
Write-Host ""
Write-Host "[5/6] Landingspagina toevoegen..." -ForegroundColor Yellow

$landingPage = Join-Path $repoRoot "preview\index.html"
Copy-Item $landingPage (Join-Path $outDir "index.html") -Force
Write-Host "      preview/index.html -> preview-dist/index.html" -ForegroundColor Green

# Stap 5: Deployen naar gh-pages
Write-Host ""
Write-Host "[6/6] Deployen naar GitHub Pages (gh-pages branch)..." -ForegroundColor Yellow

Set-Location (Join-Path $repoRoot "client")
npx gh-pages --dist "..\preview-dist" --dotfiles --message "Deploy design preview landing page"

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Deploy klaar!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Voorblad : https://mtech-cmd.github.io/middenbeemster-xgrid/" -ForegroundColor Cyan
Write-Host "  Design 1 : https://mtech-cmd.github.io/middenbeemster-xgrid/design1/" -ForegroundColor Cyan
Write-Host "  Design 2 : https://mtech-cmd.github.io/middenbeemster-xgrid/design2/" -ForegroundColor Cyan
Write-Host ""
Write-Host "  (GitHub Pages kan 1-2 minuten nodig hebben om bij te werken)" -ForegroundColor DarkYellow
Write-Host ""

# Opruimen
Set-Location $repoRoot
Remove-Item $outDir -Recurse -Force
Write-Host "  Tijdelijke map preview-dist/ verwijderd." -ForegroundColor DarkGray
