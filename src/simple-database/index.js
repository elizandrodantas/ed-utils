const { Schema } = require('./schema');
const { isObject, isString } = require('../validator/typeof');
const { merge, assign } = require('../merge/index');
const { createFolder, createFile } = require('../file/index');
const { Find } = require('./structure/find');

const { resolve } = require('node:path');
const { createReadStream, createWriteStream, appendFileSync } = require('node:fs');

/**
 *  interface options instance
 *
 * @typedef {object} IOptionSimpleDatabase
 * @property {string} [folder=database]
 */

const defaults = {
    folder: "database"
}

const allowOption = [
    "folder"
];

/**
 * Simple local database
 *
 * @constructor
 * @param {Schema} schema schame of database
 * @param {IOptionSimpleDatabase & import('./schema').ISchemaContructorOption} [options] aditional options
 */

function Simple(schema, options){
    if(!(schema instanceof Schema)){
        throw new Error("SimpleDatabase: schema must be passed as a 'Schema' instance");
    }

    if(!options || !isObject(options)){
        options = {}
    }

    options = merge(options, defaults);

    this.schema = schema;
    this.options = {};

    this.schema.setOptions(options);
    this.setOptions(options);

    this.folder = isString(options?.folder) ? options?.folder : 'database';
    this.file = resolve(this.folder, 'db.json');

    this._requirements();
}

/**
 *  set options in instance
 *
 * @param {IOptionSimpleDatabase & import('./schema').ISchemaContructorOption} opt
 */

Simple.prototype.setOptions = function(opt){
    if(!isObject(opt)){
        opt = {};
    }

    Object.keys(opt).forEach(element => {
        if(!allowOption.includes(element)){
            delete opt[element];
        }
    });

    this.options = assign(this.options, opt);
}

/**
 *  add values ​​to database
 *
 * @template T
 * @param {T} data
 * @return {Promise<T>}
 */

Simple.prototype.create = async function(data){
    if(!isObject(data)){
        throw new Error("SimpleDatabase: data expects an object and receives a '" + typeof data + "'");
    }

    const _pre = this.schema.pre(data);

    this._requirements();

    try{
        const _json = await _dataJson(this.file);

        _json.push(_pre);

        _write(this.file, JSON.stringify(_json));

        return _pre;
    }catch(err){
        throw new Error("SimpleDatabase: " + err?.message || err);
    }
}

/**
 *  interface find filter
 *
 * @typedef {Object.<string, unknown>} IFindFilter
 */

/**
 *  interface options filter [many]
 *
 * @typedef {object} IOptionFilter
 * @property {number} [limit=1e3]
 * @property {number} [offset]
 */

/**
 *  search for many
 *
 * @param {IFindFilter} where
 * @param {IOptionFilter} options
 */

Simple.prototype.find = async function(where, options = {}){
    if(!isObject(where)){
        where = {};
    }

    if(!isObject(options)){
        options = {};
    }

    try{
        var data = await _dataJson(this.file);

        return new Find(data, where, options, "many", this.schema.schema);
    }catch(err){
        throw new Error("SimpleDatabase: " + err?.message);
    }
}

/**
 *  search only first
 *
 * @param {IFindFilter} where
 */

Simple.prototype.findOne = async function(where){
    if(!isObject(where)){
        throw new Error("SimpleDatabase: condition to search mandatory");
    }

    try{
        const data = await _dataJson(this.file);

        return new Find(data, where, {}, 'one', this.schema.schema);
    }catch(err){
        throw new Error("SimpleDatabase: error findOne ["+ err.message +"]");
    }
}

/**!
 * make sure the files exist
 * @private
 */

Simple.prototype._requirements = function(){
    createFolder(this.folder);
    createFile(this.file, '[]');
}

/**!
 * responsible for checking that the json file is not broken
 * @private
 */

Simple.prototype._compromised = async function(){
    const _data = await _read(this.file);

    try{
        let i = JSON.parse(_data);
        i.push('2');
    }catch(err){
        throw new Error("SimpleDatabase: compromised database file");
    }
}

/**
 * responsible for checking that the json file is not broken [static]
 */

Simple._requirements = function(){
    const _self = new Simple(new Schema({}), {});

    _self._requirements();
}

/**!
 *  read the database and check if the data is as expected
 *
 * @param {string} file
 * @return {Promise<Object.<string, unknown>[]>}
 */

async function _dataJson(file){
    var _data,
        _json;

    try{
        _data = await _read(file);
    }catch(read){
        throw new Error("error read file");
    }

    try{
        _json = JSON.parse(_data);
    }catch(formated){
        throw new Error("compromised database file");
    }

    return _json;
}

/**
 *  read the database [stream]
 *
 * @param {string} file
 * @return {Promise<string>}
 */

function _read(file){
    return new Promise(function(resolve, rejects){
        const output = [];

        const stream = createReadStream(file, "utf-8");

        stream.on('error', function(){
            rejects(new Error("SimpleDatabase: error read file"));
        });

        stream.on('data', function(data){
            output.push(data);
        });

        stream.on('end', function(){
            return resolve(output.join(''));
        });
    });
}

/**
 *  write to the database [stream]
 *
 * @param {string} file
 * @param {string} data
 * @return {Promise<string>}
 */

function _write(file, data){
    return new Promise(function(resolve, rejects){
        const stream = createWriteStream(file, {
            encoding: "utf-8"
        });

        stream.write(data, "utf-8");

        stream.on('error', function(){
            rejects(new Error("SimpleDatabase: error write file"));
        });

        stream.on('end', function(){
            resolve(data);
        });
    });
}

/**
 *  write to the database
 *
 * @param {string} file
 * @param {string} data
 */

function _append(file, data){
    appendFileSync(file, data, "utf-8");
}

exports.Simple = Simple;
exports.Schema = Schema;
