const expect = require('chai').expect
// const sinon = require('sinon');

import ApixAction from '../lib/ApixAction';

describe('ApixAction', () => {

    let baseUrl = 'http://apix.app.com/api/v1/resource';

    it('can be initialised using the default constructor', () => {

        let apixAction = new ApixAction(baseUrl, {});

        expect(apixAction).to.be.an('object');

        expect(apixAction.base_url).to.equal(baseUrl);

    });

    it('can be iniialised with a search concern and append term to base url', () => {

        let apixAction = new ApixAction(baseUrl, {
            search: 'term'
        });

        expect(apixAction.base_url).to.equal(`${baseUrl}?search=term`);

    });


    it('can be iniialised with a pagination concern and append page to the base url', () => {

        let apixAction = new ApixAction(baseUrl, {
            page: 1
        });

        expect(apixAction.base_url).to.equal(`${baseUrl}?page=1`);

    });

    it('can be initialised with a parameters concern and append the parameters to the base url', () => {

        let apixAction = new ApixAction(baseUrl, {
            params: {
                uid: 1,
                role: 'admin' 
            }
        });

        expect(apixAction.base_url).to.equal(`${baseUrl}?uid=1&role=admin`);

    });

});