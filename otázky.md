## Jak byste při plnění zadání postupovali (alespoň v několika bodech, vlastními slovy).

- Nejprve bych rozebral strukturu API, MQTT zprávy a pravidla pro vznik událostí. 
Popsal bych očekaváné vstupní data, znázornil chování aplikace.
- Aplikaci bych rozdělil na moduly pro komunikaci, příjem MQTT zpráv,
  správu stavů vrat a emailová upozornění.
- Technickou architekturu bych příliš nekomplikoval, použil bych jen to nejnutnější. Podle potřeby bych přidával knihovny pro práci s MQTT 
- a rozesílání mailů atd.

- Nejdříve bych připravil lokální ukázková data a simuloval otevření a zavření vrat (kdybych neměl jinou možnost k otestování)
- Potom bych implementoval časovou hysterezi, měření délky otevření a zápis událostí. 
- Pak bych doplnil logování, ošetření výpadků a aktualizoval dokumentaci 

## Jak by se váš program choval a které jeho části by spolu komunikovaly.

- Po spuštění by modul pro komunikaci načetl konfiguraci a propojil čidla s místy přes `misto_id`. 
Konfigurace by se pravidelně obnovovala.
- MQTT modul by přijímal zprávy, ověřoval jejich formát a 
předával je správci stavů vrat. Ten by v paměťové struktuře `Map`, indexované podle ID čidla, uchovával 
potvrzený stav, kandidáta změny, čas začátku otevření a příznak, zda již vznikl `open`.
- Krátké výkyvy by
filtroval samostatný časovač hystereze. Další časovač by sledoval limit otevření, takže by upozornění
vzniklo i bez příchodu nové MQTT zprávy.

Například při nastavené hysterezi 2 sekundy a limitu otevření 60 sekund 
by správce nejprve potvrdil otevření a uložil ho do paměti. Pokud by vrata zůstala
otevřená déle než 60 sekund od začátku potvrzené změny, vytvořil by `open` a předal 
ho komunikačnímu modulu k zápisu a emailovému modulu k odeslání upozornění. Po potvrzeném zavření
by stejným způsobem vytvořil `close`. Při zavření před limitem by nevznikla ani jedna z 
těchto událostí. Neúspěšná odeslání bych evidoval odděleně pro opakování, aby výpadek API nebo 
SMTP nezastavil sledování ostatních vrat.

## P.S

Kdybych ještě měl čas a možnost, přidal bych monitoring, logování a alerting pro IT tým
(Např. Prometheus, Grafana, Kibana/Elastic). Pro lepší debug a
řešení incidentů. A také bych přidal unit a automatické integrační, E2E testy (Playwright) pro každý popsaný scénář.