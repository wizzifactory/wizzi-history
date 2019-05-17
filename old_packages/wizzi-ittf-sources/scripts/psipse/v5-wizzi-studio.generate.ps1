clear
cd c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-express\wizzi

if ( 1 )
{
    node generate
}

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 0 )
{
    robocopy c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-express\dist c:\my\wizzi\v5\test\wizzi-studio /MIR /XD .git, node_modules, server/static
}

if ( 0 )
{
    cd c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor
    node generate
}

if ( 0 )
{
    cd c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-express\dist
    mocha tests/**/*.js --full-trace
}