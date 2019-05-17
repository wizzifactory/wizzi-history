clear
cd C:\My\wizzi\v4\demo\wizzi-demo\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v4\demo\wizzi-demo\dist c:\my\wizzi\v5\test\wizzi-demo /MIR /XD .git, node_modules
}

if (0)
{
    cd c:\my\wizzi\v5\test\wizzi-demo\mtree\level_0
    node index
    cd c:\my\wizzi\v5\test\wizzi-demo\mtree\level_1
    node index
}

if (0)
{
    cd c:\my\wizzi\v5\test\wizzi-demo\jswizzi\level_0
    node step_1_go
}


if (0)
{
    cd c:\my\wizzi\v5\test\wizzi-demo\languageschemas\js\level_0
    node step_1_go
    node step_2_go
    node step_3_go
    node step_4_go
}

if (0)
{
    cd c:\my\wizzi\v5\test\wizzi-demo\languageschemas\css\level_0
    node step_1_go
}

if (0)
{
    cd c:\my\wizzi\v5\test\wizzi-demo\wizzischema\level_1
    node step_1_go
}

if (0)
{
    cd c:\my\wizzi\v5\test\wizzi-demo\wizzimodel\level_0
    <#node step_1_go#>
    node step_2_go
}

if (1)
{
    cd c:\my\wizzi\v5\test\wizzi-demo\plugin\source
    node generate
}

if (0)
{
    cd c:\my\wizzi\v5\test\wizzi-demo\plugin\examples\xittf
    node step_1_go
}

if (1)
{
    cd c:\my\wizzi\v5\test\wizzi-demo\plugin\examples\parser 
    node step_1_go
}

if (0)
{
    cd c:\my\wizzi\v5\test\wizzi-demo\wizzijob\level_1
    node step_1_go
    <#cd c:\my\wizzi\v5\test\wizzi-demo\wizzijob\level_0
    node step_1_go
    node step_2_go
    cd c:\my\wizzi\v5\test\wizzi-demo\wizzijob\level_2
    node step_1_go
    node step_2_go
    node step_3_go
    node step_4_go
    node step_5_go
    node step_6_go#>
}

if (0)
{
    cd c:\my\wizzi\v5\test\wizzi-demo\wizzijob\mongodb\level_0
    <#node step_1_upload
    node step_1_exec
    node step_1_print#>
    node step_2_go
}

if (0)
{
    cd c:\my\wizzi\v5\test\wizzi-demo\apps\level_0
    node step_1_go
}


<#
cd C:\My\wizzi\v3\next\sources\v3-demo
node generate
cd C:\My\wizzi\v3\apps\demo\mtree
node index
cd C:\My\wizzi\v3\apps\demo\wizzimodel
node index
cd C:\My\wizzi\v3\apps\demo\wizzischema
node index
cd C:\My\wizzi\v3\apps\demo\languageschemas\js
node index
cd C:\My\wizzi\v3\apps\demo\wizzijob
node index
cd C:\My\wizzi\v3\apps\demo\jswizzi
node index
cd c:\my\wizzi\v5\test\wizzi-demo\languageschemas\js
node index
cd c:\my\wizzi\v5\test\wizzi-demo
mocha tests/**/*.js --full-trace
#>