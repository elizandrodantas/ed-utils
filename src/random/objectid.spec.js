const { test } = require('node:test');
const { equal } = require('node:assert');

const { objectId } = require('./objectid');
const { isObjectId } = require('../validator/objectid');

test("[Random] Crate ObjectId", function(){
    const result = objectId();

    equal(isObjectId(result), true, "should be a objectid valid");
});
