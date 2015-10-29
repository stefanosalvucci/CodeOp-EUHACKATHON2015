# EUHackathon

Integrazione viewport, views and backend - OK
send sample data and shos it on client B - OK
application

...MODIFICARE

COSA:
- view Alice: client/views/aStart/aStart.html
- view Bob: client/views/bStart.html . Magari mettete codice fra  cosi viene eseguito in-line e al limite poi lo sposto io

COME:
inserire codice tra <template name=""> e </template> utilizzando 

APP (29-10 10pm) DEPLOYED AT: http://mctest1236.meteor.com
- --> TEST: aprire su 2 tab diverse de browser o su 2 diversi computer il link
- ... su una tab cliccare PRIMA su Bob e poi sull'altra Alice
- ... osservare tab con Bob ricevere dei dati passati in modo fittizio dal client di Alice

**NOTA / TODO**:
- volendo si può non far scegliere
- TODO: integrare global variable by Alberto (trasformandala in un Session.method e triggerando il push to Client B quando la session variable è disponibile)
- TODO: appCache to cache kiwiJS?
