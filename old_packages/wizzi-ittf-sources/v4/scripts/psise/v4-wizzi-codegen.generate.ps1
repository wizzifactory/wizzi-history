clear

cd C:\My\wizzi\v4\plugins\wizzi-codegen\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v4\plugins\wizzi-codegen\dist c:\my\wizzi\v5\test\wizzi-codegen /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\plugins\wizzi-codegen\dist c:\my\wizzi\v5\node_modules\wizzi-codegen /MIR /XD .git, node_modules
}


if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi-codegen\examples\js
    node index
}


if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi-codegen
    mocha tests/**/*.js --full-trace
}



