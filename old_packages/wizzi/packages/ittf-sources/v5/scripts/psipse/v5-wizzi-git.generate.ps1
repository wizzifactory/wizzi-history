clear
<# $TaskName = ‘base|webpack’ #>
$TaskName = ‘webpack’

cd C:\My\wizzi\v5\kernel\wizzi-git\src
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
    robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist c:\my\wizzi\v6\test\wizzi-git /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist c:\my\wizzi\v6\node_modules\wizzi-git /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist c:\my\wizzi\v7\node_modules\wizzi-git /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist c:\my\wizzi\v5\apps\node_modules\wizzi-git /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist C:\My\wizzi\v5\apps\wizzi-studio\dist\node_modules\wizzi-git /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-git /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist c:\my\wizzi\v5\github\wizzi-demo\node_modules\wizzi-git /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( $TaskName -eq 'webpack' -And 1 )
{
    <#robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist_webpack c:\my\wizzi\v6\test\wizzi-git-webpack /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist_webpack c:\my\wizzi\v6\node_modules\wizzi-git-webpack /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist_webpack c:\my\wizzi\v5\apps\node_modules\wizzi-git-webpack /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    #>
    robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist_webpack c:\my\wizzi\webpack\node_modules\wizzi-git /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist_webpack c:\my\wizzi\v5\apps\wizzi-play\app\cdn\wizzi-tools-plugin\node_modules\wizzi-git /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist_webpack c:\my\wizzi\v5\github\stfnbssl\ts-wizzi-standalone\node_modules\wizzi-git /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist_webpack c:\my\wizzi\v5\github\stfnbssl\typescript-browserfs-git\node_modules\wizzi-git /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}


if ( $TaskName -eq 'base' -And 1 )
{
    <##>
    cd c:\my\wizzi\v6\test\wizzi-git\examples
    <#node fsGit#>
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-git
    mocha tests/**/*.js --full-trace
}