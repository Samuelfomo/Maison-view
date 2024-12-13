module.exports = {
    DecoderResponse: null,
    SubscriberData: null,
    FormulaData: null,
    ShortlinkResponse: null,
    RequiementResponse: null,
    OptionData: null,
    SubscriptionResponse: null,
    SubscriptionStatus: null,
    SubscriptionOperation: null,
    DecoderData: null,
    MerchantData: null,
    ManagerData: null,
    CityData: null,
    CountryData: null
};

/**
 * @typedef {Object} DecoderResponse
 * @property {number} status
 * @property {string} type
 * @property {Object} response
 * @property {number} response.code
 * @property {number} response.device
 * @property {number} response.identifier
 * @property {string} response.location
 * @property {SubscriberData} response.subscriber
 * @property {string} response.started
 * @property {string} response.finished
 * @property {number} response.remaining
 * @property {FormulaData} response.formula
 * @property {string} response.updated
 * @property {boolean} response.existed
 * @property {boolean} response.verified
 * @property {boolean} response.forbidden
 * @property {string|null} response.comment
 */

/**
 * @typedef {Object} SubscriberData
 * @property {number} code
 * @property {string} firstname
 * @property {string} lastname
 * @property {Object} city
 * @property {string} city.code
 * @property {string} city.name
 * @property {Object} city.country
 * @property {number} city.country.code
 * @property {string} city.country.alpha2
 * @property {string} city.country.alpha3
 * @property {number} city.country.dialcode
 * @property {string} city.country.fr
 * @property {string} city.country.en
 * @property {string} location
 * @property {string} language
 * @property {string} gender
 * @property {number} mobile
 * @property {string|null} email
 * @property {boolean} qualified
 */

/**
 * @typedef {Object} FormulaData
 * @property {string} code
 * @property {string} name
 * @property {number} amount
 * @property {string|null} comment
 * @property {*|null} options
 */

/**
 * @typedef {Object} ShortlinkResponse
 * @property {number} status
 * @property {string} type
 * @property {Object} response
 * @property {string} response.token
 * @property {number} response.merchant
 * @property {number} response.decoder
 * @property {string} response.shorlink
 */

/**
 * @typedef {Object} RequiementResponse
 * @property {number} status
 * @property {string} type
 * @property {Object} response
 * @property {FormulaData} response.formulas
 * @property {OptionData} response.options
 */

/**
 * @typedef {Object} OptionData
 * @property {string} code
 * @property {string} name
 * @property {number} amount
 * @property {string|null} comment
 * @property {string|null} options
 */

/**
 * @typedef {Object} SubscriptionResponse
 * @property {number} status
 * @property {string} type
 * @property {Object} response
 * @property {number} response.code
 * @property {string} response.date
 * @property {string} response.time
 * @property {string} response.reference
 * @property {boolean} response.self_service
 * @property {number} response.duration
 * @property {number} response.amount
 * @property {number} response.formula_cost
 * @property {number} response.options_cost
 * @property {SubscriptionStatus} response.status
 * @property {SubscriptionOperation} response.operation
 * @property {DecoderData} response.decoder
 * @property {number} response.earned
 * @property {SubscriberData} response.subscriber
 * @property {MerchantData} response.merchant
 * @property {FormulaData} response.formula
 * @property {FormulaData} response.old_formula
 * @property {OptionData|null} response.options
 * @property {string|null} response.comment
 */

/**
 * @typedef {Object} SubscriptionStatus
 * @property {string} token
 * @property {string} charcode
 * @property {string} name
 * @property {string} color
 */

/**
 * @typedef {Object} SubscriptionOperation
 * @property {string} token
 * @property {string} reference
 * @property {string} name
 * @property {string} viewing
 * @property {string} color
 */

/**
 * @typedef {Object} DecoderData
 * @property {number} code
 * @property {number} device
 * @property {number} identifier
 * @property {string} location
 * @property {SubscriberData} subscriber
 * @property {string} started
 * @property {string} finished
 * @property {number} remaining
 * @property {FormulaData} formula
 * @property {string} updated
 * @property {boolean} existed
 * @property {boolean} verified
 * @property {boolean} forbidden
 * @property {string|null} comment
 */

/**
 * @typedef {Object} MerchantData
 * @property {number} code
 * @property {string} name
 * @property {CityData} city
 * @property {string} location
 * @property {number} cga
 * @property {boolean} secured
 * @property {boolean} certified
 * @property {ManagerData} manager
 * @property {number} mobile
 * @property {string|null} email
 * @property {number} rates
 * @property {number[]} range
 */

/**
 * @typedef {Object} ManagerData
 * @property {number} code
 * @property {string} firstname
 * @property {string} lastname
 * @property {CityData} city
 * @property {string} location
 */

/**
 * @typedef {Object} CityData
 * @property {string} code
 * @property {string} name
 * @property {CountryData} country
 */

/**
 * @typedef {Object} CountryData
 * @property {number} code
 * @property {string} alpha2
 * @property {string} alpha3
 * @property {number} dialcode
 * @property {string} fr
 * @property {string} en
 */
