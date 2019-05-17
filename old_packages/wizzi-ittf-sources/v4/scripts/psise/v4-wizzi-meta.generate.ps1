﻿clear
cd C:\My\wizzi\v4\plugins\wizzi-meta\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v4\plugins\wizzi-meta\dist c:\my\wizzi\v5\test\wizzi-meta /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\plugins\wizzi-meta\dist c:\my\wizzi\v5\node_modules\wizzi-meta /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi-meta\examples\wfstudio
    node index
}

if ( 0 )
{
    cd c:\my\wizzi\v5\test\wizzi-meta
    mocha tests/**/*.js --full-trace
}

<#
#>