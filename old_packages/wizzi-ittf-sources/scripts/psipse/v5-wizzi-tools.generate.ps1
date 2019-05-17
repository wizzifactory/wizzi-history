clear

if ( 1 ) {
    cd C:\My\wizzi\v5\apps\wizzi-tools\src
    node generate

    if (-not $?)
    {
        throw 'error executing wizzi job'
    }
    if ( 1 )
    {
        robocopy c:\my\wizzi\v5\apps\wizzi-tools\dist c:\my\wizzi\v5\test\wizzi-tools /MIR /XD .git, node_modules
        robocopy c:\my\wizzi\v5\apps\wizzi-tools\dist c:\my\wizzi\v5\node_modules\wizzi-tools /MIR /XD .git, node_modules
    }
}


if ( 0 )
{
    cd c:\my\wizzi\v5\test\wizzi-tools
    mocha tests/**/*.js --full-trace
}

if ( 0 )
{
    cd C:\My\wizzi\v5\test\wizzi-tools\examples\encoding
    node sample_2

}

if ( 1 )
{
    cd c:\my\wizzi\v5\test\wizzi-tools\examples\wizzifier
    node cssgonzales
}

<# cssgonzales
scss_1
#>