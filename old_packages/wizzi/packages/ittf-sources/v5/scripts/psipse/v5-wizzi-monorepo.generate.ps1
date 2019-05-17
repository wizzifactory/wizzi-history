clear

cd C:\My\wizzi\v5\kernel\wizzi-monorepo\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 0 )
{
    robocopy c:\my\wizzi\v5\kernel\wizzi-monorepo\dist c:\my\wizzi\v6\test\wizzi-monorepo /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-monorepo\dist c:\my\wizzi\v6\node_modules\wizzi-monorepo /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-monorepo\dist c:\my\wizzi\v5\apps\node_modules\wizzi-monorepo /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-monorepo\dist\examples c:\my\wizzi\v5\github\wizzi\examples /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-monorepo\dist\examples c:\my\wizzi\v5\apps\temp\examples /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-monorepo\dist c:\my\wizzi\v5\github\wizzi
}
if ( 1 )
{
    robocopy c:\my\wizzi\v5\kernel\wizzi-monorepo\dist c:\my\wizzi\v5\github\wizzi
}


if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-monorepo
    mocha tests/**/*.js --full-trace
}