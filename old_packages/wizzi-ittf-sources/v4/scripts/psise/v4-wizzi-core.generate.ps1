clear
cd C:\My\wizzi\v4\plugins\wizzi-core\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v4\plugins\wizzi-core\dist c:\my\wizzi\v5\test\wizzi-core /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\plugins\wizzi-core\dist c:\my\wizzi\v5\node_modules\wizzi-core /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\plugins\wizzi-core\dist c:\my\wizzi\v5\apps\node_modules\wizzi-core /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi-core\examples
    node index
    cd c:\my\wizzi\v5\test\wizzi-core\examples\legacy
    node index
}

if ( 0 )
{
    cd c:\my\wizzi\v5\test\wizzi-core
    mocha tests/**/*.js --full-trace
}

<#
#>