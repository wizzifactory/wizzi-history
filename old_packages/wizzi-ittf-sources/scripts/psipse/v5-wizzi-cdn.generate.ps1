clear

if ( 1 )
{
    cd c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-static\wizzi
    node generate
}

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 0 )
{
    robocopy c:\my\wizzi\v5\apps\wizzi-studio-nextjs\dist c:\my\wizzi\v5\test\wizzi-cdn /MIR /XD .git, node_modules
}

if ( 0 ) {
    <#mkdir c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-static\app\src\store\json#>
    copy-item C:\My\wizzi\v6\node_modules\wizzi-js\lib\wizzi\models\js-schema.g.json c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-static\app\src\store\json\js-schema.g.json -Force
    copy-item C:\My\wizzi\v6\node_modules\wizzi-web\lib\wizzi\models\web-schema.g.json c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-static\app\src\store\json\web-schema.g.json -Force
}

if ( 0 )
{
    cd c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-static\app
    <#npm install#>
    npm run build
}

if ( 0 )
{
    cd C:\My\wizzi\v5\apps\wizzi-studio\wizzi-studio-static\app\cdn\wizzi
    <#npm install#>
    npm run build
    cd C:\My\wizzi\v5\apps\wizzi-studio\wizzi-studio-static\app\cdn\wizzi-js
    <#npm install#>
    npm run build
    cd C:\My\wizzi\v5\apps\wizzi-studio\wizzi-studio-static\app\cdn\wizzi-web
    <#npm install#>
    npm run build
}
if ( 1 )
{
    copy-item c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-static\wizzi\ittf\images\loading_animation.gif C:\My\wizzi\v5\apps\wizzi-studio\wizzi-studio-static\app\wizzifactory.github.io\images\loading_animation.gif -Force
}