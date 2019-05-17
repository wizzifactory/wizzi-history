The t-folder containing the app-options.ittf fragment
is at the root level of /wizzi.
So it can be mixed both by the
wfjob model in /wizzi/generate.wfjob.ittf
and by the sources in /wizzi/ittf.

Note that the 'app-options.ittf' file has not the schema
extension. When not specified the schema extension is assumed
to be that of the mixer. In this way the same file can
be mixed by ittf documents of type *.js.ittf, *.json.ittf, 
*.html.ittf, ecc...