clear

if ( 1 )
{
    <# ZEIT - TUTORIAL #>
    cd C:\My\wizzi\v6\templates\vue\simple\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd C:\My\wizzi\v6\templates\vue\simple\src
    <#
    npm install
    npm run dev
    #>
    
}

