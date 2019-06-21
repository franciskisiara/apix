export const errors = {
    NO_CONF: 'No configurations found',
    INVALID_CONF: 'Invalid Api-X configuration',
    RESOURCES_NOT_FOUND: 'The resources array was not found',
};

export const validate = config => {

    if (!config) throw errors.NO_CONF;

    if (typeof config !== 'object') throw errors.INVALID_CONF;

    if (!config.hasOwnProperty('resources')) throw errors.RESOURCES_NOT_FOUND;

};

export const helpers = {
    /*
     * Make the first letter uppercase
     */
    upper: string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

};
