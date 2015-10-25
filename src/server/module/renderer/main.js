import config from '../../config';
import rendererFactory from './renderer';

/**
 * Core Plugin
 * Custom React Renderer setup
 * Hooks into the root of the server to avoid isolated plugin access
 *
 * Used only on the web connection
 *
 * @class ReactRendererPlugin
 * @constructor
 * @param {Hapi.Server} server Server attached to
 * @param {object} options Registration options
 * @param {function} next Next function called when complete
 */
function register(server, options, next) {
    
    // Use the server root to expose the renderer outside of the plugin
    // Other plugins can't render against engine without using the root
    // @see https://github.com/hapijs/hapi/issues/2278
    server.root.views({
        // Setup
        engines: {
            js: rendererFactory(config.get('/paths/renderer/views'))
        },
        context: {
            baseUrl: config.get('/urls/uri/base')
        },

        // Paths
        path: config.get('/paths/renderer/routes'),

        isCached: config.get('/isProduction')
    });
    
    return next();
}

register.attributes = {
    /**
     * Runtime name of the plugin
     *
     * @for ReactRendererPlugin
     * @property name
     * @type {string}
     */
    name: 'react-renderer'
};

export default register;
