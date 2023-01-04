const { test } = require('node:test');
const { equal } = require('node:assert');

const { assign, merge } = require('./index');

const obj1 = {
    country: "BR",
    city: "PICOS",
    state: "PI"
};

const obj2 = {
    year: "2023",
    city: "RECIFE",
    state: "PE"
};

test('[MERGE] Test of merge', function(){
    const result = merge(obj1, obj2);
    
    equal(result.year, "2023");
    equal(result.city, "PICOS");
    equal(result.state, "PI");
});

test('[MERGE] Test of assign', function(){
    const result = assign(obj1, obj2);

    equal(result.year, "2023");
    equal(result.city, "RECIFE");
    equal(result.state, "PE");
});
