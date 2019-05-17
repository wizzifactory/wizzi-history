clear

if ( 1 )
{
    cd C:\my\wizzi\v5\apps\js-tutorials\chrome\wz1\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd C:\my\wizzi\v5\apps\js-tutorials\chrome\wz1\app
    <#
    npm install
    npm run dev
    now
    #>
}

