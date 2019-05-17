clear
cd C:\My\wizzi\v4\kernel\wizzi-repo\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v4\kernel\wizzi-repo\dist c:\my\wizzi\v5\test\wizzi-repo /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\kernel\wizzi-repo\dist c:\my\wizzi\v5\node_modules\wizzi-repo /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi-repo\tests
    mocha tests/**/*.js --full-trace
}

if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi-repo\examples
    node mongoFile
}

if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi-repo\examples
    node mongoFsDb
    node mongoFsImpl
    node mongoDocument
    node mongoFile
}

<#
#>