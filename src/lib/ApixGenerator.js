import axios from 'axios';

import { validate, helpers } from '../library';
import ApixAction from './ApixAction';

export default class ApixGenerator
{
    constructor(config)
    {
        validate(config);

        this.base_url = config.base_url;

        this.resources = config.resources;

        this.state = {};

        this.actions = {};

        this.getters = {};

        this.mutations = {};

        this.setState();

        this.setActions();

        this.setGetters();

        this.setMutations();
    }

    /*
     * Set the state variables
     */
    setState()
    {
        this.resources.forEach( ({name}) => {

            this.state[name] = [];

        });
    }

    /*
     * Return the state variables
     */
    getState()
    {
        return this.state;
    }

    /*
     * Set the getters
     */
    setGetters()
    {
        this.resources.forEach( ({name}) => {

            let functionName = 'get' + helpers.upper(name);

            this.getters[functionName] = function (state) {

                return state[name];

            }.bind(this);

        });
    }

    /*
     * Get the getters
     */
    getGetters()
    {
        return this.getters;
    }

    /*
     * Set the actions
     */
    setActions()
    {
        this.resources.forEach( ({name, url}) => {

            let endpoint = `${this.base_url}/${url.replace(/^\/+/g, '')}`;

            let functionName = 'set' + helpers.upper(name);

            this.actions[functionName] = function(context, options = {}){

                let actionUrl = new ApixAction(endpoint, options).getUrl();

                axios.get(actionUrl).then(({data}) => {

                    context.commit(functionName, data);

                });
            };

        });
    }

    /*
     * Get actions
     */
    getActions()
    {
        return this.actions;
    }

    /*
     * Set Mutations
     */
    setMutations()
    {
        this.resources.forEach( ({name}) => {

            let functionName = 'set' + helpers.upper(name);

            this.mutations[functionName] = (state, value) => {

                state[name] = value;

            };

        })
    }

    /*
     * Get mutations
     */
    getMutations()
    {
        return this.mutations;
    }
}