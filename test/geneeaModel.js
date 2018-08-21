/*
 * @author David Menger
 */
'use strict';

const sinon = require('sinon');
const GeneeaModel = require('../src/GeneeaModel');
const assert = require('assert');

const MOCK_INTENT = {
    args: [{ name: 'a', type: 'b' }],
    name: 'intentName',
    confidence: 1.0
};

const MOCK_RESPONSE = {
    allIntents: [MOCK_INTENT],
    mainIntent: MOCK_INTENT
};

describe('<GeneeaModel>', () => {

    /** @type {GeneeaModel} */
    let model;
    /** @type {sinon.SinonSpy} */
    let mockReq;

    beforeEach(() => {
        mockReq = sinon.spy((query) => {
            if (query.qs.text === 'fail') {
                throw new Error('random error');
            }
            if (query.qs.text === 'malformed') {
                return {};
            }

            return MOCK_RESPONSE;
        });

        model = new GeneeaModel({
            serviceUrl: 'a',
            authorization: 'b',
            model: 'c',
            // @ts-ignore
            request: mockReq
        });
    });

    describe('#resolve()', () => {

        it('should return resolved entity', async () => {
            const res = await model.resolve('random');

            assert.deepStrictEqual(res, [{
                intent: 'intentName',
                score: 1.0,
                entities: [
                    {
                        name: 'a',
                        type: 'b'
                    }
                ]
            }]);
        });

        it('should return the array, when it fails', async () => {
            const res = await model.resolve('fail');
            assert.deepStrictEqual(res, []);
        });

        it('is ok with malformed response', async () => {
            const res = await model.resolve('malformed');
            assert.deepStrictEqual(res, []);
            assert.strictEqual(mockReq.callCount, 1);
        });

        it('should return empty array when the text is empty', async () => {
            const res = await model.resolve('');
            assert.deepStrictEqual(res, []);
            assert.strictEqual(mockReq.callCount, 0);
        });

        it('should use default url, when not passed', async () => {
            model = new GeneeaModel({
                authorization: 'b',
                model: 'c',
                // @ts-ignore
                request: mockReq
            });

            await model.resolve('ha');

            assert.strictEqual(mockReq.firstCall.args[0].url, 'https://intent.geneea.com/models/c/intent');
        });

    });

});
