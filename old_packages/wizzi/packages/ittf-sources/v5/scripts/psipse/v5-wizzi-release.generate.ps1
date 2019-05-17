clear

cd c:\my\wizzi\v5\github\wizzi
<# 
node filemod f-"<filePath>" re-"<reg exp>" r-"<repl string>" -v (view only) -g (all occurrencies)
#>

node filemod -v f-"c:\my\wizzi\v5\t\meta\versioned.json.ittf" re-"version \'[\s\S]*?\'" r-"version '0.6.6'"
node filemod -v f-"c:\my\wizzi\v6\t\meta\versioned.json.ittf" re-"version \'[\s\S]*?\'" r-"version '0.6.6'"

<#exit#>

<# WIZZI LEGACY #>
cd C:\My\wizzi\v6\legacy\wizzi-legacy-v5\src
node generate
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v6\legacy\wizzi-legacy-v5\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-legacy-v5 /NFL /NDL /NJH /np /MIR /XD .git, node_modules

<# WIZZI MONOREPO #>
cd C:\My\wizzi\v5\kernel\wizzi-monorepo\src
node generate
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v5\kernel\wizzi-monorepo\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi /NFL /NDL /NJH /np /MIR /XD .git, node_modules

<# WIZZI UTILS #>
cd C:\My\wizzi\v5\kernel\wizzi-utils\src
node generate base
if (-not $?)
{
    throw 'error executing wizzi job'
}
node generate webpack
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules
robocopy c:\my\wizzi\v5\kernel\wizzi-utils\dist_webpack c:\my\wizzi\webpack\node_modules\wizzi-utils /NFL /NDL /NJH /np /MIR /XD .git, node_modules

<# WIZZI GIT #>
cd C:\My\wizzi\v5\kernel\wizzi-git\src
node generate base
if (-not $?)
{
    throw 'error executing wizzi job'
}
node generate webpack
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-git /NFL /NDL /NJH /np /MIR /XD .git, node_modules
robocopy c:\my\wizzi\v5\kernel\wizzi-git\dist_webpack c:\my\wizzi\webpack\node_modules\wizzi-git /NFL /NDL /NJH /np /MIR /XD .git, node_modules

<# WIZZI SCRIPTS #>
cd C:\My\wizzi\v5\kernel\wizzi-scripts\src
node generate base
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v5\kernel\wizzi-scripts\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-scripts /NFL /NDL /NJH /np /MIR /XD .git, node_modules

<# WIZZI MTREE #>
cd C:\My\wizzi\v5\kernel\wizzi-mtree\src
node generate base
if (-not $?)
{
    throw 'error executing wizzi job'
}
node generate webpack
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules
robocopy c:\my\wizzi\v5\kernel\wizzi-mtree\dist_webpack c:\my\wizzi\webpack\node_modules\wizzi-mtree /NFL /NDL /NJH /np /MIR /XD .git, node_modules

<# WIZZI REPO #>
cd C:\My\wizzi\v5\kernel\wizzi-repo\src
node generate base
if (-not $?)
{
    throw 'error executing wizzi job'
}
node generate webpack
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
robocopy c:\my\wizzi\v5\kernel\wizzi-repo\dist_webpack c:\my\wizzi\webpack\node_modules\wizzi-repo /NFL /NDL /NJH /np /MIR /XD .git, node_modules

<# WIZZI #>
cd C:\My\wizzi\v5\kernel\wizzi\src
node generate base
if (-not $?)
{
    throw 'error executing wizzi job'
}
node generate webpack
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v5\kernel\wizzi\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi /NFL /NDL /NJH /np /MIR /XD .git, node_modules
robocopy c:\my\wizzi\v5\kernel\wizzi\dist_webpack c:\my\wizzi\webpack\node_modules\wizzi /NFL /NDL /NJH /np /MIR /XD .git, node_modules

<# WIZZI CORE #>
cd C:\My\wizzi\v5\plugins\wizzi-core\src
node generate -a
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v5\plugins\wizzi-core\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-core /NFL /NDL /NJH /np /MIR /XD .git, node_modules

<# WIZZI JS #>
cd C:\My\wizzi\v5\plugins\wizzi-js\src
node generate -a
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v5\plugins\wizzi-js\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules

<# WIZZI WEB #>
cd C:\My\wizzi\v6\plugins\wizzi-web\src
node generate -a
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v6\plugins\wizzi-web\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules

<# WIZZI META #>
cd C:\My\wizzi\v5\plugins\wizzi-meta\src
node generate -a
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v5\plugins\wizzi-meta\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-meta /NFL /NDL /NJH /np /MIR /XD .git, node_modules

<# WIZZI TOOLS #>
cd C:\My\wizzi\v5\apps\wizzi-tools\src
node generate
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v5\apps\wizzi-tools\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-tools /NFL /NDL /NJH /np /MIR /XD .git, node_modules

<# WIZZI DEMO #>
cd C:\My\wizzi\v5\apps\wizzi-demo\src
node generate
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v5\apps\wizzi-demo\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-demo /NFL /NDL /NJH /np /MIR /XD .git, node_modules

<# WIZZI BUNDLERS #>
cd C:\My\wizzi\v5\apps\wizzi-bundlers\wizzi
node generate
if (-not $?)
{
    throw 'error executing wizzi job'
}
robocopy c:\my\wizzi\v5\apps\wizzi-bundlers\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-bundlers /NFL /NDL /NJH /np /MIR /XD .git, node_modules

