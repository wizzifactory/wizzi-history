clear
cd c:\my\wizzi\v5\apps\latin\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 0 )
{
    robocopy c:\my\wizzi\v5\apps\latin\dist c:\my\wizzi\v5\test\latin /MIR /XD .git, node_modules
}

if ( 0 )
{
    cd c:\my\wizzi\v5\test\latin
    mocha tests/**/*.js --full-trace
}