param (
    [string]$action
)

function Run-Infra {
    cd .\infra
    .\powershell\run-infra.ps1
    cd ..
}

function Run-Backend {
    cd .\backend
    .\powershell\backendrun.ps1
    cd ..
}

function Run-Full {
    cd .\infra
    .\powershell\run-full.ps1
    cd ..
}

function Down {
    cd .\infra
    .\powershell\down.ps1
    cd ..
}

function Build-E2E {
  cd .\e2e
  .\powershell\build-site.ps1
  cd ..
}

function Build {
    cd .\frontend
    .\powershell\build-cms.ps1
    cd ..

    cd .\frontend
    .\powershell\build-site.ps1
    cd ..

    cd .\backend
    .\powershell\build.ps1
    cd ..
}

# Call the specified function based on the provided action
& $action
