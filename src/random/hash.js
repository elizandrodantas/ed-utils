const { isObject } = require("../validator/typeof");
const { merge } = require("../merge");
const { array } = require("./array");

const charLow = "abcdefghijlmnopqrstuvxz";
const charUp = "ABCDEFGHIJLMNOPQRSTUVXZ";
const charNumber = "123456789";
const charSpecial = "_-$#+="

const defaults = {
    number: true
}

/**
 * @typedef {object} IOptionGenerateHash
 * @property {boolean} number
 * @property {boolean} upper
 * @property {boolean} special
 * @property {boolean} onlyUpper
 */

/**
 *
 * @param {number} length
 * @param {IOptionGenerateHash} options
 * @return {string}
 */

function hash(length = 16, options = {}){
    if(!isObject(options))
        options = {};

    options = merge(options, defaults);


    const char = [];
    const output = [];

    options.onlyUpper ? char.push(charUp) : char.push(charLow);
    options.upper && !options.onlyUpper && char.push(charUp);
    options.number && char.push(charNumber);
    options.special && char.push(charSpecial);

    for(let i = 0; i < length; i++)
        output.push(array(char.join('').split('')));

    return output.join('');
}

exports.hash = hash;
