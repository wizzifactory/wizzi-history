clear
cd c:\my\wizzi\v5\apps\wizzi-studio-nextjs\src

if ( 1 )
{
    node generate
}

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 0 )
{
    robocopy c:\my\wizzi\v5\apps\wizzi-studio-nextjs\dist c:\my\wizzi\v5\test\wizzi-studio-nextjs /MIR /XD .git, node_modules
}