clear
<# $TaskName = ‘base|webpack’ #>
$TaskName = ‘base’

cd C:\My\wizzi\v5\kernel\wizzi-mtree\src
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
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist c:\my\wizzi\v6\test\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist c:\my\wizzi\v6\node_modules\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist c:\my\wizzi\v5\apps\node_modules\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist c:\my\wizzi\v5\github\wizzi-demo\node_modules\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist c:\my\wizzi\v5\apps\wizzi-play\app\node_modules\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist_webpack c:\my\wizzi\v5\apps\wizzi-studio\dist\node_modules\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( $TaskName -eq 'webpack' -And 1 )
{
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist_webpack c:\my\wizzi\webpack\node_modules\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist_webpack c:\my\wizzi\v5\github\stfnbssl\ts-wizzi-standalone\node_modules\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-mtree\examples
    node loader
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-mtree\examples\loader
    node step_2_go
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-mtree\examples\jswizzi
    node quick
}

if ( $TaskName -eq 'base' -And 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-mtree
    mocha tests/**/*.js --full-trace
}

<#
#>