clear
cd c:\my\wizzi\v5\apps\wizzi-studio\wizzi

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
    <#robocopy c:\my\wizzi\v5\apps\wizzi-studio\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-studio /MIR /XD .git, node_modules, server/static#>
    robocopy c:\my\wizzi\v5\apps\wizzi-studio\dist c:\my\wizzi\v5\github\wizzi-studio /MIR /XD .git, node_modules, server/static
}

if ( 0 )
{
    cd c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor
    node generate
}

if ( 0 )
{
    cd c:\my\wizzi\v5\apps\wizzi-studio\dist
    mocha tests/**/*.js --full-trace
}