const { hostname } = require('node:os');
const { createHash } = require('node:crypto');

/**
 *
 * @return {string}
 */

function objectId(){
    const secondInHex = Math.floor(new Date()/1000).toString(16);
    const machineId = createHash('md5').update(hostname()).digest('hex').slice(0, 6);
    const processId = process.pid.toString(16).slice(0, 4).padStart(4, '0');
    const counter = process.hrtime()[1].toString(16).slice(0, 6).padStart(6, '0');

    return secondInHex + machineId + processId + counter;
}

exports.objectId = objectId;
