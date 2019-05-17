clear

cd C:\My\wizzi\v5\kernel\wizzi-scripts\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v5\kernel\wizzi-scripts\dist c:\my\wizzi\v6\test\wizzi-scripts /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-scripts\dist c:\my\wizzi\v6\node_modules\wizzi-scripts /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-scripts\dist c:\my\wizzi\v5\apps\node_modules\wizzi-scripts /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-scripts\dist C:\My\wizzi\v5\apps\wizzi-studio\wizzi-studio-express\node_modules\wizzi-scripts /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v5\kernel\wizzi-scripts\dist c:\my\wizzi\v5\github\wizzi-scripts /NFL /NDL /NJH /np /MIR /XD .git, node_modules
}

if ( 0 ) 
{
    <#cd c:\my\wizzi\v6\test\wizzi-scripts
    npm install#>
    cd c:\my\wizzi\v6\test\wizzi-scripts\examples\robocopy
    node index
}

if ( 0 ) 
{
    cd c:\my\wizzi\v6\test\wizzi-scripts\examples\powershell
    node index
}

if ( 0 ) 
{
    cd c:\my\wizzi\v6\test\wizzi-scripts\examples\npm
    node index
}

if ( 0 ) 
{
    cd c:\my\wizzi\v6\test\wizzi-scripts\examples\git
    node index
}

if ( 0 ) 
{
    cd c:\my\wizzi\v6\test\wizzi-scripts\examples\console
    node index
}

if ( 1 ) 
{
    cd c:\my\wizzi\v6\test\wizzi-scripts\examples\nodejs
    node index
}

if ( 0 ) 
{
    cd c:\my\wizzi\v6\test\wizzi-scripts
    mocha tests/**/*.js --full-trace
}

<#
#>