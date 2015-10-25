import config from '../../../config';

/**
 * App Plugin
 * Used to add routes for About page
 *
 * TODO: Refactor appropriately when a better schema is discovered
 *
 * @class AboutContentPlugin
 * @constructor
 * @param {Hapi.Server} server Server attached to
 * @param {object} options Registration options
 * @param {function} next Next function called when complete
 */
function register(server, options, next) {
    var connection = server.select(config.get('/connections/web/label'));

    connection.route({
        path: '/',
        method: 'GET',
        handler: (request, reply) => {
            var content = reply.view(
                'TempRoute'
            );
            return content;
        }
    });

    return next();
}

register.attributes =  {
    /**
     * Runtime name of the plugin
     *
     * @for AboutContentPlugin
     * @property name
     * @type {string}
     */
    name: 'content-temp',

    /**
     * Properties required before using the plugin
     *
     * @for AboutContentPlugin
     * @property dependencies
     * @type {string|string[]}
     */
    dependencies: 'react-renderer'
};

export default register;
