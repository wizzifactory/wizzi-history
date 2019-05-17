clear

cd C:\My\wizzi\v6\legacy\wizzi-legacy-v5\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v6\legacy\wizzi-legacy-v5\dist c:\my\wizzi\v7\test\wizzi-legacy-v5 /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v6\legacy\wizzi-legacy-v5\dist c:\my\wizzi\v6\node_modules\wizzi-legacy-v5 /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v6\legacy\wizzi-legacy-v5\dist c:\my\wizzi\v7\node_modules\wizzi-legacy-v5 /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v6\legacy\wizzi-legacy-v5\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-legacy-v5 /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v6\legacy\wizzi-legacy-v5\dist c:\my\wizzi\webpack\node_modules\wizzi-legacy-v5 /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}


if ( 1 )
{
    cd c:\my\wizzi\v6\node_modules\wizzi-legacy-v5\examples
    node index
}


if ( 0 )
{
    cd c:\my\wizzi\v6\node_modules\wizzi-legacy-v5
    mocha tests/**/*.js --full-trace
}



