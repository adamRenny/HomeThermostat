import config from '../../config';

/**
 * App Plugin
 * Used to add routes and helper functionality for assets
 * @see https://github.com/hapijs/hapi/commit/0eb9a62d4f34114846a72178a506f22f89d91663
 *
 * TODO: Utilize dependency injection for instance of AssetService
 * TODO: Integrate AssetService into View Defaults pipeline
 *
 * @class AssetsPlugin
 * @constructor
 * @param {Hapi.Server} server Server attached to
 * @param {object} options Registration options
 * @param {function} next Next function called when complete
 */
function register(server, options, next) {
    var connection = server.select(config.get('/connections/web/label'));

    server.route({
        method: 'GET',
        path: config.get('/urls/routes/assets'),
        handler: {
            directory: {
                path: config.get('/paths/app/assets')
            }
        }
    });

    return next();
}

register.attributes =  {
    /**
     * Runtime name of the plugin
     *
     * @for AssetsPlugin
     * @property name
     * @type {string}
     */
    name: 'assets'
};

export default register;
