clear
cd C:\My\wizzi\v5\plugins\wizzi-lab\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v5\plugins\wizzi-lab\dist c:\my\wizzi\v6\test\wizzi-lab /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-lab\dist c:\my\wizzi\v6\node_modules\wizzi-lab /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    copy c:\my\wizzi\v5\plugins\wizzi-lab\dist\lib\wizzi\models\temp-schema.g.json C:\My\wizzi\v5\apps\js-tutorials\webpack\react-static-schema-doc\app\src\containers\temp-schema.g.json
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-lab\examples
    node index
    cd c:\my\wizzi\v6\test\wizzi-lab\examples\legacy
    node index
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-lab\examples\rdbms
    <#node index#>
    node dash_job
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-lab\examples\raml
    <#node index#>
    node dash_job
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-lab
    mocha tests/**/*.js --full-trace
}

<#
#>