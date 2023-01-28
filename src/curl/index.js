const request = require('request');
const { assign } = require('../merge');
const { isObject, isNumber, isString } = require('../validator');
const { constants } = require('node:crypto');
const { parse: parseUrl } = require('node:url');

const defaults = {
    rate: 10,
    timeout: 6e4
}

class Curl {
    /** @typedef {{ rate: number, resolveTLS: boolean }} ICurlAdditionalOption*/
    /** @typedef {request.CoreOptions & request.UrlOptions & ICurlAdditionalOption} ICurlRequest */
    /** @typedef {{ error: any, response: request.Response, body: any }} ICurlResponse */

    /**
     *
     * @param {ICurlRequest} options
     */

    constructor(options){
        if(!options || !isObject(options))
            options = {}

        if(!options.url)
            throw new Error("url required in options");

        /** @type {ICurlRequest} */
        this.options = options;

        options?.resolveTLS && this.use$resolveTLS();
    }

    /**
     *
     * @return {ICurlRequest}
     */

    getOptions(){
        return this.options;
    }

    /**
     *
     * @param  {ICurlRequest} opt
     * @return {Curl}
     */

    setOptions(opt){
        if(opt && isObject(opt))
            this.options = assign(this.options, opt);


        this.options?.resolveTLS && this.use$resolveTLS();

        return this;
    }

    /**
     * ********************************************
     * =+=+=+=+=+=+=+=+ METHOD GET =+=+=+=+=+=+=+=+
     * ********************************************
     */

    /**
     *
     * @return {Promise<ICurlResponse>}
     */

    get(){
        if(!isString(this.options.method) || this.options.method?.toLowerCase() !== "get")
            this.options = assign(this.options, { method: "GET" });

        return this.request();
    }

    /**
     *
     * @param {ICurlRequest} options
     * @return {Promise<ICurlResponse>}
     */

    static get(options){
        if(!isObject(options))
            options = {};

        if(!options?.url)
            throw new Error("url required in options");

        if(!isString(options?.method) || options.method?.toLowerCase() !== "get")
            options = assign(options, { method: "GET" });

        const _curl = new Curl(options);

        return _curl.request();
    }

    /**
     * *********************************************
     * =+=+=+=+=+=+=+=+ METHOD POST =+=+=+=+=+=+=+=+
     * *********************************************
     */

    /**
     *
     * @return {Promise<ICurlResponse>}
     */

    post(){
        if(!isString(this.options.method) || this.options.method?.toLowerCase() !== "post")
            this.options = assign(this.options, { method: "POST" });

        return this.request();
    }

    /**
     *
     * @param {ICurlRequest} options
     * @return {Promise<ICurlResponse>}
     */

    static post(options){
        if(!isObject(options))
            options = {};

        if(!options?.url)
            throw new Error("url required in options");

        if(!isString(options?.method) || options.method?.toLowerCase() !== "post")
            options = assign(options, { method: "POST" });

        const _curl = new Curl(options);

        return _curl.request();
    }

    /**
     * ********************************************
     * =+=+=+=+=+=+=+=+ METHOD PUT =+=+=+=+=+=+=+=+
     * ********************************************
     */

    /**
     *
     * @return {Promise<ICurlResponse>}
     */

    put(){
        if(!isString(this.options.method) || this.options.method?.toLowerCase() !== "put")
            this.options = assign(this.options, { method: "PUT" });

        return this.request();
    }

    /**
     *
     * @param {ICurlRequest} options
     * @return {Promise<ICurlResponse>}
     */

    static put(options){
        if(!isObject(options))
            options = {};

        if(!options?.url)
            throw new Error("url required in options");

        if(!isString(options?.method) || options.method?.toLowerCase() !== "put")
            options = assign(options, { method: "PUT" });

        const _curl = new Curl(options);

        return _curl.request();
    }

    /**
     * ************************************************
     * =+=+=+=+=+=+=+=+ METHOD DELETE =+=+=+=+=+=+=+=+=+
     * ************************************************
     */

    /**
     *
     * @return {Promise<ICurlResponse>}
     */

    delete(){
        if(!isString(this.options.method) || this.options.method?.toLowerCase() !== "delete")
            this.options = assign(this.options, { method: "DETELE" });

        return this.request();
    }

    /**
     *
     * @param {ICurlRequest} options
     * @return {Promise<ICurlResponse>}
     */

    static delete(options){
        if(!isObject(options))
            options = {};

        if(!options?.url)
            throw new Error("url required in options");

        if(!isString(options?.method) || options.method?.toLowerCase() !== "delete")
            options = assign(options, { method: "DELETE" });

        const _curl = new Curl(options);

        return _curl.request();
    }



    /**
     *
     * @return {Promise<ICurlResponse>}
     */

    async request(){
        const { options } = this;

        try{
            if(!isObject(options))
                throw new Error("options type invalid");

            if(!options.rate || !isNumber(options.rate) || options.rate < 1)
                options.rate = defaults.rate;

            if(!options.timeout || !isNumber(options.timeout) || options.timeout < 1000)
                options.timeout = defaults.timeout;

            return new Promise(async resolve => {

                /**
                *
                * @param {ICurlRequest} options
                * @return {Promise<ICurlResponse>}
                */

                function _(options){
                    return new Promise(res => request(options, (error, response, body) => {
                        try { body = JSON.parse(body) } catch(__) {}

                        return res({ error, response, body });
                    }));
                }

                for (let index = 0; index < options.rate; index++) {
                    var response = await _(options);

                    if(!response?.error && response?.response?.statusCode) break;
                }

                return resolve(response);
            });
        }catch(err){
            return { error: err, response: {}, body: null }
        }
    }

    /**!
     *  TLS Resolve error [unsafe legacy renegotiation disabled]
     *  @private
     */

    use$resolveTLS(){
        const { url } = this.options;

        const { protocol } = parseUrl(url || "");

        if(protocol){
            const [ name ] = protocol.split(':');

            if(name === "https"){
                this.options = assign(this.options, { secureOptions: constants.SSL_OP_LEGACY_SERVER_CONNECT });
            }
        }
    }
}

exports.Curl = Curl;
