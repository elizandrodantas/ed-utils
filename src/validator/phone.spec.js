const { test, describe } = require('node:test');
const { equal } = require('node:assert');

const { isPhone } = require('./phone');

describe("[Telefone] Test validator Phone", function(){
    test("Phone simple", function(){
        const result = isPhone("8100-0000", {
            areaCodePresent: false
        });

        equal(result, true);
    });

    test("Phone with nine digit", function(){
        const result = isPhone("9 8100-0000", {
            areaCodePresent: false,
            checkDigitNine: true
        });

        equal(result, true);
    });

    test("Phone With nine digit and area code", function(){
        const result = isPhone("(89) 9 8100-0000", {
            checkDigitNine: true
        });

        equal(result, true);
    });

    test("Phone complete", function(){
        const result = isPhone("+55 (89) 9 8100-0000", {
            checkDigitNine: true,
            countryCodePresent: true
        });

        equal(result, true);
    });
});
