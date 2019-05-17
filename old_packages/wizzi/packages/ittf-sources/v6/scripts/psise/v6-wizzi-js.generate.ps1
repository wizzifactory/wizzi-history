clear
cd C:\My\wizzi\v6\plugins\wizzi-js\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v6\plugins\wizzi-js\dist c:\my\wizzi\v6\test\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    if ( 1 ) {
        robocopy c:\my\wizzi\v6\plugins\wizzi-js\dist c:\my\wizzi\v6\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v6\plugins\wizzi-js\dist c:\my\wizzi\v7\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v6\plugins\wizzi-js\dist c:\my\wizzi\v5\apps\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v6\plugins\wizzi-js\dist c:\my\wizzi\v5\apps\wizzi-studio\dist\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v6\plugins\wizzi-js\dist c:\my\wizzi\v5\apps\wizzi-play\app\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v6\plugins\wizzi-js\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v6\plugins\wizzi-js\dist c:\my\wizzi\v5\github\wizzi-demo\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v6\plugins\wizzi-js\dist c:\my\wizzi\webpack\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules  
        robocopy c:\my\wizzi\v6\plugins\wizzi-js\dist c:\my\wizzi\v5\github\stfnbssl\ts-wizzi-standalone\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v6\plugins\wizzi-js\dist c:\my\wizzi\v5\github\stfnbssl\packy-template-mern\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v6\plugins\wizzi-js\dist c:\my\wizzi\v5\github\stfnbssl\packy-template-nextjs\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v6\plugins\wizzi-js\dist c:\my\wizzi\v5\github\stfnbssl\packy-template-react-webpack\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v6\plugins\wizzi-js\dist c:\my\wizzi\fresh\packy-template-gatsby\node_modules\wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    }
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-js\examples\codegen
    node index
}

if ( 1 )
{
    cd c:\my\wizzi\v6\test\wizzi-js\examples\ts
    node index
}

if ( 0 )
{
    cd c:\my\wizzi\v6\test\wizzi-js
    mocha tests/**/*.js --full-trace
}

<#
#>