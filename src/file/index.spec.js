const { test, before, after, describe } = require('node:test');
const { equal } = require('node:assert');

const { createFile, createFolder, exist, deleteFile, deleteFolder } = require('./index');

describe('FILE Test', function(){
    test('[FILE] Test exist folder (test)', function(){
        createFolder('test');
        equal(exist('test'), true);
    });

    test('[FILE] Test exist folder (test/create-folder)', function(){
        createFolder('test/create-folder');
        equal(exist('test/create-folder'), true);
    });

    test('[FILE] Test exist file (test/create-file)', function(){
        createFile('test/create-file');
        equal(exist('test/create-file'), true);
    });

    after(function(){
        deleteFile('test/create-file');
        deleteFolder('test/create-folder');
        deleteFolder('test');
    });
})
