clear

cd C:\My\wizzi\v5\plugins\wizzi-web\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    <#robocopy c:\my\wizzi\v5\plugins\wizzi-web\dist c:\my\wizzi\v5\node_modules\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules#>
    robocopy c:\my\wizzi\v5\plugins\wizzi-web\dist c:\my\wizzi\v5\apps\node_modules\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-web\dist c:\my\wizzi\v6\test\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-web\dist c:\my\wizzi\v6\node_modules\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-web\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-web\dist c:\my\wizzi\v5\github\wizzi-demo\node_modules\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-web\dist c:\my\wizzi\v5\apps\wizzi-studio\dist\node_modules\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\plugins\wizzi-web\dist c:\my\wizzi\webpack\node_modules\wizzi-web /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}


if ( 1 )
{
    <#
    cd c:\my\wizzi\v6\test\wizzi-web\examples\css
    cd c:\my\wizzi\v6\test\wizzi-web\examples\html
    cd c:\my\wizzi\v6\test\wizzi-web\examples\md
    cd c:\my\wizzi\v6\test\wizzi-web\examples\scss
    cd c:\my\wizzi\v6\test\wizzi-web\examples\site
    cd c:\my\wizzi\v6\test\wizzi-web\examples\svg
    cd c:\my\wizzi\v6\test\wizzi-web\examples\vtt
    cd c:\my\wizzi\v6\test\wizzi-web\examples\vue
    cd c:\my\wizzi\v6\test\wizzi-web\examples\graphql
    #>
    cd c:\my\wizzi\v6\test\wizzi-web\examples\vue
    node index
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-web
    mocha tests/**/*.js --full-trace
}
