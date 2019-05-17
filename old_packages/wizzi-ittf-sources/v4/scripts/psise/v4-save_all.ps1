<# 
    Scripts to prepare github pushes of wizzi factory packages.
#> 
robocopy c:/my/wizzi/v4\t c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/t /MIR /XD .git, node_modules
<# 
    Kernel packages, source: c:/my/wizzi/v4/kernel , dest: c:/my/wizzi/v5/github/wizzi-ittf-sources/v4
#> 
robocopy c:/my/wizzi/v4/kernel/wizzi/src c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/kernel/wizzi/t c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/kernel/wizzi-utils/src c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-utils/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/kernel/wizzi-utils/t c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-utils/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/kernel/wizzi-mtree/src c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-mtree/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/kernel/wizzi-mtree/t c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-mtree/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/kernel/wizzi-repo/src c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-repo/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/kernel/wizzi-repo/t c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-repo/t /MIR /XD .git, node_modules
<# 
    Plugin packages, source: c:/my/wizzi/v4/plugins , dest: c:/my/wizzi/v5/github/wizzi-ittf-sources/v4
#> 
robocopy c:/my/wizzi/v4/plugins/wizzi-core/src c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-core/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/plugins/wizzi-core/t c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-core/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/plugins/wizzi-meta/src c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-meta/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/plugins/wizzi-meta/t c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-meta/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/plugins/wizzi-js/src c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-js/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/plugins/wizzi-js/t c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-js/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/plugins/wizzi-html/src c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-html/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/plugins/wizzi-html/t c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-html/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/plugins/wizzi-docs/src c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-docs/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/plugins/wizzi-docs/t c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-docs/t /MIR /XD .git, node_modules
<# 
    Legacy packages, source: c:/my/wizzi/v4/legacy , dest: c:/my/wizzi/v5/github/wizzi-ittf-sources/v4
#> 
robocopy c:/my/wizzi/v4/legacy/wizzi-legacy-v4 c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-legacy-v4 /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v4/legacy/wizzi-legacy-v4-codegen c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/wizzi-legacy-v4-codegen /MIR /XD .git, node_modules
<# 
    Scripts 
#> 
robocopy c:/my/wizzi/v4/scripts c:/my/wizzi/v5/github/wizzi-ittf-sources/v4/scripts /MIR /XD .git, node_modules
