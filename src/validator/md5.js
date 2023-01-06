const { isString } = require("./typeof");

const REGEX = /^[a-f0-9]{32}$/;

/**
 *
 * @param {string} string
 * @return {boolean}
 */

function isMd5(string){
    if(isString(string)){
        return REGEX.test(string);
    }

    return false;
}

exports.isMd5 = isMd5;
