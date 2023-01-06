const { test, describe } = require('node:test');
const { equal } = require('node:assert');

const { isObjectId } = require('./objectid');

test("[ObjectId] Test ObjectId Validator", function(){
    const valid = isObjectId("551137c2f9e1fac808a5f572");
    const invalid = isObjectId("551137c2f9e1facx08z5f572");

    equal(valid, true, "should be object id valid");
    equal(invalid, false, "should be object id invalid");
});
