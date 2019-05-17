clear
<# $TaskName = ‘base|webpack’ #>
$TaskName = ‘base’

cd C:\My\wizzi\v5\kernel\wizzi-utils\src
if ( $TaskName -eq 'base' ) {
    node generate
}
ElseIf ( $TaskName -eq 'webpack' ) {
    node generate_webpack
}

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( $TaskName -eq 'base' -And 1 )
{
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v6\test\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v6\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v5\apps\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v5\github\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( $TaskName -eq 'webpack' -And 1 )
{
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist_webpack c:\my\wizzi\v6\test\wizzi-utils-webpack /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist_webpack c:\my\wizzi\v6\node_modules\wizzi-utils-webpack /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist_webpack c:\my\wizzi\v5\apps\node_modules\wizzi-utils-webpack /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist_webpack c:\my\wizzi\v5\apps\wizzi-studio\wizzi-play2\app\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( $TaskName -eq 'base' -And 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-utils\examples
    node ittfTree
    node scanners
    node prettifiers
    node asisloader
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-utils\examples\utils
    node getFolders
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-utils\examples\fs
    node vfile
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-utils
    mocha tests/**/*.js --full-trace
}