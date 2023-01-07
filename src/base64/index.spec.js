const { test, describe } = require('node:test');
const { equal } = require('node:assert');

const { decode64, encode64 } = require('./index');

const data = "elizandrodantas";
let encode = null;

describe("[Base64] Test Base64 Utility", function(){
    test("B64 Encode", function(){
        const result = encode64(data);
        encode = result;

        equal(result, 'ZWxpemFuZHJvZGFudGFz');
    });

    test("B64 Decode", function(){
        const result = decode64(encode);

        equal(result, data);
    });
});
