clear
 
<# $TaskName = ‘all|code|docs|site|api’ #>
$TaskName = ‘docs’

cd c:\my\wizzi\v5\apps\wizzi-docs\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v5\apps\wizzi-docs\dist c:\my\wizzi\v6\test\wizzi-docs /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\apps\wizzi-docs\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-docs /MIR /XD .git, node_modules
    
}

if ( $TaskName -eq 'all' -And 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-docs
    node index
}

if ( $TaskName -eq 'site' -And 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-docs\jobs
    node site
}

if ( $TaskName -eq 'docs' -And 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-docs\jobs
    
    node index
    node concepts
    node docs
    node starters
    node project
    node code_intro
    <#
    node index
    node concepts
    node docs
    node starters
    node project
    node code_intro
    #>
    robocopy c:\my\wizzi\v5\github\wizzifactory.github.io c:\my\wizzi\v5\apps\wizzi-studio\dist\server\static\wizzifactory.github.io /E /XD .git, node_modules
}


if ( $TaskName -eq 'api' -And 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-docs\jobs
    node api_preprocess
    node api
}


if ( $TaskName -eq 'code' -And 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-docs\jobs
    node code_preprocess_kernel
    node code_kernel
    node code_preprocess_plugins
    node code_plugins
    node code_preprocess_apps
    node code_apps
    <#
    node code_preprocess_kernel
    node code_kernel
    node code_preprocess_plugins
    node code_plugins
    node code_preprocess_apps
    node code_apps
    #>

}

<#
cd c:\my\wizzi\v6\test\wizzi-docs\jobs
node index
node package
#>