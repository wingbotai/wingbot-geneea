/*
 * @author David Menger
 */
'use strict';

const { CachedModel } = require('wingbot');
const request = require('request-promise-native');
const assert = require('assert');

const SERVICE_URL = 'https://intent.geneea.com/models';


/**
 * @typedef {Object} Entity
 * @param {string} name
 * @param {string} type
 */

/**
 * @typedef {Object} Intent
 * @param {string} intent
 * @param {number} score
 * @param {Entity[]} [entities]
 */

/**
 * @typedef {Object} GeneeaIntent
 * @private
 * @param {string} name
 * @param {number} confidence
 * @param {Entity[]} [args]
 */

/**
 * @typedef {Object} GeneeaResponse
 * @private
 * @param {GeneeaIntent[]} allIntents
 * @param {GeneeaIntent} mainIntent
 */

/**
 * @class AI Plugin Model
 */
class GeneeaModel extends CachedModel {

    /**
     * @param {Object} options
     * @param {string} options.authorization - the authorization header
     * @param {string} options.model - model name (part of the url)
     * @param {number} [options.cacheSize]
     * @param {string} [options.serviceUrl]
     * @param {{ warn: Function }} [log] - logging function
     */
    constructor (options, log = console) {
        super(options, log);

        assert.equal(typeof options.model, 'string', 'The model option has to be string');
        assert.equal(typeof options.authorization, 'string', 'The authorization option has to be string');
        // @ts-ignore
        this._request = options.request || request;
        this._auth = options.authorization;

        this._serviceUrl = options.serviceUrl || SERVICE_URL;
        this._model = options.model;
    }

    /**
     * @function resolve
     * @memberof GeneeaModel
     * @instance
     * @param {string} text - the user input
     * @returns {Promise<Intent[]>}
     */


    /**
     * Resolve the intent from text
     *
     * @param {string} text
     * @returns {Promise<Intent[]>}
     * @private
     */
    async _queryModel (text) {
        const trim = (text || '').trim();

        if (trim.length === 0) {
            return [];
        }

        const qs = {
            text: trim
        };

        try {
            /** @type {GeneeaResponse} */
            const response = await this._request({
                url: `${this._serviceUrl}/${this._model}/intent`,
                qs,
                json: true,
                timeout: 20000,
                headers: {
                    Authorization: this._auth
                }
            });

            if (!response.allIntents) {
                return [];
            }

            return response.allIntents
                .map(({ name, confidence, args = [] }) => ({
                    intent: name,
                    score: confidence,
                    entities: args
                }));

        } catch (e) {
            this._log.warn('AI query failed', e);
            return [];
        }
    }

}

module.exports = GeneeaModel;
