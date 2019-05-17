clear

<# $TaskName = ‘express/first’ #>
$TaskName = ‘express/first’

if ( 1 )
{
    cd c:\my\wizzi\v5\apps\js-tutorials\babel\$TaskName\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd c:\my\wizzi\v5\apps\js-tutorials\babel\$TaskName\app
    <#
    npm install
    npm run build
    #>
}

