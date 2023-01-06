const { test, describe } = require('node:test');
const { deepEqual } = require('node:assert');

const { isCpf } = require('./cpf');

describe("[CPF] Test Cpf Validator", function(){
    test("Test cpf valid", function(){
        deepEqual(isCpf("00063180022"), true, "should be document valid");
    });

    test("Test cpf invalid", function(){
        deepEqual(isCpf("00063180020"), false, "should be document invalid");
    });
});
