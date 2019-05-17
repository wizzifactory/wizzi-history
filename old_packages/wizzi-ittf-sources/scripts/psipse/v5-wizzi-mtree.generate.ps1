clear

cd C:\My\wizzi\v5\kernel\wizzi-mtree\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist c:\my\wizzi\v6\test\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist c:\my\wizzi\v6\node_modules\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist c:\my\wizzi\v5\apps\node_modules\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist c:\my\wizzi\v5\github\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist c:\my\wizzi\v5\apps\wizzi-studio\wizzi-play2\app\node_modules\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( 0 ) 
{
    cd c:\my\wizzi\v6\test\wizzi-mtree\examples\loader
    node step_2_go
}

if ( 0 ) 
{
    cd c:\my\wizzi\v6\test\wizzi-mtree\examples\jswizzi
    node quick
}

if ( 1 ) 
{
    cd c:\my\wizzi\v6\test\wizzi-mtree
    mocha tests/**/*.js --full-trace
}

<#
#>