const { test, describe } = require('node:test');
const { deepEqual } = require('node:assert');

const { getAllNumber, getAllWord, getString } = require('./index');

const data = "Lorem ipsum dolor sit amet, consectetur 1adipiscing elit. Aenean sed quam sit amet velit 2blandit facilisis. Sed 3interdum nunc leo.";

describe("[EXTRACT] Test Extract", function(){
    test("Test GetAllNumber", function(){
        const result = getAllNumber(data);

        deepEqual(result, '123', "response should be '123'");
    });

    test("Test getAllWord", function(){
        const result = getAllWord(data);
        const output = data.replace(/[0-9]/g, "");

        deepEqual(result, output);
    });

    test("Test GetString", function(){
        const result = getString(data, false, ',');

        deepEqual(result, 'Lorem ipsum dolor sit amet');
    });
});
