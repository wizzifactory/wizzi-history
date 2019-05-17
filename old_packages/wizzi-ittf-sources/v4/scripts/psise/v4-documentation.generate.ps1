clear

cd c:\my\wizzi\v4\demo\wizzi-documentation\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v4\demo\wizzi-documentation\dist c:\my\wizzi\v5\test\wizzi-documentation /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi-documentation\jobs
    node index
    node concepts
    node docs
    node starters
    node project

}

if ( 0 )
{
    cd c:\my\wizzi\v5\test\wizzi-documentation\jobs
    node api_preprocess
    node api
}

if ( 0 )
{
    cd c:\my\wizzi\v5\test\wizzi-documentation\jobs
    node code_preprocess
    node code
}

if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi-documentation\jobs
    node site
}

<#
cd c:\my\wizzi\v5\test\wizzi-documentation\jobs
node schemas
node docs
node site
node concepts
node docs
node site
node starters
node project

node code_preprocess

cd C:\My\wizzi\v3\apps\docs\jobs
node index
node concepts
node docs
node starters
node project
node api_preprocess
node api
node code_preprocess
node package
node code_intro
node site
#>