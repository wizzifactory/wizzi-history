clear
<# $TaskName = ‘library|demo|parcel’ #>
$TaskName = ‘library’

if ( $TaskName -eq 'library') {
    cd c:\my\wizzi\v5\apps\wizzi-bundlers\wizzi
    if ( 1 )
    {
        node generate
    }
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    if ( 1 )
    {
        robocopy c:\my\wizzi\v5\apps\wizzi-bundlers\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-bundlers /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v5\apps\wizzi-bundlers\dist c:\my\wizzi\v5\apps\wizzi-studio\dist\node_modules\wizzi-bundlers /NFL /NDL /NJH /np /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v5\apps\wizzi-bundlers\dist c:\my\wizzi\v5\apps\wizzi-bundlers-demo\dist\node_modules\wizzi-bundlers /NFL /NDL /NJH /np /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v5\apps\wizzi-bundlers\dist C:\my\tests\wizzi-bundlers-demo\node_modules\wizzi-bundlers /MIR /XD .git, node_modules
    }
    if ( 0 )
    {
        cd c:\my\wizzi\v5\apps\wizzi-bundlers\dist
        npm install
    }
    if ( 1 ) {
        <#c:\my\wizzi\v5\apps\wizzi-bundlers\dist\examples\rollup#>
        <#c:\my\wizzi\v5\apps\wizzi-bundlers\dist\examples\webpack#>
        <#c:\my\wizzi\v5\apps\wizzi-bundlers\dist\examples\babel#>
        cd c:\my\wizzi\v5\apps\wizzi-bundlers\dist\examples\webpack
        node index
    }
}

if ( $TaskName -eq 'demo') {
    if ( 1 ) {
        cd c:\my\wizzi\v5\apps\wizzi-bundlers-demo\wizzi
        node generate
    }
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    robocopy c:\my\wizzi\v5\apps\wizzi-bundlers-demo\dist c:\my\tests\wizzi-bundlers-demo /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\apps\wizzi-bundlers-demo\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-bundlers-demo /MIR /XD .git, node_modules
    if ( 0 )
    {
        cd c:\my\wizzi\v5\apps\wizzi-bundlers-demo\dist
        npm install
    }
    if ( 0 )
    {
        cd c:\my\wizzi\v5\apps\wizzi-bundlers-demo\dist
        npm run build
    }
}

if ( $TaskName -eq 'parcel') {
    if ( 1 ) {
        cd c:\my\wizzi\v5\apps\parcel-plugin-wizzi\wizzi
        node generate
    }
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    robocopy c:\my\wizzi\v5\apps\parcel-plugin-wizzi\dist c:\my\tests\parcel-plugin-wizzi /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\apps\parcel-plugin-wizzi\dist c:\my\wizzi\v5\github\wizzi\packages\parcel-plugin-wizzi /MIR /XD .git, node_modules
    if ( 0 )
    {
        cd c:\my\wizzi\v5\apps\wizzi-bundlers-demo\dist
        npm install
    }
    if ( 0 )
    {
        cd c:\my\wizzi\v5\apps\wizzi-bundlers-demo\dist
        npm run build
    }
}
