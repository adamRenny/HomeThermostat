import Confidence from 'confidence';
import config from './config';


/**
 * Criteria for which version of the manifest to provide
 * Supported values: production, staging, development, test
 *
 * @see Confidence <https://github.com/hapijs/confidence>
 */
const CRITERIA = {
    ENVIRONMENT: process.env.NODE_ENV
};

/**
 * Confidence based configuration
 * Used to define Hapi components passed into the server at startup
 * Organized for the Glue module
 * 
 * @see Glue <https://github.com/hapijs/glue>
 *
 * @class manifest
 * @static
 * @final
 */
const MANIFEST = {
    /**
     * Confidence level meta information
     *
     * @for manifest
     * @private
     * @property $meta
     * @type {string}
     * @static
     * @final
     */
    $meta: 'Defines the settings of the web server',

    /**
     * Server-level configurations
     * Used to define the server at startup with any settings
     *
     * @for manifest
     * @private
     * @property server
     * @type {object}
     * @static
     * @final
     */
    server: {
        /**
         * Confidence filter for the server configuration
         *
         * @for manifest
         * @private
         * @property $filter
         * @type {string}
         * @static
         * @final
         */
        $filter: 'ENVIRONMENT',

        /**
         * Filtered settings
         * Used during development NODE_ENV
         *
         * @for manifest
         * @private
         * @property development
         * @type {object}
         * @static
         * @final
         */
        development: {},

        /**
         * Confidence default for the server configuration
         * Used for all settings except those listed above
         *
         * @for manifest
         * @private
         * @property $default
         * @type {object}
         * @static
         * @final
         */
        $default: {
            /**
             * Hapi server configuration
             * Used for configuring when the server debugs information for the runtime
             *
             * @for manifest
             * @private
             * @property debug
             * @type {object}
             * @static
             * @final
             */
            debug: {
                /**
                 * Hapi server configuration
                 * Setting for what kinds of events the server should log during runtime
                 *
                 * @for manifest
                 * @private
                 * @property log
                 * @type {string[]}
                 * @static
                 * @final
                 */
                log: ['error'],

                /**
                 * Hapi server configuration
                 * Setting for what kinds of events the server should log during a request
                 *
                 * @for manifest
                 * @private
                 * @property log
                 * @type {string[]}
                 * @static
                 * @final
                 */
                request: ['error']
            }
        }
    },

    /**
     * Individual connections settings
     * Includes definition for each of the connections
     *
     * @for manifest
     * @private
     * @property connections
     * @type {object}
     * @static
     * @final
     */
    connections: [
        // Web Connection
        {
            /**
             * Web connection
             * IP address for which the connection to be attached
             *
             * @for manifest
             * @private
             * @property address
             * @type {string}
             * @static
             * @final
             */
            address: config.get('/connections/web/ipAddress'),

            /**
             * Web connection
             * Port for the connection to be attached to
             *
             * @for manifest
             * @private
             * @property port
             * @type {number}
             * @static
             * @final
             */
            port: config.get('/connections/web/port'),

            /**
             * Web connection
             * Collection of labels to identify the connection by
             * Used for inspection
             *
             * @for manifest
             * @private
             * @property labels
             * @type {string[]}
             * @static
             * @final
             */
            labels: [
                config.get('/connections/web/label')
            ]
        }
    ],

    /**
     * Plugins for the server
     * Plugins are organized by filepath-object or array with objects
     *
     * @for manifest
     * @private
     * @property plugins
     * @type {object|object[]}
     * @static
     * @final
     */
    plugins: {
        /**
         * Plugin module
         * Asset module to add pathing for assets
         *
         * @for manifest
         * @private
         * @property ./module/assets/main
         * @type {object}
         * @static
         * @final
         */
        './module/assets/main': null,

        /**
         * Plugin module
         * Rendering module for React rendering
         *
         * @for manifest
         * @private
         * @property ./module/renderer/main
         * @type {object}
         * @static
         * @final
         */
        './module/renderer/main': null,

        /**
         * Plugin module
         * About section of the project
         * Likely overengineered and candidate for refactor
         *
         * @for manifest
         * @private
         * @property ./module/content/about/main
         * @type {object}
         * @static
         * @final
         */
        './module/content/thermo/main': null
    }
};


var store = new Confidence.Store(MANIFEST);

/**
 * Getter to gather a value from the manifest
 * Broker to the manifest
 *
 * @for manifest
 * @method get
 * @param {string} key Key to access against
 */
function get(key) {
    return store.get(key, CRITERIA);
}

/**
 * Getter to gather neta data from the manifest
 * Broker to the manifest
 * Confidence Specific data
 *
 * @for manifest
 * @method meta
 * @param {string} key Key to access against
 */
function meta(key) {
    return store.meta(key, CRITERIA);
}

export default {
    get,
    meta
};