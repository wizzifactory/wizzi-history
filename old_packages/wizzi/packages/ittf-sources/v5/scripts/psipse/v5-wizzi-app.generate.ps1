clear
cd c:\my\wizzi\v5\apps\wizzi-app\wizzi

if ( 1 )
{
    node generate
}

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 ) {
    <#mkdir c:\my\wizzi\v5\apps\wizzi-app\app\src\store\json#>
    copy-item C:\My\wizzi\v6\node_modules\wizzi-js\lib\wizzi\models\js-schema.g.json c:\my\wizzi\v5\apps\wizzi-app\app\src\store\json\js-schema.g.json -Force
    copy-item C:\My\wizzi\v6\node_modules\wizzi-web\lib\wizzi\models\html-schema.g.json c:\my\wizzi\v5\apps\wizzi-app\app\src\store\json\html-schema.g.json -Force
    copy-item C:\My\wizzi\v6\node_modules\wizzi-web\lib\wizzi\models\css-schema.g.json c:\my\wizzi\v5\apps\wizzi-app\app\src\store\json\css-schema.g.json -Force
    copy-item C:\My\wizzi\v6\node_modules\wizzi-web\lib\wizzi\models\svg-schema.g.json c:\my\wizzi\v5\apps\wizzi-app\app\src\store\json\svg-schema.g.json -Force
    copy-item C:\My\wizzi\v6\node_modules\wizzi-web\lib\wizzi\models\md-schema.g.json c:\my\wizzi\v5\apps\wizzi-app\app\src\store\json\md-schema.g.json -Force
}

if ( 1 )
{
    robocopy C:\My\wizzi\v5\apps\wizzi-app\app c:\my\wizzi\v5\github\wizzi\packages\wizzi-app /MIR /XD .git, node_modules
}

if ( 0 )
{
    cd c:\my\wizzi\v5\apps\wizzi-app\app
    npm install
}


