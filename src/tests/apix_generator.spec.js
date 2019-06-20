import { errors } from '../library'; 

const expect = require('chai').expect
// const sinon = require('sinon');

import ApixGenerator from '../lib/ApixGenerator';

describe('ApixGenerator', () => {

    let configs = {
        base_url: 'http://apix.app.com/api/v1/',
        resources: [
            { name: 'users', url: 'users' }
        ]
    };

    let generator =  new ApixGenerator(configs);

    describe('ApixGeneratorValidation', () => {

        it ('should throw an error if there is no configuration passed', () => {

            expect(() => new ApixGenerator).to.throw(errors.NO_CONF);
    
        });
    
        it ('should throw an error if configuration is not an object', () => {
    
            expect(() => new ApixGenerator('conf')).to.throw(errors.INVALID_CONF);
    
        });
    
        it ('should throw an error if configuration does not have a base url', () => {

            expect(() => new ApixGenerator({
                resources: []
            })).to.throw(errors.BASE_URL_NOT_FOUND);
    
        });

        it ('should throw an error if configuration does not have a resources', () => {

            expect(() => new ApixGenerator({
                base_url: ''
            })).to.throw(errors.RESOURCES_NOT_FOUND);
    
        });

    });

    it ('can be initialised using the default constructor', () => {

        expect(generator.base_url).to.equal('http://apix.app.com/api/v1/');

        expect(generator.resources).to.be.an('array');

    });

    it ('should have passed resources as state properties', () => {

        expect(generator.state).to.have.property('users');

    });

    it ('should have accessors, mutators and actions for configured resources', () => {

        expect(generator.getters).to.have.property('getUsers');

        expect(generator.mutations).to.have.property('setUsers');

        expect(generator.actions).to.have.property('setUsers');

    });

});