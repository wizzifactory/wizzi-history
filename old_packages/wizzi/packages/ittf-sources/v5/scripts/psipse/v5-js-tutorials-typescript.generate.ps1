clear

<# $TaskName = ‘react\first|react\context|react\webpack-babel’ #>
$TaskName = ‘react\webpack-babel’

if ( 1 )
{
    cd c:\my\wizzi\v5\apps\js-tutorials\typescript\$TaskName\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd c:\my\wizzi\v5\apps\js-tutorials\typescript\$TaskName\app
    <#
    npm install
    npm run build
    #>
}

