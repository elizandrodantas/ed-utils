
/**
 *
 * @param {string} input
 * @return {string}
 */

function getAllWord(input){
    if(!input?.match)
        return null;

    const match = input.match(/\D+/gm);
    if(match)
        return match.join("");

    return "";
}

exports.getAllWord = getAllWord;

/**
 *
 * @param {string} input
 * @return {string}
 */

function getAllNumber(input){
    if(!input?.match)
        return null;

    const match = input.match(/\d/gm);
    if(match)
        return match.join("");

    return "";
}

exports.getAllNumber = getAllNumber;

/**
 *
 * @param {string} data
 * @param {string} start
 * @param {string} end
 * @param {number} i
 * @return {string}
 */

function getString(data, start, end, i = 1){
    if(i <= 0)
        i = 1;

    if(!start && !end)
        return data;

    return end && start ? data.split(start)[i].split(end)[0] :
        !start && end ? data.split(end)[0] : data.split(start)[1];
}

exports.getString = getString;
