const { test } = require('node:test');
const { equal } = require('node:assert');

const { random } = require('./number');
const { isNumber } = require('../validator/typeof');

function condition(result){
    return isNumber(result) && result >= 3 && result < 5 ? result : null;
}

test('[RANDOM] Random number test', function(){
    const result = random(5, 3);

    equal(result, condition(result));
});
