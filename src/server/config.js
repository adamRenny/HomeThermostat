import Confidence from 'confidence';
import path from 'path';


/**
 * Criteria for which version of the CONFIG to provide
 *
 * @see Confidence <https://github.com/hapijs/confidence>
 */
const CRITERIA = {
    ENVIRONMENT: process.env.NODE_ENV
};

// Filepaths
/**
 * Project root path
 * Relative
 *
 * @for config
 * @private
 * @property ROOT
 * @type {string}
 * @static
 * @final
 */
const ROOT = path.join(__dirname, '..', '..');

/**
 * Project source root path
 * Location where code originates from when compiled
 * Relative
 *
 * @for config
 * @private
 * @property SRC
 * @type {string}
 * @static
 * @final
 */
const SRC = path.join(ROOT, 'src');

/**
 * Project destination root path
 * Location where code is written to when compiled
 * Relative
 *
 * @for config
 * @private
 * @property DEST
 * @type {string}
 * @static
 * @final
 */
const DEST = path.join(ROOT, 'dest');

/**
 * Project destination browser/client-side root path
 * Location where code is written to when compiled
 * Relative
 *
 * @for config
 * @private
 * @property CLIENT
 * @type {string}
 * @static
 * @final
 */
const CLIENT = path.join(DEST, 'client');

/**
 * Project destination server-side root path
 * Location where code is written to when compiled
 * Relative
 *
 * @for config
 * @private
 * @property APP
 * @type {string}
 * @static
 * @final
 */
const APP = path.join(DEST, 'server');

/**
 * Project destination server-side view path
 * Location where the compiled views/templates are
 * Relative
 *
 * @for config
 * @private
 * @property VIEW
 * @type {string}
 * @static
 * @final
 */
const VIEW = path.join(APP, 'view');

/**
 * Confidence based configuration
 * Used to define the configuration for the server-side of the application
 * Drives the bootstrap and runtime of the server-side
 * Supported values: production, staging, development, test
 *
 * @class config
 * @static
 * @final
 */
const CONFIG = {
    /**
     * Confidence level meta information
     *
     * @for config
     * @private
     * @property $meta
     * @type {string}
     * @static
     * @final
     */
    $meta: 'This configures the application runtime.',

    /**
     * Website name
     * Unused
     *
     * @deprecated
     * @for config
     * @private
     * @property projectName
     * @type {string}
     * @static
     * @final
     */
    projectName: 'adamRenny Personal Website',

    /**
     * Group of connection data for each Hapi server connection
     *
     * @for config
     * @private
     * @property connections
     * @type {object}
     * @static
     * @final
     */
    connections: {

        /**
         * Basic web connection, with an HTML based FE
         *
         * @for config
         * @private
         * @property web
         * @type {object}
         * @static
         * @final
         */
        web: {
            /**
             * Primary label ID to identify via Hapi search
             *
             * @for config
             * @private
             * @property label
             * @type {string}
             * @static
             * @final
             */
            label: 'web',

            /**
             * IP Address to connect to the server from
             * Utilized openshift IP first
             *
             * @for config
             * @private
             * @property label
             * @type {string}
             * @static
             * @final
             */
            ipAddress: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',

            /**
             * Port the web is connected from
             *
             * @for config
             * @private
             * @property port
             * @type {number}
             * @static
             * @final
             */
            port: parseInt(process.env.OPENSHIFT_NODEJS_PORT, 10) || 3000
        }
    },
    
    /**
     * Flag for whether the system is in active development or not
     *
     * @for config
     * @private
     * @property isProduction
     * @type {boolean}
     * @static
     * @final
     */
    isProduction: CRITERIA.ENVIRONMENT !== 'development',

    /**
     * Collection of the paths to configure the server with
     *
     * @for config
     * @private
     * @property paths
     * @type {object}
     * @static
     * @final
     */
    paths: {
        /**
         * Project root path
         *
         * @for config
         * @private
         * @property root
         * @type {string}
         * @static
         * @final
         */
        root: ROOT,

        /**
         * Project root path
         *
         * @for config
         * @private
         * @property app
         * @type {object}
         * @static
         * @final
         */
        app: {

            /**
             * Project root path
             *
             * @for config
             * @private
             * @property root
             * @type {string}
             * @static
             * @final
             */
            root: APP,
            /**
             * Project destination server-side root path
             * Location where code is written to when compiled
             *
             * @for config
             * @private
             * @property routes
             * type {string}
             * @static
             */
            routes: path.join(APP, 'route'),

            /**
             * Project destination server-side where the assets are located relative to the root path
             * Location where code is rewritten
             *
             * @for config
             * @private
             * @property assets
             * type {string}
             * @static
             */
            assets: CLIENT
        },

        /**
         * Renderer-layer paths
         *
         * @for config
         * @private
         * @property renderer
         * @type {object}
         * @static
         * @final
         */
        renderer: {
            /**
             * Project destination where views are served up from
             *
             * @for config
             * @private
             * @property views
             * type {string}
             * @static
             */
            views: VIEW,

            /**
             * Routes path
             * Unused
             *
             * @deprecated
             * @for config
             * @private
             * @property routes
             * type {string}
             * @static
             */
            routes: path.join(VIEW, 'page', 'route')
        }
    },

    /**
     * Any project URLs
     *
     * @for config
     * @private
     * @property urls
     * @type {object}
     * @static
     * @final
     */
    urls: {
        /**
         * URL Routes used for server-level modules
         *
         * @for config
         * @private
         * @property routes
         * @type {object}
         * @static
         * @final
         */
        routes: {
            /**
             * Path for assets to accept, when a request is made
             * Follows organization for Hapi
             *
             * @for config
             * @private
             * @property assets
             * @type {object}
             * @static
             * @final
             */
            assets: '/assets/{param*}'
        },

        /**
         * URI route components for server-level modules
         * Used to building up URLs
         *
         * @for config
         * @private
         * @property uri
         * @type {object}
         * @static
         * @final
         */
        uri: {
            /**
             * URI Assets subcomponent path
             * Used for assets URL building
             *
             * @for config
             * @private
             * @property assets
             * @type {string}
             * @static
             * @final
             */
            assets: '/assets',

            /**
             * URI Base URI subcomponent path
             * Used for context of views
             *
             * @for config
             * @private
             * @property base
             * @type {string}
             * @static
             * @final
             */
            base: '/'
        }
    }
};


var store = new Confidence.Store(CONFIG);


/**
 * Getter to gather a value from the configuration
 * Broker to the configuration
 *
 * @for config
 * @method get
 * @param {string} key Key to access against
 */
function get(key) {
    return store.get(key, CRITERIA);
}

/**
 * Getter to gather meta data from the configuration
 * Broker to the configuration
 * Confidence Specific data
 *
 * @for config
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