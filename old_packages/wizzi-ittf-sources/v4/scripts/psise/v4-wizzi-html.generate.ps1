clear

cd C:\My\wizzi\v4\plugins\wizzi-html\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v4\plugins\wizzi-html\dist c:\my\wizzi\v5\test\wizzi-html /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\plugins\wizzi-html\dist c:\my\wizzi\v5\node_modules\wizzi-html /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi-html\examples
    node index
}

if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi-html
    mocha tests/**/*.js --full-trace
}