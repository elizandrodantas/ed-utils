const { assign, merge } = require("../merge");
const { isUndefined, isString, isObject } = require("./typeof");

const codigoPais = ['55', '+55'];
const codigoArea = [
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "21",
    "22",
    "24",
    "27",
    "28",
    "31",
    "32",
    "33",
    "34",
    "35",
    "37",
    "38",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "51",
    "53",
    "54",
    "55",
    "61",
    "61",
    "62",
    "64",
    "63",
    "65",
    "66",
    "67",
    "68",
    "69",
    "71",
    "73",
    "74",
    "75",
    "77",
    "79",
    "81",
    "87",
    "82",
    "83",
    "84",
    "85",
    "88",
    "86",
    "89",
    "91",
    "93",
    "94",
    "92",
    "97",
    "95",
    "96",
    "98",
    "99"
];

const defaults = {
    areaCodePresent: true,
    countryCodePresent: false,
    justTypeNumber: false,
    checkDigitNine: false
}

/**
 * options function validator phone
 * 
 * @typedef {object} IOptionsValidatorPhone
 * @property {boolean} countryCodePresent
 * @property {boolean} areaCodePresent
 * @property {boolean} justTypeNumber - returns only the type of the number (mobile/fixed)
 * @property {boolean} allowMobileOnly - only accept mobile phone
 * @property {boolean} allowFixedOnly - accept only fixed
 * @property {boolean} checkDigitNine
 */

/**
 * 
 * @param {string} phone 
 * @param {IOptionsValidatorPhone} options
 * @return {boolean | string}
 */

function isPhone(phone, options){
    if(isUndefined(phone))
        return false;
    
    if(!isString(phone))
        phone = String(phone);

    phone = phone.replace(/\D/gi, "");

    if(!isObject(options))
        options = {};

    options = merge(options, defaults);

    if(phone.length < 8 || phone.length > 14)
        return false;

    const number = phone.substring(phone.length - 8, phone.length);
    var n = false, ddd = false, ddi = false, type = 'unknown';

    if(number.charAt() >= 2 && number.charAt() <= 5)
        type = 'fixed' ;
    if(number.charAt() >= 6 && number.charAt() <= 9)
        type = 'mobile';

    if(options.justTypeNumber)
        return type;

    if(options.allowFixedOnly && type !== "finex")
        return false;

    if(options.allowMobileOnly && type !== "mobile")
        return false;
    
    options.checkDigitNine && type === 'mobile' && (n = true);
    options.areaCodePresent && (ddd = true);
    options.countryCodePresent && (ddi = true);

    n && (n = phone.substring(
        (phone.length - number.length) - 1,
        phone.length - number.length
    ));

    if(n && n !== '9')
        return false;

    ddd && (ddd = phone.substring(
        ddi ? 2 : 0,
        ddi ? 4 : 0
    ));

    if(ddd && !codigoArea.includes(ddd))
        return false;

    ddi && (ddi = phone.substring(
        0, 2,
        2
    ));

    if(ddi && !codigoPais.includes(ddi))
        return false;
    
    var challenge = number.length;

    options.areaCodePresent && (challenge += 2)
    options.countryCodePresent && (challenge += 2)
    options.checkDigitNine && type === 'mobile' && (challenge += 1);

    if(phone.length !== challenge)
        return false;

    return true
}

exports.isPhone = isPhone;
