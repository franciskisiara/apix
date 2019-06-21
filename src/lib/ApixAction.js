export default class ApixAction
{
    constructor (prefix, options)
    {
        this.prefix = prefix;

        this.search(options);

        this.params(options);

        this.paginated(options);

    }

    /*
     * Initiate a search concern - allowing search parameters to be attached to the endpoint
     */
    search ({search})
    {
        this.prefix = search ? `${this.prefix}?search=${search}` : this.prefix;
    }

    /*
     * Initiate a pagination concern - attach to the endpoint
     */
    params ({params})
    {
        if (params) 
        {
            let first_key = Object.keys(params)[0];
            let first_value = Object.values(params)[0];
        
            this.prefix = `${this.makeUrl()}${first_key}=${first_value}`;
    
            for (let param in params) 
            {
                if(param !== first_key)
                {
                    this.prefix = `${this.prefix}&${param}=${params[param]}`;
                }
            }
        }
    }

    /*
     * Initiate a pagination concern - attach to the endpoint
     */
    paginated ({page})
    {
        this.prefix = page ? `${this.prefix}?page=${page}` : this.prefix;
    }

    /*
     * Adds the ? to the query string if the parameter is the first value passed
     */
    makeUrl()
    {
        return this.prefix.indexOf('?') > -1 ? `${this.prefix}&` : `${this.prefix}?`;
    }

    /*
     * Moulds the route given an options object
     */
    getUrl()
    {
        return this.prefix;
    }

}