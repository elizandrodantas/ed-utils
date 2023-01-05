const { number } = require("./number");
const { isArray } = require("../validator/typeof");

/**
 *
 * @template T
 * @param {T[]} array
 * @return {T}
 */

function array(array){
    if(isArray(array)){
        return array[number(array.length)];
    }

    return null;
}

exports.array = array;
