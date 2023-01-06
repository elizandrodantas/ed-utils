const { isString, isArray, isObject } = require("./typeof");

const REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gm;

/**
 * @typedef {object} IEmailValidatorOption
 * @property {string | string[]} whitelist
 */

/**
 *
 * @param {string} string
 * @param {IEmailValidatorOption} options
 * @return {boolean}
 */

function isEmail(string, options = {}){
    if(!isString(string))
        return false;

    if(!isObject(options))
        options = {}

    const [ local, domain ] = string.split('@');

    if(options.whitelist && !whiteListValidator(domain, options.whitelist))
        return false;

    if(!local || !domain)
        return false;

    const points = domain.split('.');

    if(points.length <= 1)
        return false;

    return REGEX.test(string);
}

/**
 *
 * @param {string} domain
 * @param {string | string[]} condition
 * @return {boolean}
 */

function whiteListValidator(domain, condition){
    try{
        if(isString(condition)){
            if(condition.split('@').length > 1 && condition.split('@')[1])
                condition = condition.split('@')[1];

            return domain === condition;
        }

        if(isArray(condition)){
            condition = condition.filter(isString);
            condition = condition.map(e => e && e?.split('@').length > 1 && e?.split('@')[1] ? e.split('@')[1] : e);

            return condition.includes(domain);
        }

        return false;
    }catch(err){
        return false;
    }
}

exports.isEmail = isEmail;

