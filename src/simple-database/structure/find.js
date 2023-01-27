const { isNumber, isUndefined, isArray, isObject, isString } = require("../../validator/typeof");

/**
 * find structure
 *
 * @constructor
 * @template T, W, W
 * @param {T} data
 * @param {W} where
 * @param {K} options
 * @param {"one" | "many"} type
 * @param {Object.<string, unknown>} schema
 */

function Find(data, where, options, type = "one", schema){

    if(type == "many"){
        isObject(where) &&  Object.keys(where).length > 0 && this.where(data, where);
        let { offset } = options;

        if(isNumber(offset)){
            if(offset > data.length){
                throw new Error("SimpleDatabase: offset is greater than the number of dice");
            }

            data = data.slice(
                offset
            );
        }

        data = data.filter(Boolean);
    }

    if(type == "one"){
        isObject(where) && Object.keys(where).length > 0 && (data = this.where(data, where));
    }

    this.$dataSchemaNull(data, schema);
    this.data = data;
    this._t = type;
}

/**
 *
 * @param {number} len
 * @return {Find}
 */

Find.prototype.limit = function(len){
    if(this._t == "many"){
        if(len > this.data.length){
            len = this.data.length;
        }

        this.data = this.data.slice(
            0, len
        );
    }

    return this;
}

Find.prototype.get = function(){
    return this.data;
}

Find.prototype.$dataSchemaNull = function(data, schema){
    const keys = Object.keys(schema);

    if(isArray(data)){
        for(let index of data){
            for(let k of keys){
                if(!(k in index)){
                    index[k] = null
                }
            }
        }
    }else{
        for(let k of keys){
            if(data !== null){
                if(!(k in data)){
                    data[k] = null
                }
            }
        }
    }
}

Find.prototype.where = function(data, condition){
    const keys = Object.keys(condition);

    let len = keys.length;

    if(this._t == 'many'){
        for(let indice = 0; indice < data.length; indice++){
            const k = Object.keys(data[indice]);
            let m = 0;

            for(let i of k){
                if(keys.includes(i)){
                    this.where$once(data[indice][i], condition[i]) && m++;
                }
            }

            if(m !== len){
                data[indice] = undefined;
            }
        }
    }else{
        let mutual = 0,
            _index = null;

        data.reverse();

        for(let wh in condition){
            for(let element of data){
                if(!isUndefined(condition[wh]) && condition[wh] == element[wh]){
                    mutual++;
                    _index = element;
                    break;
                }
            }
        }


        return _index
    }
}

    /**
     *
     * @param {unknown} value
     * @param {Object.<string, unknown> | unknown} condition
     */

    Find.prototype.where$once = function(value, condition){
        if(isObject(condition)){
            const { not, match, include, gt, lt } = condition;

            if(not){
                if(value !== not){
                    return true;
                }
            }else if(match){
                if(value?.match(match)){
                    return true;
                }
            }else if(include){
                if(isString(value) || isArray(value)){
                    if(value?.includes(include)){
                        return true;
                    }
                }else{
                    throw new Error("data must be a string or array to condition include");
                }
            }else if(gt){
                if(gt < value){
                    return true;
                }
            }else if(lt){
                if(lt > value){
                    return true;
                }
            }else{
                if(value === condition){
                    return true;
                }
            }
        }else{
            if(value === condition){
                return true;
            }
        }

        return false;
    }

exports.Find = Find;
