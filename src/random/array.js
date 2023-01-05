const random = require(".");
const { isArray } = require("../validator/typeof");

/**
 *
 * @template T
 * @param {T[]} array
 * @return {T}
 */

function array(array){
    if(isArray(array)){
        return array[random(array.length)];
    }

    return null;
}

exports.array = array;
