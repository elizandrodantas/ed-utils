const { describe, test } = require('node:test');
const { deepEqual } = require('node:assert');

const { isArray, isBoolean, isFunction, isNumber, isObject, isString, isUndefined } = require('./typeof');

describe("[TYPEOF] Test validator TypeOf", function(){
    test("Test is array", function(){
        deepEqual(isArray(["hello", "word"]), true, "should be array");
        deepEqual(isArray({ hello: "word" }), false, "its not a array");
        deepEqual(isArray(123), false, "its not a array");
        deepEqual(isArray(null), false, "its not a array");
        deepEqual(isArray(undefined), false, "its not a array");
        deepEqual(isArray(false), false, "its not a array");
    });

    test("Test is Object", function(){
        deepEqual(isObject(["hello", "word"]), false, "its not a object");
        deepEqual(isObject({ hello: "word" }), true, "should be a object");
        deepEqual(isObject(123), false, "its not a object");
        deepEqual(isObject(null), false, "its not a object");
        deepEqual(isObject(undefined), false, "its not a object");
        deepEqual(isObject(false), false, "its not a object");
    });

    test("Test is Number", function(){
        deepEqual(isNumber(["hello", "word"]), false, "its not a number");
        deepEqual(isNumber({ hello: "word" }), false, "its not a number");
        deepEqual(isNumber(123), true, "should be a number");
        deepEqual(isNumber(null), false, "its not a number");
        deepEqual(isNumber(undefined), false, "its not a number");
        deepEqual(isNumber(false), false, "its not a number");
    });

    test("Test is String", function(){
        deepEqual(isString(["hello", "word"]), false, "its not a string");
        deepEqual(isString({ hello: "word" }), false, "its not a string");
        deepEqual(isString(123), false, "its not a string");
        deepEqual(isString("null"), true, "should be a string");
        deepEqual(isString(undefined), false, "its not a string");
        deepEqual(isString(false), false, "its not a string");
    });

    test("Test is Undefined", function(){
        deepEqual(isUndefined(["hello", "word"]), false, "its not a undefined");
        deepEqual(isUndefined({ hello: "word" }), false, "should be a undefined");
        deepEqual(isUndefined(123), false, "its not a undefined");
        deepEqual(isUndefined("null"), false, "its not a undefined");
        deepEqual(isUndefined(undefined), true, "should be a undefined");
        deepEqual(isUndefined(false), false, "its not a undefined");
    });

    test("Test is Boolean", function(){
        deepEqual(isBoolean(["hello", "word"]), false, "its not a boolean");
        deepEqual(isBoolean({ hello: "word" }), false, "its not a boolean");
        deepEqual(isBoolean(123), false, "its not a boolean");
        deepEqual(isBoolean("null"), false, "its not a boolean");
        deepEqual(isBoolean(undefined), false, "its not a boolean");
        deepEqual(isBoolean(false), true, "should be a boolean");
    });

    test("Test is Function", function(){
        deepEqual(isFunction(["hello", "word"]), false, "its not a function");
        deepEqual(isFunction({ hello: "word" }), false, "its not a function");
        deepEqual(isFunction(123), false, "its not a function");
        deepEqual(isFunction("null"), false, "its not a function");
        deepEqual(isFunction(undefined), false, "its not a function");
        deepEqual(isFunction(false), false, "its not a function");
        deepEqual(isFunction(isFunction), true, "should be a function");
    });
});
