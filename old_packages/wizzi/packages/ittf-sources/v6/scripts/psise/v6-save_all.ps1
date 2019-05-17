﻿<# 
    WARNING this is a generate file
    THE SOURCE IS IN : c:\my\wizzi\v5\kernel\wizzi-monorepo\src\ittf\root\store_packages.v6.text.ittf
    Scripts to prepare github pushes of wizzi factory ittf source code.
    Go to wizzifactory/wizzi/packages/ittf-sources.
#> 
<# 
    Root t-folder
#> 
robocopy c:/my/wizzi/v6\t c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6/t /MIR /XD .git, node_modules
<# 
    Kernel packages, source: c:/my/wizzi/v6/kernel , dest: c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6
#> 
robocopy c:/my/wizzi/v6/kernel/t c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6/kernel/t /MIR /XD .git, node_modules
<# 
    Plugin packages, source: c:/my/wizzi/v6/plugins , dest: c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6
#> 
robocopy c:/my/wizzi/v6/plugins/t c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6/plugins/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v6/plugins/wizzi-js/src c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6/plugins/wizzi-js/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v6/plugins/wizzi-js/t c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6/plugins/wizzi-js/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v6/plugins/wizzi-web/src c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6/plugins/wizzi-web/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v6/plugins/wizzi-web/t c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6/plugins/wizzi-web/t /MIR /XD .git, node_modules
<# 
    Legacy packages, source: c:/my/wizzi/v6/legacy , dest: c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6
#> 
robocopy c:/my/wizzi/v6/legacy/wizzi-legacy-v5 c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6/wizzi-legacy-v5 /MIR /XD .git, node_modules
<# 
    App packages, source: c:/my/wizzi/v6/apps , dest: c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6
#> 
robocopy c:/my/wizzi/v6/apps\t c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6/apps/t /MIR /XD .git, node_modules
<# 
    Tutorial packages, source: c:/my/wizzi/v6/apps/js-tutorials , dest: c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6
#> 
<# 
    Scripts 
#> 
robocopy c:/my/wizzi/v6/scripts c:/my/wizzi/v5/github/wizzi/packages/ittf-sources/v6/scripts /MIR /XD .git, node_modules
