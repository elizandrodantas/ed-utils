const { isString } = require("../validator/typeof");

/**
 *
 * @param {string} string
 * @param {BufferEncoding} encoding
 * @return {string}
 */

function encode64(string, encoding = "utf-8"){
    if(!isString(string))
        string = JSON.stringify(string);

    return Buffer.from(string, encoding).toString('base64');
}

exports.encode64 = encode64;

/**
 *
 * @param {string} string
 * @param {BufferEncoding} encoding
 * @return {string}
 */

function decode64(b64, encoding = "utf-8"){
    if(!isString(b64))
        return null;

    return Buffer.from(b64, "base64").toString(encoding);
}

exports.decode64 = decode64;
