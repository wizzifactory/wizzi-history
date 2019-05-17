*** documentation Jobs
I jobs per generare i file di documentazione sono generati partendo 
dalla cartella /src/ittf/jobs

*** Dopo passaggio a nuova versione
Eseguire find di 'v5' e valutare ove sostituire con v6

*** Generation
1) execute /src/generate
. prepare jobs
. do not uses the /models folder; it is used by jobs afterwards.


2) launch final generations see:
	/wizzi/<version>/scripts/psipse folder of powershell scripts.

	You should submit:

	cd c:\my\wizzi\<version>\test\wizzi-documentation\jobs
	node site
	node index
	node concepts
	node starters
	node project
	node docs
	node api_preprocess
	node api
	node code_intro
	node code_preprocess
	node code

	etcetera

