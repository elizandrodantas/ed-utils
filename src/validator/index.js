const { isArray, isBoolean, isFunction, isNumber, isObject, isString, isUndefined } = require('./typeof');
const { isCpf } = require('./cpf');
const { isEmail } = require('./email');
const { isMd5 } = require('./md5');
const { isObjectId } = require('./objectid');
const { isPhone } = require('./phone');
const { isUuidv4 } = require('./uuidv4');

module.exports = {
    isArray,
    isBoolean,
    isFunction,
    isNumber,
    isObject,
    isString,
    isUndefined,
    isCpf,
    isEmail,
    isMd5,
    isObjectId,
    isPhone,
    isUuidv4
}
