clear
cd C:\My\wizzi\v5\apps\wizzi-demo\src
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
    robocopy c:\my\wizzi\v5\apps\wizzi-demo\dist c:\my\wizzi\v6\test\wizzi-demo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\apps\wizzi-demo\dist c:\my\wizzi\v5\github\wizzi-demo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\apps\wizzi-demo\dist c:\my\wizzi\v5\github\wizzi\packages\wizzi-demo /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if (0)
{
    cd C:\my\wizzi\v5\github\wizzi-demo
    npm run setup
}

if (1)
{
    cd C:\my\wizzi\v5\github\wizzi-demo
    <#npm install
    node index all|ae|ap|se|sa
    node index ap build
    node index ap examples
    #>
    node index se
}

