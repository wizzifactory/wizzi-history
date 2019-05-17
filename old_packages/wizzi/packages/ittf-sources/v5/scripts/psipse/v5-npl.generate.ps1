clear
cd c:\my\wizzi\v5\apps\npl\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 0 )
{
    robocopy c:\my\wizzi\v5\apps\npl\dist c:\my\wizzi\v5\test\npl /MIR /XD .git, node_modules
}

if ( 0 )
{
    cd c:\my\wizzi\v5\test\npl
    mocha tests/**/*.js --full-trace
}