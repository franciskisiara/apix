import { errors } from '../library'; 

const expect = require('chai').expect

import ApixGenerator from '../lib/ApixGenerator';

describe('ApixGenerator', () => {

    let configs = {
        prefix: '/api/v1/',
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

        it ('should throw an error if configuration does not have a resources oject', () => {

            expect(() => new ApixGenerator({})).to.throw(errors.RESOURCES_NOT_FOUND);
    
        });

    });

    it ('can be initialised using the default constructor', () => {

        expect(generator.prefix).to.equal('/api/v1/');

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