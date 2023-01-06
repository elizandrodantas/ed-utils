const { test } = require('node:test');
const { equal } = require('node:assert');

const { isEmail } = require('./email');

test("[Email] Test Email Validator", async function(){
    const condition = await isEmail("elizandro@dev.com");

    equal(condition, true, "should be a email valid");
});
