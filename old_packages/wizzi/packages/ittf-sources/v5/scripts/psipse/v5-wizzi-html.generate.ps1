clear

cd C:\My\wizzi\v5\plugins\wizzi-html\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v5\plugins\wizzi-html\dist c:\my\wizzi\v6\test\wizzi-html /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-html\dist c:\my\wizzi\v6\node_modules\wizzi-html /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-html\dist c:\my\wizzi\v5\apps\node_modules\wizzi-html /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-html\examples\html
    node index
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-html\examples\css
    node index
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-html\examples\svg
    node index
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-html
    mocha tests/**/*.js --full-trace
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-html\examples\css
    node index
}
