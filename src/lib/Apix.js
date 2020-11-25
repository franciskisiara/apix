import axios from 'axios'

import UrlAction from './UrlAction'

export default class Apix {
  constructor () {
    this.state = {}
    this.actions = {}
    this.getters = {}
    this.mutations = {}
    this.setState()
    this.setActions()
    this.setGetters()
    this.setMutations()
  }

    /*
     * Set the state variables
     */
    setState()
    {
        this.resources.forEach( ({name}) => {

            this.state[name] = []

        })
    }

    /*
     * Return the state variables
     */
    getState()
    {
        return this.state
    }

    /*
     * Set the getters
     */
    setGetters()
    {
        this.resources.forEach( ({name}) => {

            let functionName = 'get' + helpers.upper(name)

            this.getters[functionName] = function (state) {

                return state[name]

            }.bind(this)

        })
    }

    /*
     * Get the getters
     */
    getGetters()
    {
        return this.getters
    }

    /*
     * Set the actions
     */
    setActions()
    {
        this.resources.forEach( ({name, url}) => {

            let endpoint = `${this.prefix}/${url.replace(/^\/+/g, '')}`

            let functionName = 'set' + helpers.upper(name)

            this.actions[functionName] = function(context, options = {}){

                let actionUrl = new ApixAction(endpoint, options).getUrl()

                axios.get(actionUrl, this.params).then(({data}) => {

                    context.commit(functionName, data)

                })
            }.bind(this)

        })
    }

    /*
     * Get actions
     */
    getActions()
    {
        return this.actions
    }

    /*
     * Set Mutations
     */
    setMutations()
    {
        this.resources.forEach( ({name}) => {

            let functionName = 'set' + helpers.upper(name)

            this.mutations[functionName] = (state, value) => {

                state[name] = value

            }

        })
    }

    /*
     * Get mutations
     */
    getMutations()
    {
        return this.mutations
    }
}

module.exports = Apix

// Allow use of default import syntax in TypeScript
module.exports.default = Apix