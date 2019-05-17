clear

if ( 1 )
{
    <# PARCEL - BASIC #>
    cd C:\my\wizzi\v5\apps\js-tutorials\parcel\basic\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd C:\my\wizzi\v5\apps\js-tutorials\parcel\basic\dist
    <#
    npm install -g parcel-bundler
    parcel index.html
    #>
    parcel index.html
}

