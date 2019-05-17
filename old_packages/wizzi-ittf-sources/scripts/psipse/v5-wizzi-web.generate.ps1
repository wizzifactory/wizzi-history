clear

cd C:\My\wizzi\v5\plugins\wizzi-web\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v5\plugins\wizzi-web\dist c:\my\wizzi\v5\node_modules\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-web\dist c:\my\wizzi\v5\apps\node_modules\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-web\dist c:\my\wizzi\v6\test\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-web\dist c:\my\wizzi\v6\node_modules\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-web\dist c:\my\wizzi\v5\github\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-web\dist c:\my\wizzi\v5\apps\wizzi-studio\wizzi-play2\app\node_modules\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-web\examples\html
    node index
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-web\examples\css
    node index
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-web\examples\scss
    node index
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-web\examples\svg
    node index
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-web\examples\md
    node index
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-web\examples\graphql
    node index
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-web
    mocha tests/**/*.js --full-trace
}
