const { isString } = require("./typeof");

const REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

/**
 *
 * @param {string} uid
 * @return {boolean}
 */

function isUuidv4(uid){
    return isString(uid) && REGEX.test(uid);
}

exports.isUuidv4 = isUuidv4;
