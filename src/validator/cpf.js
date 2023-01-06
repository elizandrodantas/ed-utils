const { isString } = require("./typeof");

const BlackList = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '12345678909'
];

/**
 *
 * @param {string} digit
 * @return {number}
 */

function validateDigit(digit){
    const numbers = digit.split('')
        .map(num => parseInt(num, 10)),
        operation = numbers.length + 1,
        multiply = numbers.map((val, index) => val * (operation - index)),
        sum = multiply.reduce((acc, cur) => acc + cur) % 11;

    return sum < 2 ? 0 : 11 - sum
}

/**
 *
 * @param {string} cpf
 * @return {boolean}
 */

function isCpf(cpf){
    if (!isString(cpf))
        return false;

	cpf = cpf.replace(/\D/gi, "");

	if (!cpf || cpf.length !== 11)
        return false;

    if(BlackList.includes(cpf))
        return false;

    let challenge = cpf.substring(0, 9);
    challenge += validateDigit(challenge);
    challenge += validateDigit(challenge);

    return challenge.substr(-2) === cpf.substr(-2);
}

exports.isCpf = isCpf;
