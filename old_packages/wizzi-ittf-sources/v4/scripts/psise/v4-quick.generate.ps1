clear
cd C:\My\wizzi\v4\demo\quick\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v4\demo\quick\dist c:\my\wizzi\v5\test\quick /MIR /XD .git, node_modules
}

if (1)
{
    cd c:\my\wizzi\v5\test\quick\examples
    node index
}

if (0)
{
    cd c:\my\wizzi\v5\test\quick
    mocha tests/**/*.js --full-trace
}