const { merge, assign } = require("../merge");
const { isObject, isFunction, isString, isUndefined } = require("../validator/typeof");
const { uuidv4 } = require('../random/uuidv4');
const { objectId } = require('../random/objectid');

const typesStringAccepted = [
    "string",
    "number",
    "boolean",
    "date",
    "buffer",
    "any",
    "unknown"
];

const defaults = {
    id: "uuid"
}

const allowOption = [
    "id",
    "version"
];

/**
 * @typedef {object} ISchemaOptions
 * @property {function | string} type
 * @property {boolean} [required=false]
 * @property {unknown} [defaults=]
 * @property {(value: unknown) => void} [transform]
 */

/**
 * @typedef {object} ISchemaContructorOption
 * @property {boolean | "uuid" | "hash"} id
 * @property {boolean} [version]
 */


/**
 * @constructor
 * @param {Object.<string, ISchemaOptions>} schema
 * @param {ISchemaContructorOption} options
 */

function Schema(schema, options = {}){
    if(!schema || !isObject(schema)){
        throw new Error("SimpleDatabase: schema expects an object and receives a '" + typeof schema + "'");
    }

    if(!options || !isObject(options)){
        options = {};
    }

    options = merge(options, defaults);

    this.options = {};
    this.setOptions(options);
    this.schema = schema;
}

/**
 *
 * @param {Object.<string, ISchemaOptions>} [value]
 * @return {boolean}
 */

Schema.prototype.validator = function(value = null){
    const schema = value || this.schema;

    if(!schema){
        return false;
    }

    let len = 0;

    for(let k in schema){
        len++;
    }

    if(len = 0){
        return false;
    }

    let valid = true;

    for(let i in schema){
        const { type } = schema[i];

        if(!isFunction(type) || !isString(type)){
            const allowType = isFunction(type) ? type?.name?.toLowerCase() : type?.toLowerCase();
            if(!typesStringAccepted.includes(allowType)){
                valid = false;
                break;
            }
        }
    }

    if(!schema.id && this.options.id){
        this.schema = assign({id: { type: String, required: true, defaults: "default_id" }}, schema);
    }

    this.th = Object.keys(this.schema);

    return valid;
}

/**
 *
 * @param {Object.<string, unknown>} parameter
 */

Schema.prototype.pre = function(parameter){
    if(!parameter || !isObject(parameter)){
        throw new Error("SimpleDatabase: expects an object and receives a '" + typeof parameter + "'");
    }

    let values = {},
        error = null;

    for(let index in this.schema){
        const { type, required, defaults, transform } = this.schema[index];

        if(isUndefined(parameter[index]) && required){
            if(index === "id"){
                console.log(
                this.options

                )
                if(this.options.id){
                    parameter[index] = this._createId(this.options.id);
                }
            }else{
                error = "parameter '"+ index +"' is required field";
                break;
            }
        }

        if(!isUndefined(parameter[index])){
            if(defaults && !parameter[index]){
                values[index] = defaults;
            }

            if(transform && isFunction(transform) && values[index]){
                values[index] = transform(values[index]);
            }else{
                values[index] = parameter[index];
            }

        }

        if(values[index]){
            const allowType = isFunction(type) ? type.name.toLowerCase() : type.toLowerCase();

            if(type !== "any"){
                if(typeof values[index] !== allowType && required){
                    error = "invalid type schema in parameter '" + index + "'";
                    break;
                }
            }
        }

        if(isUndefined(parameter[index]) && !required){
            values[index] = null;
        }
    }

    if(error !== null){
        throw new Error("SimpleDatabase: " + error);
    }

    return values;
}

/**
 *
 * @param {ISchemaContructorOption} opt
 */

Schema.prototype.setOptions = function(opt){
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
 * @param {"uuid" | "hash"} type
 * @return {string}
 */

Schema.prototype._createId = function(type){
    if(type === "uuid"){
        return uuidv4();
    }

    return objectId();
}


exports.Schema = Schema;
