clear
cd C:\My\wizzi\v5\plugins\wizzi-meta\src
node generate -a

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v5\plugins\wizzi-meta\dist c:\my\wizzi\v6\test\wizzi-meta /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-meta\dist c:\my\wizzi\v6\node_modules\wizzi-meta /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-meta\dist c:\my\wizzi\v5\apps\node_modules\wizzi-meta /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-meta\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-meta /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-meta\examples\wfstudio
    node index
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-meta\examples\docs
    node index
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-meta
    mocha tests/**/*.js --full-trace
}

<#
#>