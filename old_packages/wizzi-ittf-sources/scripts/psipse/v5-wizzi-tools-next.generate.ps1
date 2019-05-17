clear

if ( 1 ) {
    cd C:\My\wizzi\v5\apps\wizzi-tools-next\src
    node generate

    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    if ( 1 )
    {
        robocopy c:\my\wizzi\v5\apps\wizzi-tools-next\dist c:\my\wizzi\fresh\wizzi-tools-next /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v5\apps\wizzi-tools-next\dist c:\my\wizzi\v5\github\wizzi-tools /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v5\apps\wizzi-tools-next\dist c:\my\wizzi\v5\apps\node_modules\wizzi-tools-next /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v5\apps\wizzi-tools-next\dist c:\my\wizzi\v5\apps\wizzi-studio\wizzi-play2\app\cdn\wizzi-tools-next\node_modules\wizzi-tools-next /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v5\apps\wizzi-tools-next\dist c:\my\wizzi\v5\apps\wizzi-studio\wizzi-play2\app\node_modules\wizzi-tools-next /NFL /NDL /NJH /np /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v5\apps\wizzi-tools-next\dist c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-express\dist\node_modules\wizzi-tools-next /NFL /NDL /NJH /np /MIR /XD .git, node_modules
    }
}

if ( 0 )
{
    cd c:\my\wizzi\fresh\wizzi-tools-next
    mocha tests/**/*.js --full-trace
}

if ( 0 )
{
    cd c:\my\wizzi\fresh\wizzi-tools-next\examples\encoding
    node sample_2
}

if ( 1 )
{
    cd c:\my\wizzi\fresh\wizzi-tools-next
    <#npm install#>
    cd examples\js
    node index
}

<# cssgonzales
scss_1
#>