clear
cd C:\My\wizzi\v4\kernel\wizzi-utils\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v4\kernel\wizzi-utils\dist c:\my\wizzi\v4\test\wizzi-utils /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\kernel\wizzi-utils\dist c:\my\wizzi\v4\test\wizzi-mtree\node_modules\wizzi-utils /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\kernel\wizzi-utils\dist c:\my\wizzi\v4\test\wizzi-repo\node_modules\wizzi-utils /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\kernel\wizzi-utils\dist c:\my\wizzi\v4\test\wizzi\node_modules\wizzi-utils /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\kernel\wizzi-utils\dist c:\my\wizzi\v5\node_modules\wizzi-utils /MIR /XD .git, node_modules
}

if ( 0 )
{
    cd c:\my\wizzi\v4\test\wizzi-utils\examples
    node ittfTree
    <#node scanners
    node prettifiers#>
}

if ( 0 )
{
    cd c:\my\wizzi\v4\test\wizzi-utils\examples\utils
    node getFolders
}

if ( 0 )
{
    cd c:\my\wizzi\v4\test\wizzi-utils\examples\fs
    node vfile
}

if ( 1 )
{
    cd c:\my\wizzi\v4\test\wizzi-utils
    mocha tests/**/*.js --full-trace
}