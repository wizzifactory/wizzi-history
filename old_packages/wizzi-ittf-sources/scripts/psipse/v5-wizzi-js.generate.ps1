﻿clear
cd C:\My\wizzi\v5\plugins\wizzi-js\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v5\plugins\wizzi-js\dist c:\my\wizzi\v6\test\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-js\dist c:\my\wizzi\v6\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-js\dist c:\my\wizzi\v5\apps\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-js\dist c:\my\wizzi\v5\github\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-js\dist c:\my\wizzi\v5\apps\wizzi-studio\wizzi-play2\app\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-js\examples\codegen
    node index
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-js\examples\js
    node index
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-js
    mocha tests/**/*.js --full-trace
}

<#
#>