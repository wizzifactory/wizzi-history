clear
cd C:\My\wizzi\v4\plugins\wizzi-docs\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v4\plugins\wizzi-docs\dist c:\my\wizzi\v5\test\wizzi-docs /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\plugins\wizzi-docs\dist c:\my\wizzi\v5\node_modules\wizzi-docs /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi-docs\examples\md
    node index
}

if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi-docs
    mocha tests/**/*.js --full-trace
}

<#
#>