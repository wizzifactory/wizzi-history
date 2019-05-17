<# 
    WARNING this is a generate file
    THE SOURCE IS IN : c:\my\wizzi\v5\kernel\wizzi-monorepo\src\ittf\root\store_packages.text.ittf
    Scripts to prepare github pushes of wizzi factory ittf source code.
    Go to wizzifactory/wizzi/packages/ittf-sources.
#> 
<# 
    Plugin packages, source: c:/my/wizzi/v5/plugins , dest: c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v5

robocopy c:/my/wizzi/v5/plugins/wizzi-core/src c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v5/plugins/wizzi-core/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-core/t c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v5/plugins/wizzi-core/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-meta/src c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v5/plugins/wizzi-meta/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-meta/t c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v5/plugins/wizzi-meta/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-js/src c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v5/plugins/wizzi-js/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-js/t c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v5/plugins/wizzi-js/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-web/src c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v5/plugins/wizzi-web/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-web/t c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v5/plugins/wizzi-web/t /MIR /XD .git, node_modules
#> 
robocopy c:/my/wizzi/v5/plugins/wizzi-js/src c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v5/plugins/wizzi-js/src /MIR /XD .git, node_modules
