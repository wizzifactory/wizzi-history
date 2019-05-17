clear

if ( 1 )
{
    <# NOW - STAtic #>
    cd C:\my\wizzi\v5\apps\js-tutorials\now\static\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd C:\my\wizzi\v5\apps\js-tutorials\now\static\dist
    <#npm install now -g
    now#>
}


if ( 0 )
{
    <# webpack react-create-app #>
    cd C:\my\wizzi\v5\apps\js-tutorials\webpack\react-create-app\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd C:\my\wizzi\v5\apps\js-tutorials\webpack\react-create-app\app\src
    <#npm run build
    npm install
    npm start#>
    npm run build
}

if ( 0 )
{
    <# wizzi playground uploads #>
    cd C:\my\wizzi\v5\apps\js-tutorials\nodejs-es6\es6-firebase\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd C:\my\wizzi\v5\apps\js-tutorials\nodejs-es6\es6-firebase\app\src
    <#npm run build
    npm install
    npm start#>
    npm run build
    node ../dist/src/index.js
}

if ( 0 )
{
    cd c:\my\wizzi\v5\apps\js-tutorials\webpack\router-redux-firestore\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd c:\my\wizzi\v5\apps\js-tutorials\webpack\router-redux-firestore\app\src
    <#npm install
    npm run build#>
}