clear
cd C:\My\wizzi\v4\common\src
node generate

if (-not $?)
{
    throw 'error executing wizzi job'
}

if ( 1 )
{
    robocopy c:\my\wizzi\v4\common\t c:\my\wizzi\v4\kernel\wizzi-utils\t  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\kernel\wizzi-utils\root\t c:\my\wizzi\v4\kernel\wizzi-utils\src\ittf\root\t  /XD .git, node_modules
                                                                 
    robocopy c:\my\wizzi\v4\common\t c:\my\wizzi\v4\kernel\wizzi-mtree\t  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\kernel\wizzi-mtree\root\t c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\root\t  /XD .git, node_modules
    
    robocopy c:\my\wizzi\v4\common\t c:\my\wizzi\v4\kernel\wizzi-repo\t  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\kernel\wizzi-repo\root\t c:\my\wizzi\v4\kernel\wizzi-repo\src\ittf\root\t  /XD .git, node_modules

    robocopy c:\my\wizzi\v4\common\t c:\my\wizzi\v4\kernel\wizzi\t  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\kernel\wizzi\root\t c:\my\wizzi\v4\kernel\wizzi\src\ittf\root\t  /XD .git, node_modules

    robocopy c:\my\wizzi\v4\common\t_plugin c:\my\wizzi\v4\plugins\wizzi-core\t  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\plugins\tests\mocks c:\my\wizzi\v4\plugins\wizzi-core\src\ittf\tests\mocks  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\plugins\wizzi-core\root\t c:\my\wizzi\v4\plugins\wizzi-core\src\ittf\root\t  /XD .git, node_modules

    robocopy c:\my\wizzi\v4\common\t_plugin c:\my\wizzi\v4\plugins\wizzi-meta\t  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\plugins\tests\mocks c:\my\wizzi\v4\plugins\wizzi-meta\src\ittf\tests\mocks  /MIR /XD .git, node_modules    
    robocopy c:\my\wizzi\v4\common\src\ittf\plugins\wizzi-meta\root\t c:\my\wizzi\v4\plugins\wizzi-meta\src\ittf\root\t  /XD .git, node_modules

    robocopy c:\my\wizzi\v4\common\t c:\my\wizzi\v4\plugins\wizzi-codegen\t    /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\plugins\tests\mocks c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\tests\mocks  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\plugins\wizzi-codegen\root\t c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\root\t  /XD .git, node_modules

    robocopy c:\my\wizzi\v4\common\t_plugin c:\my\wizzi\v4\plugins\wizzi-js\t    /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\plugins\wizzi-js\root\t c:\my\wizzi\v4\plugins\wizzi-js\src\ittf\root\t  /XD .git, node_modules

    robocopy c:\my\wizzi\v4\common\t_plugin c:\my\wizzi\v4\plugins\wizzi-html\t  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\plugins\wizzi-html\root\t c:\my\wizzi\v4\plugins\wizzi-html\src\ittf\root\t  /XD .git, node_modules

    robocopy c:\my\wizzi\v4\common\t_plugin c:\my\wizzi\v4\plugins\wizzi-docs\t  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\plugins\wizzi-docs\root\t c:\my\wizzi\v4\plugins\wizzi-docs\src\ittf\root\t  /XD .git, node_modules

    robocopy c:\my\wizzi\v4\common\t c:\my\wizzi\v4\demo\wizzi-demo\t  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\demo\wizzi-demo\root\t c:\my\wizzi\v4\demo\wizzi-demo\src\ittf\root\t  /XD .git, node_modules

    robocopy c:\my\wizzi\v4\common\t c:\my\wizzi\v4\demo\quick\t  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\demo\quick\root\t c:\my\wizzi\v4\demo\quick\src\ittf\root\t  /XD .git, node_modules

    robocopy c:\my\wizzi\v4\common\t c:\my\wizzi\v4\demo\wizzi-documentation\t  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\demo\wizzi-documentation\root\t c:\my\wizzi\v4\demo\wizzi-documentation\src\ittf\root\t  /XD .git, node_modules

    robocopy c:\my\wizzi\v4\common\t c:\my\wizzi\v4\legacy\wizzi-legacy\t  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\legacy\wizzi-legacy\root\t c:\my\wizzi\v4\legacy\wizzi-legacy\src\ittf\root\t  /XD .git, node_modules

    robocopy c:\my\wizzi\v4\common\t c:\my\wizzi\v4\legacy\wizzi-legacy-codegen\t  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\legacy\wizzi-legacy-codegen\root\t c:\my\wizzi\v4\legacy\wizzi-legacy-codegen\src\ittf\root\t  /XD .git, node_modules

    robocopy c:\my\wizzi\v4\common\t c:\my\wizzi\v5\apps\wizzi-tools\t  /MIR /XD .git, node_modules
    robocopy c:\my\wizzi\v4\common\src\ittf\apps\wizzi-tools\root\t c:\my\wizzi\v5\apps\wizzi-tools\src\ittf\root\t  /XD .git, node_modules

}
