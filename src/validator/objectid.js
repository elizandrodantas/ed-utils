const { isString } = require("./typeof");

const REGEX = /^[0-9a-fA-F]{24}$/;

function isObjectId(string){
    if(!isString(string))
        return false;

    return REGEX.test(string);
}

exports.isObjectId = isObjectId;
