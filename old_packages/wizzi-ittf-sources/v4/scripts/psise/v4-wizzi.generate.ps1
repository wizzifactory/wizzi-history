clear

cd C:\My\wizzi\v4\kernel\wizzi\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v4\kernel\wizzi\dist c:\my\wizzi\v5\test\wizzi /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\kernel\wizzi\dist c:\my\wizzi\v5\node_modules\wizzi /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\kernel\wizzi\dist c:\my\wizzi\v5\apps\node_modules\wizzi /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi
    mocha tests/**/*.js --full-trace
}