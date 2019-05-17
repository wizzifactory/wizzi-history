clear
cd c:\my\wizzi\v5\apps\wizzi-github-io\wizzi

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
    robocopy c:\my\wizzi\v5\apps\wizzi-github-io\dist c:\my\wizzi\v5\github\wizzifactory.github.io /E
    robocopy c:\my\wizzi\v5\apps\wizzi-github-io\dist c:\my\wizzi\v5\apps\wizzi-studio\dist\server\static\wizzifactory.github.io /E
}

