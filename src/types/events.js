/**
 * @typedef {'open' | 'close'} EventType
 * **/

/**
 * @typedef {Object} event
 *
 * @property {number} id
 * ID čídla
 *
 * @property {EventType} typ
 * Typ události (open nebo close)
 *
 * @property {number} when
 * Unixový timestamp kdy bylo detekováno otevření
 *
 * @property {number} sent
 * Unixový timestamp kdy byl odeslán email
 *
 * @property {string} to
 * Seznam emailů, na které bylo upozornění odesláno
 * **/