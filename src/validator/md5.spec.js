const { test, describe } = require('node:test');
const { deepEqual } = require('node:assert');

const { isMd5 } = require('./md5');
const { createHash } = require('node:crypto');

const hash = createHash('md5')
                .update(`${new Date().getTime()}`)
                .digest('hex');

describe("[MD5] Test Md5 Validator", function(){
    test("Md5 valid", function(){
        const reuslt = isMd5(hash);

        deepEqual(reuslt, true, "should be a hash md5 valid");
    });

    test("Md5 invalid", function(){
        const reuslt = isMd5('hash');

        deepEqual(reuslt, false, "should be a hash md5 invalid");
    });
});
