clear

cd C:\My\wizzi\v5\legacy\wizzi-legacy-v4-codegen\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v5\legacy\wizzi-legacy-v4-codegen\dist c:\my\wizzi\v6\test\wizzi-legacy-v4-codegen /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\legacy\wizzi-legacy-v4-codegen\dist c:\my\wizzi\v6\node_modules\wizzi-legacy-v4-codegen /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-legacy-v4-codegen\examples\js
    node index
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-legacy-v4-codegen
    mocha tests/**/*.js --full-trace
}