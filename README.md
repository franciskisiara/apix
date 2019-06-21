# API-X

Automatically load your VUEX store from your GET REST api routes

## Getting Started

Apix runs best on a web application powered by [Vue js](https://vuejs.org/) and [Vuex](https://vuex.vuejs.org/)

Internally, apix uses [axios](https://github.com/axios/axios) to send HTTP requests.

### Installing

Using npm

```
$ npm i @agog/apix
```

### Usage

You can then import and use the apix store generator in your files using the example below

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import Apix from '@agog/apix';

Vue.use(Vuex);

let apix = new Apix({
    prefix: '/api/v1',
    headers: {},
    resources: [
        { name: 'marvelHeroes', url: 'marvel-heroes' }
    ],
});

export const store = new Vuex.Store({

    state: {
        ...apix.getState(),
    },

    getters: {
        ...apix.getGetters(),
    },

    mutations: {
        ...apix.getMutations(),
    },

    actions: {
        ...apix.getActions(),
    },
});
```

### Configurations
The apix object constructor accepts an object as a parameter that must contain the ***resources*** array of objects, an optional ***prefix*** for 
versioning and optional ***headers*** that will be passed to axios internally

## Running the tests

In order to run the tests run the following command in the root of the application

```
npm test
```

## Built With

* [NodeJs](https://nodejs.org/en/) - The framework used
* [npm](https://www.npmjs.com/) - Dependency management

## Authors

**Kisiara Francis** 
    - [Github](https://github.com/franciskisiara)
    - [Website](https://profiles.agog.co.ke/kisiara)
    - [LinkedIn](https://www.linkedin.com/in/francis-kisiara-289360ab/)
