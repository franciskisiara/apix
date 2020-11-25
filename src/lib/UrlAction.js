export default class Apix {
  /*
   * Accepts an option to determine the best course of action
   */
  constructor (baseUrl, options) {
    this.url = baseUrl
    this.setUrl(options)
  }

  /*
   * Moulds the route given an options object
   */
  setUrl (options) {
    if (options.hasOwnProperty('items')) {
      this.redis(options.items)
    }

    if (options.hasOwnProperty('page')) {
      this.paginated(options.page)
    }

    if (options.hasOwnProperty('search')) {
      this.search(options.search)
    }

    if (options.hasOwnProperty('params')) {
      this.params(options.params)
    }

    if (options.hasOwnProperty('routes')) {
      this.routes(options.routes)
    }
  }

  /*
   * Retrieves the route
   */
  getUrl () {
    return this.url
  }

  /**
   * This looks at a url and determines if there is cause to search
   * @deprecated
   */
  search (term) {
    if (term) {
      this.url = this.url.includes('?') 
        ? `${this.url}&search=${term}`
        : `${this.url}?search=${term}`
    }
  }

  /**
   * This looks at a url and determines if there is cause to paginate given the user request
   * @deprecated
   */
  paginated (page) {
    if (page) {
      this.url = this.url.includes('?') 
        ? `${this.url}&page=${page}`
        : `${this.url}?page=${page}`
    }
  }

  /*
   * This looks at a url and determines if there is cause to add parameters
   */
  params (params) {
    let first_key = _.keys(params)[0];
    let first_value = _.values(params)[0];
    this.url = this.makeUrl(first_key, first_value)
    _.each(params, (parameter, key) => {
      if (key !== first_key) {
        if (Array.isArray(parameter)) {
          parameter.forEach(param => {
            this.url = `${this.url}&${key}[]=${param}`
          })
        } else {
          this.url = `${this.url}&${key}=${parameter}`
        }
      }
    })
  }

  routes (routes) {
    for (let route in routes) {
      if (this.url.includes(`:${route}`)) {
        this.url = this.url.replace(`:${route}`, routes[route])
      }
    }
  }

  makeUrl (key, value) {
    let base = this.url.indexOf('?') > -1 ? `${this.url}&` : `${this.url}?`
    if (Array.isArray(value)) {
      value.forEach(item => {
        base = `${base}&${key}[]=${item}`;
      })
    } else {
      base = base + `${key}=${value}`;
    }
    return base;
  }
}