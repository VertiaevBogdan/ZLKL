/**
 * @typedef {'avg' | 'max'} AggregationType
 **/

 /** @typedef {string} ThresholdExpression
 * Podmínka pro porovnání hodnoty čidla.
 *  Příklady: "1", ">1", ">=1", "<1", "<=1",
 *  "1:2", "1~2", "1>2".
 *  Desetinná čísla se zapisují s tečkou, například "<10.5".
  *  **/

/**
 * @typedef {'warning' | 'danger' | 'info' | 'success'} MessageType
 * typ zprávy, může být: 'warning', 'danger', 'info', 'success'
 *
 * **/

/**
 * @typedef {Object} ThresholdRule
 *
 * @property {boolean} enabled
 * pokud false tak prah ignorovat
 *
 * @property {ThresholdExpression} prah
 *
 * @property {number} minDelaySec
 * (int) minimální doba změny hodnoty na čidle,
 * pokud se změní hodnota čidla tak se musí držet minimálně tuto dobu,
 * pak se teprve detekuje změna - generuje event
 *
 * @property {string} extPrah
 * externí prah, pokud empty tak vypnuto,
 * jinak detekuje teplotu venkovního čidla
 *
 * @property {number} extMinDelaySec
 * minimální doba změny hodnoty na čidle venku
 * pokud dojde ke změně hodnoty, čeká se tuto dobu než se propíše
 * do hodnoty, která je testována, pokud se hodnota vrátí do původního
 * stavu před tím než uplyne tato doba tak se detekce resetuje
 *
 * @property {MessageType} msgType
 *
 * @property {number} mailSendPrah
 * doba za kterou je poslán mail při změně stavu
 *  na otevřeno, pokud se do této doby zavřou dveře tak se mail nepošle,
 * tento čas nastane až po vygenerování eventu na otevřeno
 * - závislost na minDelaySec
 * Pokud je tato hodnota 0 tak se použije thresholds.mailSendPrah,
 * pokud je ta také 0 tak se mail nepošle
 *
 * @property {string} mail_list
 * seznam mailových adres oddělených
 * čárkou, pokud prázdné tak se použije thresholds.mail_list a pokud
  *je ten také prázdný tak se mail neodešle
 *
 * @property {string} message
 * odeslaná zpráva, pokud je "" tak se
 * použije thresholds.message
 * **/

/**
 * @typedef {Object} SensorThresholds
 *
 * @property {ThresholdRule[]} prahy
 *
 * @property {number} mailSendPrah
 * záložní hodnota pro hodnotu v prahu; 0 = vypnuto
 *
 * @property {string} mail_list
 *  záložní hodnota pro hodnotu v prahu
 *
 * @property {string} message
 * Příklad: "Hodnota pro pravidlo \"%prah%\" (s externím limitem %extPrah%)- %trigger%, hodnota je"
 * **/



/**
 * "sens" - seznam senzorů
 * @typedef {Object} Sensor
 *
 * @property {number} id
 * Unikátní id záznamu v db
 *
 * @property {string} adr
 * Adresa čidla používaná pro identifikaci v pravidelných
 *  MQTT zprávách. Příklad: "tof:e8:6b:ea:d2:cd:90"
 * @property {string} nazev
 * Zobrazovaný název, může odpovídat "adr"
 *
 * @property {string} mqtt_id
 * MQTT ID pod kterým je registrován jako klient. Používá se v topicu MQTT zpráv.
 * @property {number | null} misto_id
 * ID místa, kde je senzor nastaven, pokud je null - ignoruje se.
 *
 * @property {number} curr_val
 * Aktuální číselná hodnota čidla. Číslo s desetonou čárkou
 *
 * @property {string} curr_val_str
 * Příklad zápisu: "32,2 mm"
 *
 * @property {boolean} online
 * pokud false tak nevysílalo 15minut
 * @property {string} jednotky
 * Příklad - "mm"
 *
 * @property {number} prec
 * kolik desetinných míst se má zobrazovat
 *
 * @property {number} pomer
 * float - výchozí je 1.0, "val" se násobí tímto číslem pro správný výsledek
 *
 * @property {string} cidlo_last_tx
 *  Datum a čas posledního vysílání čidla.
 * Formát: "yyyy-mm-dd hh:mm:ss"
 *
 * @property {string} jednotky_popis
 * Příklad: "Míra mm"
 *
 * @property {AggregationType} jednotky_agr_typ
 * Způsob jak jednotka počítá hodnotu mezi odesíláním.
 * avg - průměr, max - maximum
 *
 * @property {string} jednotky_ico_css
 * CSS třídy ikony jednotky.
 *
 * @property {string} jednotky_ico_css_active
 * HTML kód ikony jednotky.
 *
 * @property {number} jednotky_fail_val
 * pokud -1 tak nenastaveno, jiná hodnota určuje chybovou
 * 'val', tzn pokud 'val' obsahuje toto číslo tak se jedná o chybu čidla
 *
 * @property {SensorThresholds} thresholds
 * **/

/**
 * "loc" - seznam míst kde `id` odpovídá `misto_id` v `sens`
 * @typedef {Object} Location
 *
 * @property {number} id
 * Unikatní id, PK v DB kde loc.id = sens.misto_id
 *
 * @property {string} pth
 * Cesta místa v adresáři, např "./file/gate"
 *
 * @property {string} nazev
 * Název lokace
 * @property {number} map
 *
 * @property {number} tof_prah_min
 * Hodnota délky otevírání vrat. Pokud je 0 - sledování je vypnuto. Formát 1.21 znamená 1 min 21 sekunda
 *
 * @property {string} tof_maily
 * Maximální délka je 200. Je seznam mailů oddělených čárkou, pokud je řetězec prázdný - odesílání je vypnuto
 * **/

/**
 * Strukrura response API
 *
 * @typedef {Object} response
 * @property {Sensor[]} sens
 * seznam senzorů
 *
 * @property {Location[]} loc
 * seznam míst, kde se nachazejí senzory
 * **/