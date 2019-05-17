clear
cd C:\My\wizzi\v5\plugins\wizzi-core\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v5\plugins\wizzi-core\dist c:\my\wizzi\v6\test\wizzi-core /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-core\dist c:\my\wizzi\v6\node_modules\wizzi-core /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-core\dist c:\my\wizzi\v5\apps\node_modules\wizzi-core /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-core\dist c:\my\wizzi\v5\github\wizzi-core /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-core\dist c:\my\wizzi\v5\apps\wizzi-studio\wizzi-play2\app\node_modules\wizzi-core /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-core\examples
    node index
    cd c:\my\wizzi\v6\test\wizzi-core\examples\legacy
    node index
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-core
    mocha tests/**/*.js --full-trace
}

<#
#>