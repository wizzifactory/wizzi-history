clear

if ( 1 )
{
    <# ZEIT - TUTORIAL #>
    cd C:\my\wizzi\v5\apps\js-tutorials\zeit\markdown-blog\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd C:\my\wizzi\v5\apps\js-tutorials\zeit\markdown-blog\app
    <#
    npm install
    npm run dev
    now
    #>
    npm install
}

if ( 0 )
{
    <# ZEIT - TUTORIAL #>
    cd C:\my\wizzi\v5\apps\js-tutorials\zeit\firebase-hn\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd C:\my\wizzi\v5\apps\js-tutorials\zeit\firebase-hn\app
    <#
    npm install
    npm run dev
    now
    #>
}

if ( 0 )
{
    <# ZEIT - TUTORIAL #>
    cd C:\my\wizzi\v5\apps\js-tutorials\zeit\nextjs-tutorial\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd C:\my\wizzi\v5\apps\js-tutorials\zeit\nextjs-tutorial\app
    <#
    npm install
    npm run dev
    now
    #>
}



if ( 0 )
{
    <# ZEIT - STATIC #>
    cd C:\my\wizzi\v5\apps\js-tutorials\zeit\static\wizzi
    node generate
    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    cd C:\my\wizzi\v5\apps\js-tutorials\zeit\static\dist
    <#npm install now -g
    now#>
}


