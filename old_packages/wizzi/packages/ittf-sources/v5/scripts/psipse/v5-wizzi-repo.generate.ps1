clear
<# $TaskName = ‘base|webpack’ #>
$TaskName = ‘base’

cd C:\My\wizzi\v5\kernel\wizzi-repo\src
if ( $TaskName -eq 'base' ) {
    node generate base
}
ElseIf ( $TaskName -eq 'webpack' ) {
    node generate webpack
}

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( $TaskName -eq 'base' -And 1 )
{
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist c:\my\wizzi\v6\test\node_modules\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist c:\my\wizzi\v6\node_modules\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist c:\my\wizzi\v5\apps\node_modules\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules 
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist c:\my\wizzi\v5\apps\wizzi-studio\dist\node_modules\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist c:\my\wizzi\v5\apps\wizzi-studio\dist\node_modules\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist c:\my\wizzi\v5\github\stfnbssl\packy\node_modules\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( $TaskName -eq 'webpack' -And 1 )
{
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist_webpack c:\my\wizzi\webpack\node_modules\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist_webpack c:\my\wizzi\v5\github\stfnbssl\ts-wizzi-standalone\node_modules\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\node_modules\wizzi-repo
    mocha tests/**/*.js --full-trace
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\node_modules\wizzi-repo\examples
    node mongoFile
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\node_modules\wizzi-repo\examples
    node mongoFsDb
    node mongoFsImpl
    node mongoDocument
    node mongoFile
}

if ( $TaskName -eq 'base' -And 1 )
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