export default class Apix {
  constructor (prefix, options) {
    this.prefix = prefix
    this.search(options)
    this.paginated(options)
    this.params(options)
  }

  /*
   * Initiate a search concern - allowing search parameters to be attached to the endpoint
   */
  search ({search}) {
    this.prefix = search ? `${this.prefix}?search=${search}` : this.prefix
  }

  /*
   * Initiate a params concern - attach to the endpoint
   */
  params ({params}) {
        if (params) 
        {
            let first_key = Object.keys(params)[0]
            let first_value = Object.values(params)[0]

            if (!Array.isArray(first_value)) {
                this.prefix = `${this.makeUrl()}${first_key}=${first_value}`
            } else {
                for (let index = 0 index < first_value.length index++) {
                    const urller = index == 0 ? `${this.makeUrl()}` : `${this.prefix}&`
                    this.prefix = `${urller}${first_key}=${first_value[index]}`
                }
            }
        
            for (let param in params) 
            {
                if(param !== first_key)
                {
                    let value = params[param]

                    if (!Array.isArray(value)) {
                        this.prefix = `${this.prefix}&${param}=${value}`
                    } else {
                        for (let index = 0 index < value.length index++) {
                            this.prefix = `${this.prefix}&${param}=${value[index]}`
                        }
                    }
                }
            }
        }
    }

    /*
     * Initiate a pagination concern - attach to the endpoint
     */
    paginated ({page})
    {
        this.prefix = page ? `${this.prefix}?page=${page}` : this.prefix
    }

    /*
     * Adds the ? to the query string if the parameter is the first value passed
     */
    makeUrl()
    {
        return this.prefix.indexOf('?') > -1 ? `${this.prefix}&` : `${this.prefix}?`
    }

    /*
     * Moulds the route given an options object
     */
    getUrl()
    {
        return this.prefix
    }

}