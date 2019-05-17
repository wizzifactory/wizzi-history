clear

cd C:\My\wizzi\v4\kernel\wizzi-mtree\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v4\kernel\wizzi-mtree\dist c:\my\wizzi\v5\test\wizzi-mtree /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\kernel\wizzi-mtree\dist c:\my\wizzi\v5\node_modules\wizzi-mtree /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\kernel\wizzi-mtree\dist c:\my\wizzi\v5\apps\node_modules\wizzi-mtree /MIR /XD .git, node_modules
}

if ( 1 ) 
{
    cd c:\my\wizzi\v5\test\wizzi-mtree\examples\loader
    node step_5_go
}

if ( 0 ) 
{
    cd c:\my\wizzi\v5\test\wizzi-mtree
    mocha tests/**/*.js --full-trace
}

<#
    cd c:\my\wizzi\v5\test\wizzi-mtree\examples\loader
#>