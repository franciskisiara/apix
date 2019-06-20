export default class ApixAction
{
    constructor (baseUrl, options)
    {
        this.base_url = baseUrl;

        this.search(options);

        this.params(options);

        this.paginated(options);

    }

    /*
     * Initiate a search concern - allowing search parameters to be attached to the endpoint
     */
    search ({search})
    {
        this.base_url = search ? `${this.base_url}?search=${search}` : this.base_url;
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
        
            this.base_url = this.makeUrl() + `${first_key}=${first_value}`;
    
            for (let param in params) 
            {
                if(param !== first_key)
                {
                    this.base_url = `${this.base_url}&${param}=${params[param]}`;
                }
            }
        }
    }

    /*
     * Initiate a pagination concern - attach to the endpoint
     */
    paginated ({page})
    {
        this.base_url = page ? `${this.base_url}?page=${page}` : this.base_url;
    }

    /*
     * Adds the ? to the query string if the parameter is the first value passed
     */
    makeUrl()
    {
        return this.base_url.indexOf('?') > -1 ? `${this.base_url}&` : `${this.base_url}?`;
    }
}