clear

cd C:\My\wizzi\v5\apps\3dParty\isomorphic-git
npm run buildTemp

<#mkdir C:\My\wizzi\v5\apps\wizzi-studio\dist\server\static\isomorphic-git#>

copy-item C:\My\wizzi\v5\apps\3dParty\isomorphic-git\dist\bundle.umd.js C:\My\wizzi\v5\apps\wizzi-studio\dist\server\static\isomorphic-git\bundle.umd.js -Force
copy-item C:\My\wizzi\v5\apps\3dParty\isomorphic-git\dist\internal.umd.js C:\My\wizzi\v5\apps\wizzi-studio\dist\server\static\isomorphic-git\internal.umd.js -Force