/**
 * 
 * @template T, K
 * @param {T} target 
 * @param {K} sources 
 * @return {T & K}
 */

function assign(target, sources){
    return Object.assign({}, target, sources);
}

exports.assign = assign;

/**
 * 
 * @template T, K
 * @param {T} options 
 * @param {K} defaults 
 * @return {K & T}
 */

function merge(options = {}, defaults){
    for(const key in defaults)
        if(typeof options[key] === 'undefined')
            options[key] = defaults[key];

    return options;
}

exports.merge = merge;
