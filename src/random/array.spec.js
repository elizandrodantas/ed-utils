const { test } = require('node:test');
const { equal } = require('node:assert');

const { array } = require('./array');

const param = [
    "elizandro",
    "dantas",
    2023
]

/**
 *
 * @template T
 * @param {T[]} data
 * @param {T} result
 * @return {T}
 */

function condition(data, result){
    return data.some(d => d === result) ? result : null;
}

test("[RANDOM] Random Array Test", function(){
    const result = array(param);

    equal(result, condition(param, result));
});
