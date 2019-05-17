clear
cd C:\My\wizzi\v6\kernel\wizzi-cli\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v6\kernel\wizzi-cli\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-cli /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v6\kernel\wizzi-cli\dist
    wizzi
}

<#
#>