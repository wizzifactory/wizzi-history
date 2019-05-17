clear
cd c:\my\wizzi\v5\apps\wizzi-ui\wizzi

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
    robocopy C:\My\wizzi\v5\apps\wizzi-ui\app c:\my\wizzi\v5\github\wizzi\packages\wizzi-ui /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v5\apps\wizzi-ui\app
    <#
    npm install
    npm run build
    #>
    npm install
    npm run build
    robocopy C:\My\wizzi\v5\apps\wizzi-ui\app\wizzifactory.github.io C:\My\wizzi\v5\apps\wizzi-studio\dist\server\static\wizzi-ui /MIR /XD .git, node_modules
}