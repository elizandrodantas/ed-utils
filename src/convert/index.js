
/**
 *
 * @param {string} str
 * @return {number}
 */

function StrToNumber(str){
    return Number(str);
}

exports.StrToNumber = StrToNumber;

/**
 *
 * @param {number} number
 * @return {string}
 */

function NumberToStr(number){
    return String(number);
}

exports.NumberToStr = NumberToStr;

/**
 *
 * @param {string} value
 * @param {string} pattern
 * @return {string}
 */

function mask(value, pattern){
    let i = 0;
	const v = value.toString();

	return pattern.replace(/#/g, ()=> v[i++] || '');
}

exports.mask = mask;
