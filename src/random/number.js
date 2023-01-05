const { isNumber } = require("../validator/typeof");

/**
 * 
 * @param {number} max 
 * @param {number} min
 * @return {number}
 */

function random(max, min = 0){
    if(!isNumber(max))
        return 0;

    if(!isNumber(min) || min >  max)
        min = 0;

    return Math.floor(Math.random() * (max - min) + min);
}

exports.random = random;
