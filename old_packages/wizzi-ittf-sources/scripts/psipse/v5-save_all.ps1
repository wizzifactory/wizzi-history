<# 
    Scripts to prepare github pushes of wizzi factory packages.
#> 
robocopy c:/my/wizzi/v5\t c:/my/wizzi/v5/github/wizzi-ittf-sources/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps\t c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/t /MIR /XD .git, node_modules
<# 
    Kernel packages, source: c:/my/wizzi/v5/kernel , dest: c:/my/wizzi/v5/github/wizzi-ittf-sources
#> 
robocopy c:/my/wizzi/v5/kernel/wizzi/src c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/kernel/wizzi/t c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/kernel/wizzi-utils/src c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-utils/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/kernel/wizzi-utils/t c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-utils/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/kernel/wizzi-mtree/src c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-mtree/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/kernel/wizzi-mtree/t c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-mtree/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/kernel/wizzi-repo/src c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-repo/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/kernel/wizzi-repo/t c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-repo/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/kernel/wizzi-scripts c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-scripts /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/kernel/wizzi-scripts/t c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-scripts/t /MIR /XD .git, node_modules
<# 
    Plugin packages, source: c:/my/wizzi/v5/plugins , dest: c:/my/wizzi/v5/github/wizzi-ittf-sources
#> 
robocopy c:/my/wizzi/v5/plugins/wizzi-core/src c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-core/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-core/t c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-core/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-meta/src c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-meta/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-meta/t c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-meta/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-js/src c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-js/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-js/t c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-js/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-web/src c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-web/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-web/t c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-web/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-docs/src c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-docs/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/plugins/wizzi-docs/t c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-docs/t /MIR /XD .git, node_modules
<# 
    Legacy packages, source: c:/my/wizzi/v5/legacy , dest: c:/my/wizzi/v5/github/wizzi-ittf-sources
#> 
robocopy c:/my/wizzi/v5/legacy/wizzi-legacy-v4 c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-legacy-v4 /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/legacy/wizzi-legacy-v4-codegen c:/my/wizzi/v5/github/wizzi-ittf-sources/wizzi-legacy-v4-codegen /MIR /XD .git, node_modules
<# 
    App packages, source: c:/my/wizzi/v5/apps , dest: c:/my/wizzi/v5/github/wizzi-ittf-sources
#> 
robocopy c:/my/wizzi/v5/apps/wizzi-demo/src c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-demo/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/wizzi-demo/t c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-demo/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/wizzi-tools/src c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-tools/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/wizzi-tools/t c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-tools/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/wizzi-tools-next/src c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-tools-next/src /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/wizzi-tools-next/t c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-tools-next/t /MIR /XD .git, node_modules
<# 
    Tutorial packages, source: c:/my/wizzi/v5/apps/js-tutorials , dest: c:/my/wizzi/v5/github/wizzi-ittf-sources
#> 
<# nodejs-es6 #>
robocopy c:/my/wizzi/v5/apps/js-tutorials/nodejs-es6/es6-simple\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/nodejs-es6/es6-simple/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/js-tutorials/nodejs-es6/es6-express\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/nodejs-es6/es6-express/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/js-tutorials/nodejs-es6/es6-firebase\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/nodejs-es6/es6-firebase/wizzi /MIR /XD .git, node_modules
<# webpack #>
robocopy c:/my/wizzi/v5/apps/js-tutorials/webpack/react-codemirror\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/webpack/react-codemirror/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/js-tutorials/webpack/react-monaco\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/webpack/react-monaco/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/js-tutorials/webpack/react-static\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/webpack/react-static/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/js-tutorials/webpack/react-static-schema-doc\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/webpack/react-static-schema-doc/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/js-tutorials/webpack/redux-material-ui-wizzi\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/webpack/redux-material-ui-wizzi/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/js-tutorials/webpack/router-redux-firestore\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/webpack/router-redux-firestore/wizzi /MIR /XD .git, node_modules
<# nextjs #>
robocopy c:/my/wizzi/v5/apps/js-tutorials/nextjs/starter\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/nextjs/starter/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/js-tutorials/nextjs/hello-next\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/nextjs/hello-next/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/js-tutorials/nextjs/redux-material-ui-wizzi\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/nextjs/redux-material-ui-wizzi/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/js-tutorials/nextjs/with-redux\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/nextjs/with-redux/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/js-tutorials/nextjs/wizzi\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/nextjs/wizzi/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/js-tutorials/nextjs/wizzifier\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/nextjs/wizzifier/wizzi /MIR /XD .git, node_modules
<# cdn #>
robocopy c:/my/wizzi/v5/apps/js-tutorials/cdn/react-editor\wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/js-tutorials/cdn/react-editor/wizzi /MIR /XD .git, node_modules
<# 
    Wizzi studio packages, source: c:/my/wizzi/v5/apps/wizzi-studio , dest: c:/my/wizzi/v5/github/wizzi-ittf-sources
#> 
robocopy c:/my/wizzi/v5/apps/wizzi-studio/wizzi-studio-express/wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-studio-express/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/wizzi-studio/wizzi-studio-express/t c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-studio-express/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/wizzi-studio/wizzi-play/wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-play/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/wizzi-studio/wizzi-play/t c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-play/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/wizzi-studio/wizzi-play2/wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-play2/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/wizzi-studio/wizzi-play2/t c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-play2/t /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/wizzi-studio/wizzi-play3/wizzi c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-play3/wizzi /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/wizzi-studio/wizzi-play3/t c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-play3/t /MIR /XD .git, node_modules
<# 
    Static ittf documents in the /server folder of wizzi-studio-express
#> 
robocopy c:/my/wizzi/v5/apps/wizzi-studio/wizzi-studio-express/dist/server/ittf c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-studio-express/dist/server/ittf /MIR /XD .git, node_modules
robocopy c:/my/wizzi/v5/apps/wizzi-studio/wizzi-studio-express/dist/server/data c:/my/wizzi/v5/github/wizzi-ittf-sources/apps/wizzi-studio-express/dist/server/data /MIR /XD .git, node_modules
<# 
    Scripts 
#> 
robocopy c:/my/wizzi/v5/scripts c:/my/wizzi/v5/github/wizzi-ittf-sources/scripts /MIR /XD .git, node_modules
