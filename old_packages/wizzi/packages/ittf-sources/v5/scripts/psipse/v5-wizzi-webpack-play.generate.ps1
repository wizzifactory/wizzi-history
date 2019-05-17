clear

if ( 0 )
{
    cd c:\my\wizzi\v5\apps\wizzi-webpack\wizzi-play\wizzi
    node generate
}

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    cd c:\my\wizzi\v5\apps\wizzi-webpack\wizzi-standalone\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd c:\my\wizzi\webpack\wizzi-standalone\app
    <#npm install#>
    npm run build
    copy-item c:\my\wizzi\webpack\wizzi-standalone\app\scripts\wizzi.standalone.js C:\My\wizzi\v5\apps\wizzi-studio\dist\server\static\wizzi-play\scripts\wizzi.standalone.js -Force
    copy-item c:\my\wizzi\webpack\wizzi-standalone\app\scripts\wizzi.standalone.js C:\My\wizzi\v5\github\wizzifactory.github.io\wizzi-play\scripts\wizzi.standalone.js -Force
    copy-item c:\my\wizzi\webpack\wizzi-standalone\app\scripts\wizzi.standalone.js C:\My\wizzi\v5\github\wizzifactory.github.io\scripts\wizzi.standalone.js -Force
}