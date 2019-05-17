clear

cd C:\My\wizzi\v5\kernel\wizzi\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist c:\my\wizzi\v6\test\wizzi /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist c:\my\wizzi\v6\node_modules\wizzi /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist c:\my\wizzi\v5\apps\node_modules\wizzi /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist c:\my\wizzi\v5\github\wizzi /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi\dist c:\my\wizzi\v5\apps\wizzi-studio\wizzi-play2\app\node_modules\wizzi /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi\examples\io
    node index
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi
    mocha tests/**/*.js --full-trace
}