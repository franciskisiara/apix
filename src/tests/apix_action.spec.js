const expect = require('chai').expect

import ApixAction from '../lib/ApixAction';

describe('ApixAction', () => {

    let prefix = '/api/v1/';

    it('can be initialised using the default constructor', () => {

        let apixAction = new ApixAction(prefix, {});

        expect(apixAction).to.be.an('object');

        expect(apixAction.prefix).to.equal(prefix);

    });

    it('can be initialised with a search concern and append term to base url', () => {

        let apixAction = new ApixAction(prefix, {
            search: 'term'
        });

        expect(apixAction.prefix).to.equal(`${prefix}?search=term`);

    });


    it('can be initialised with a pagination concern and append page to the base url', () => {

        let apixAction = new ApixAction(prefix, {
            page: 1
        });

        expect(apixAction.prefix).to.equal(`${prefix}?page=1`);

    });

    it('can be initialised with a parameters concern and append the parameters to the base url', () => {

        let apixAction = new ApixAction(prefix, {
            params: {
                uid: 1,
                role: 'admin' 
            }
        });

        expect(apixAction.prefix).to.equal(`${prefix}?uid=1&role=admin`);

    });

});