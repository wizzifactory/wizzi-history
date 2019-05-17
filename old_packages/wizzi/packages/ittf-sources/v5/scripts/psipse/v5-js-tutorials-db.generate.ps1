clear

<# $TaskName = ‘neo4j/first|mongodb/first|mysql/second’ #>
$TaskName = ‘mysql/second’

if ( 1 )
{
    cd c:\my\wizzi\v5\apps\js-tutorials\db\$TaskName\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd c:\my\wizzi\v5\apps\js-tutorials\db\$TaskName\app
    <#
    npm install
    npm run build
    #>
}

