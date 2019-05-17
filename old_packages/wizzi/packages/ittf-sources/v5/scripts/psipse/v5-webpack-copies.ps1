clear

<#$dest = ‘typescript-wizzi’
$dest = ‘node-isomorphic-git’
$dest = ‘packy’
$dest = ‘packy-server’#>

$dest = ‘packy-server’

if ($dest = 'packy') {
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist_webpack c:\my\wizzi\v5\github\stfnbssl\$dest\node_modules\wizzi-browser /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ($dest = 'packy-server') {
    robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist c:\my\wizzi\v5\github\stfnbssl\$dest\node_modules\wizzi-git /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v5\github\stfnbssl\$dest\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist c:\my\wizzi\v5\github\stfnbssl\$dest\node_modules\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist c:\my\wizzi\v5\github\stfnbssl\$dest\node_modules\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist c:\my\wizzi\v5\github\stfnbssl\$dest\node_modules\wizzi /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ($dest = 'node-isomorphic-git') {
    robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v5\github\stfnbssl\$dest\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}