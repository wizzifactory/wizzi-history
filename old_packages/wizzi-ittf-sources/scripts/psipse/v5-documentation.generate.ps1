clear

cd c:\my\wizzi\v5\apps\wizzi-documentation\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v5\apps\wizzi-documentation\dist c:\my\wizzi\v6\test\wizzi-documentation /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-documentation\jobs
    node site
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-documentation\jobs
    node index
    node concepts
    node starters
    node project
    
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-documentation\jobs
    node docs
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-documentation\jobs
    node api_preprocess
    node api
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-documentation\jobs
    node code_intro
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-documentation\jobs
    node code_preprocess
    node code
}

<#
cd c:\my\wizzi\v6\test\wizzi-documentation\jobs
node index
node package
#>