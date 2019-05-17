clear

if ( 1 )
{
    <# ROLLUP - PLUGIN-WIZZI-JS #>
    cd C:\my\wizzi\v5\apps\js-tutorials\rollup\rollup-plugin-wizzi-js\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd C:\my\wizzi\v5\apps\js-tutorials\rollup\rollup-plugin-wizzi-js\dist
    <#
    npm install
    npm run dev
    now
    #>
    npm run build
    npm run test
    robocopy C:\my\wizzi\v5\apps\js-tutorials\rollup\rollup-plugin-wizzi-js\dist c:\my\wizzi\v5\apps\node_modules\rollup-plugin-wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy C:\my\wizzi\v5\apps\js-tutorials\rollup\rollup-plugin-wizzi-js\dist c:\my\wizzi\v5\github\rollup-plugin-wizzi-js /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

