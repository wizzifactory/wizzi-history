clear
cd c:\my\wizzi\v5\apps\wizzi-play\wizzi

if ( 1 )
{
    node generate
}

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy C:\My\wizzi\v5\apps\wizzi-play\app c:\my\wizzi\v5\github\wizzi\packages\wizzi-play /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v5\apps\wizzi-play\app
    npm run build
    <#npm run build#>
    robocopy C:\My\wizzi\v5\apps\wizzi-play\app\wizzifactory.github.io C:\My\wizzi\v5\apps\wizzi-studio\dist\server\static\wizzi-play /MIR /XD .git, node_modules
    robocopy C:\My\wizzi\v5\apps\wizzi-play\app\wizzifactory.github.io C:\My\wizzi\v5\github\wizzifactory.github.io\wizzi-play /MIR /XD .git, node_modules
}

if ( 0 ) {
    <#mkdir c:\my\wizzi\v5\apps\wizzi-studio\wizzi-play3\app\src\store\json#>
    copy-item C:\My\wizzi\v6\node_modules\wizzi-js\lib\wizzi\models\js-schema.g.json c:\my\wizzi\v5\apps\wizzi-play\app\src\store\json\js-schema.g.json -Force
    copy-item C:\My\wizzi\v6\node_modules\wizzi-web\lib\wizzi\models\html-schema.g.json c:\my\wizzi\v5\apps\wizzi-play\app\src\store\json\html-schema.g.json -Force
    copy-item C:\My\wizzi\v6\node_modules\wizzi-web\lib\wizzi\models\css-schema.g.json c:\my\wizzi\v5\apps\wizzi-play\app\src\store\json\css-schema.g.json -Force
    copy-item C:\My\wizzi\v6\node_modules\wizzi-web\lib\wizzi\models\svg-schema.g.json c:\my\wizzi\v5\apps\wizzi-play\app\src\store\json\svg-schema.g.json -Force
    copy-item C:\My\wizzi\v6\node_modules\wizzi-web\lib\wizzi\models\md-schema.g.json c:\my\wizzi\v5\apps\wizzi-play\app\src\store\json\md-schema.g.json -Force
}