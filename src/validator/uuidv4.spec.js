const { test, describe } = require('node:test');
const { deepEqual } = require('node:assert');

const { isUuidv4 } = require('./uuidv4');
const { uuidv4 } = require('../random/uuidv4');

var uid = uuidv4();

describe("[UUID] Test Validator UIDv4", function(){
    test("Uuid valid", function(){
        deepEqual(isUuidv4(uid), true, "should be uuid valid");
    });

    test("Uuid invalid", function(){
        uid = uid.replace(/-/g, "");

        deepEqual(isUuidv4(uid), false, "its not a uuidv4");
    });
});
