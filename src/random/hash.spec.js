const { test } = require('node:test');
const { equal } = require('node:assert');

const { hash } = require('./hash');
const { isString } = require('../validator/typeof');

function condition(result){
    return isString(result) && result.length === 16 ? result : null;
}

test('[RANDOM] Random hash test', function(){
    const result = hash(16, {
        number: true,
        special: true,
        upper: true
    });

    equal(result, condition(result));
});
