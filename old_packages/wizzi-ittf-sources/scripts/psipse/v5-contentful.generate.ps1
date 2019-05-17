clear
cd c:\my\wizzi\v5\apps\contentful\wizzimodel-docs
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 0 )
{
    robocopy c:\my\wizzi\v5\apps\latin\dist c:\my\wizzi\v5\test\contentful /MIR /XD .git, node_modules
}

if ( 0 )
{
    cd c:\my\wizzi\v5\test\contentful
    mocha tests/**/*.js --full-trace
}