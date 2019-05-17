clear
<# $TaskName = ‘base|webpack’ #>
$TaskName = ‘base’

cd C:\My\wizzi\v5\kernel\wizzi\src
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
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist c:\my\wizzi\v6\test\wizzi /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist c:\my\wizzi\v6\node_modules\wizzi /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist c:\my\wizzi\v5\apps\node_modules\wizzi /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist c:\my\wizzi\v5\github\stfnbssl\typescript-wizzi\node_modules\wizzi /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist c:\my\wizzi\v5\github\wizzi-demo\node_modules\wizzi /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist c:\my\wizzi\v5\apps\wizzi-studio\dist\node_modules\wizzi /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( $TaskName -eq 'webpack' -And 1 )
{
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist_webpack c:\my\wizzi\webpack\node_modules\wizzi /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist_webpack c:\my\wizzi\v5\github\stfnbssl\ts-wizzi-standalone\node_modules\wizzi /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\wizzi\examples\io
    node index
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\wizzi\examples\light
    <#node index#>
    node index_json
}

if ( $TaskName -eq 'base' -And 1 )
{
    cd c:\my\wizzi\v6\test\wizzi\examples\fromText
    node index
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\wizzi
    mocha tests/**/*.js --full-trace
}