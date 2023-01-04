
/**
 * 
 * @param {any} value 
 * @return {boolean}
 */

function isString(value){
    return typeof value === "string";
}

exports.isString = isString;

/**
 * 
 * @param {any} value 
 * @return {boolean}
 */

function isNumber(value){
    return typeof value === "number" && !isNaN(value);
}

exports.isNumber = isNumber;

/**
 * 
 * @param {any} value 
 * @return {boolean}
 */

function isBoolean(value){
    return typeof value === "boolean";
}

exports.isBoolean = isBoolean;

/**
 * 
 * @param {any} value 
 * @return {boolean}
 */

function isObject(value){
    return typeof value === "object" && !Array.isArray(value) && value !== null;
}

exports.isObject = isObject;

/**
 * 
 * @param {any} value 
 * @return {boolean}
 */

function isArray(value){
    return Array.isArray(value);
}

exports.isArray = isArray;

/**
 * 
 * @param {any} value 
 * @return {boolean}
 */

function isFunction(value){
    return typeof value === "function";
}

exports.isFunction = isFunction;

/**
 * 
 * @param {any} value 
 * @return {boolean}
 */

function isUndefined(value){
    return typeof value === "undefined";
}

exports.isUndefined = isUndefined;
