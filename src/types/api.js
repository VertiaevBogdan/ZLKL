/**
 *
 *
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
 * strukrura response
 *
 * @typedef {Object} response
 * @property {Sensor[]} sens
 * seznam senzorů
 *
 * @property {Location[]} loc
 * seznam míst, kde se nachazejí senzory
 * **/