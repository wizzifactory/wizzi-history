clear
<# $TaskName = ‘base|webpack|browser’ #>
$TaskName = ‘base’

cd C:\My\wizzi\v5\kernel\wizzi-utils\src
if ( $TaskName -eq 'base' ) {
    node generate
}
ElseIf ( $TaskName -eq 'webpack' ) {
    node generate_webpack
}
ElseIf ( $TaskName -eq 'browser' ) {
    node generate_browser
}

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( $TaskName -eq 'base' -And 1 )
{
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v6\test\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v6\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v7\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v5\apps\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist C:\My\wizzi\v5\apps\wizzi-studio\dist\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v5\github\wizzi-demo\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v5\github\stfnbssl\typescript-wizzi\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v5\github\stfnbssl\packy\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( $TaskName -eq 'webpack' -And 1 )
{
    <#
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist_webpack c:\my\wizzi\v6\test\wizzi-utils-webpack /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist_webpack c:\my\wizzi\v6\node_modules\wizzi-utils-webpack /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist_webpack c:\my\wizzi\v5\apps\node_modules\wizzi-utils-webpack /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    #>
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist_webpack c:\my\wizzi\webpack\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist_webpack c:\my\wizzi\v5\apps\wizzi-play\app\cdn\wizzi-tools-plugin\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist_webpack c:\my\wizzi\v5\github\stfnbssl\ts-wizzi-standalone\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist_webpack c:\my\wizzi\v5\github\stfnbssl\typescript-browserfs-git\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( $TaskName -eq 'browser' -And 1 )
{
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist_webpack c:\my\wizzi\v5\github\wizzi-browser /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-utils\examples
    
    node scanners
    <#
    node ittfTree
    node scanners
    node prettifiers
    node asisloader
    #>
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-utils\examples\utils
    <#node getFolders
    node lorem
    node verify#>
    node encdec
 
}

if ( $TaskName -eq 'base' -And 1 )
{
    <#cd c:\my\wizzi\v6\test\wizzi-utils\examples\ittfTree
    cd c:\my\wizzi\v6\test\wizzi-utils\examples\fs
    cd c:\my\wizzi\v6\test\wizzi-utils\examples\scanners#>
    cd c:\my\wizzi\v6\test\wizzi-utils\examples\fs
    <#node index#>
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-utils
    mocha tests/**/*.js --full-trace
}