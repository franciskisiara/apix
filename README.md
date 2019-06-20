# API-X

Automatically load your VUEX store from your REST api routes

## Getting Started

In order to get started with apix, you will need a web application running on [Vue js](https://vuejs.org/) utilising [Vuex](https://vuex.vuejs.org/) for state management
and a backend service providing resources via rest endpoints.

Apix uses [axios](https://github.com/axios/axios) to send calls to the defined endpoints and so the client has been added as a dependency

### Installing

Install apix locally in your project by running

```
npm i @agog/apix
```

### Usage

You can then import the apix store generator in your files by using

```
import Apix from '@agog/apix';
```

Initialise the apix object by calling the constructor and passing an object as an arguments with the necessary configurations

```javascript
let apix = new Apix({
    base_url: 'http://earths-heroes/api/v1',
    resources: [
        { name: 'marvelHeroes', endpoint: 'marvel-heroes' }
    ],
})
```

### Configurations
The apix object accepts an object as a parameter with the following properties:-

<code>**base_url**</code>
Your application's url including versioning and paths specifying its an api

e.g. <code>http://earths-heroes/api/v1</code>

<code>**resources**</code>
An array that contains the resources objects with the name and endpoints defined

```json
{ 
    "name": "marvelHeroes", 
    "endpoint": "marvel-heroes" 
}
```

The endpoint of a particular resource will be appended to the base_url

### Integrating with Vuex

The generated methods and properties can then be spread into an applications Vuex store by using the spread operator and calling the respective api 
on the apix object.

The entire store.js file will then be 

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import Apix from '@agog/apix';

Vue.use(Vuex);

let apix = new Apix({
    base_url: 'http://earths-heroes/api/v1',
    resources: [
        { name: 'marvelHeroes', endpoint: 'marvel-heroes' }
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
