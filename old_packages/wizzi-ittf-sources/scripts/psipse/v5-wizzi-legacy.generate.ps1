clear

cd C:\My\wizzi\v5\legacy\wizzi-legacy-v4\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v5\legacy\wizzi-legacy-v4\dist c:\my\wizzi\v6\test\wizzi-legacy-v4 /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\legacy\wizzi-legacy-v4\dist c:\my\wizzi\v6\node_modules\wizzi-legacy-v4 /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}


if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-legacy-v4\examples
    node index
}


if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-legacy-v4
    mocha tests/**/*.js --full-trace
}



