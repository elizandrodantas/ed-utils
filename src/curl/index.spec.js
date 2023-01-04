const { test } = require('node:test');
const { equal } = require('node:assert');

const { Curl } = require('./index');

const options = {
    url: "http://ip-api.com/json/",
    method: "POST"
}

const controller = new Curl(options);

test('[CURL] Method GET Test', async function(){
    const response = await controller.get();

    equal(response.body.status, "success");
});

test('[CURL] Method POST STATIC Test', async function(){
    const response = await Curl.post(options);

    equal(response.body.status, "success");
});