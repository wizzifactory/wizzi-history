clear
cd C:\My\wizzi\v5\kernel\wizzi-repo\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist c:\my\wizzi\v6\test\node_modules\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist c:\my\wizzi\v6\node_modules\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist c:\my\wizzi\v5\apps\node_modules\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules 
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist c:\my\wizzi\v5\github\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist c:\my\wizzi\v5\apps\wizzi-studio\wizzi-play2\app\node_modules\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( 0 )
{
    cd c:\my\wizzi\v6\node_modules\wizzi-repo
    mocha tests/**/*.js --full-trace
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\node_modules\wizzi-repo\examples
    node mongoFile
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\node_modules\wizzi-repo\examples
    node mongoFsDb
    node mongoFsImpl
    node mongoDocument
    node mongoFile
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\node_modules\wizzi-repo\examples
    <#node jsonFsImpl
    node jsonFsJson
    node jsonDocument
    node jsonComponents#>
    node jsonComponents
}


<#
#>