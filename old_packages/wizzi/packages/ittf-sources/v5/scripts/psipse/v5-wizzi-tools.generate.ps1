clear
<# $TaskName = ‘base|webpack’ #>
$TaskName = ‘base’
<# $SubTask = ‘example|import’ #>
$SubTask = ‘example’
$Standalone = 0
$gen = 1
if ( $SubTask -eq 'import' ) {
    $gen = 1
    $TaskName = ‘base’
}


if ( $gen ) {

    cd C:\My\wizzi\v5\apps\wizzi-tools\src
    if ( $TaskName -eq 'base' ) {
        node generate base
    }
    ElseIf ( $TaskName -eq 'webpack' ) {
        node generate webpack
    }

    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
}

if ( $TaskName -eq 'base' -And $gen )
{
    <#
    robocopy c:\my\wizzi\v5\apps\wizzi-tools\dist c:\my\wizzi\v5\apps\node_modules\wizzi-tools /MIR /XD .git, node_modules
    #>
    robocopy c:\my\wizzi\v5\apps\wizzi-tools\dist c:\my\wizzi\fresh\wizzi-tools /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\apps\wizzi-tools\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-tools /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\apps\wizzi-tools\dist c:\my\wizzi\v5\apps\node_modules\wizzi-tools /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\apps\wizzi-tools\dist c:\my\wizzi\v6\kernel\wizzi-cli\dist\node_modules\wizzi-tools /MIR /XD .git, node_modules
}

if ( $TaskName -eq 'webpack' -And $gen )
{
    robocopy c:\my\wizzi\v5\apps\wizzi-tools\dist_webpack c:\my\wizzi\webpack\node_modules\wizzi-tools /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\apps\wizzi-tools\dist_webpack c:\my\wizzi\v5\github\stfnbssl\ts-wizzi-standalone\node_modules\wizzi-tools /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    if ( $Standalone) {
        cd c:\my\wizzi\webpack\wizzi-standalone\app
        npm run build
        copy-item c:\my\wizzi\webpack\wizzi-standalone\app\scripts\wizzi.standalone.js C:\My\wizzi\v5\apps\wizzi-studio\dist\server\static\wizzi-play\scripts\wizzi.standalone.js -Force
        copy-item c:\my\wizzi\webpack\wizzi-standalone\app\scripts\wizzi.standalone.js C:\My\wizzi\v5\apps\wizzi-play\app\wizzifactory.github.io\scripts\wizzi.standalone.js -Force
    }
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\fresh\wizzi-tools
    mocha tests/**/*.js --full-trace
}

if ( $TaskName -eq 'base' -And 0 )
{
    cd c:\my\wizzi\fresh\wizzi-tools\examples\encoding
    node sample_2
}

if ( $TaskName -eq 'base' -And $SubTask -eq 'example' )
{
    cd c:\my\wizzi\fresh\wizzi-tools
    <#
    npm install
    cd examples\import
    cd examples\js
    cd examples\html
    cd examples\typescript
    cd examples\js
    cd examples\json
    cd examples\util
    node jsCodeReplacer
    #>
    cd examples\html
    node index
}

if ( $TaskName -eq 'base' -And $SubTask -eq 'import' )
{
    cd c:\my\wizzi\fresh\wizzi-tools
    <#npm install#>
    cd examples\import
    node index
}

<# cssgonzales
scss_1
#>