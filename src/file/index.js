
const { existsSync, mkdirSync, writeFileSync, rmSync, rmdirSync, renameSync } = require('node:fs');

/**
 *
 * @param {string} path
 * @return {boolean}
 */

function exist(path){
    return existsSync(path);
}

exports.exist = exist;

/**
 *
 * @param {string} folder_name
 */

function createFolder(folder_name){
    if(!exist(folder_name)){
        mkdirSync(folder_name);
    }
}

exports.createFolder = createFolder;

/**
 *
 * @param {string} folder_name
 */

function deleteFolder(folder_name){
    if(exist(folder_name)){
        rmdirSync(folder_name);
    }
}

exports.deleteFolder = deleteFolder;

/**
 *
 * @param {string} file_name
 */

function createFile(file_name){
    if(!exist(file_name)){
        writeFileSync(file_name, "");
    }
}

exports.createFile = createFile;

/**
 *
 * @param {string} file_name
 */

function deleteFile(file_name){
    if(exist(file_name)){
        rmSync(file_name);
    }
}

exports.deleteFile = deleteFile;
