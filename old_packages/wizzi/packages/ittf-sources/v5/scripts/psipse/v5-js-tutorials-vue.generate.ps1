clear

<# $TaskName = ‘first|second|monaco’ #>
$TaskName = ‘monaco’

if ( 1 )
{
    cd c:\my\wizzi\v5\apps\js-tutorials\vue\$TaskName\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd c:\my\wizzi\v5\apps\js-tutorials\vue\$TaskName\app
    <#
    npm install
    npm run build
    #>
}

