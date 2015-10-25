import statusCodeService from './statusCodeService';

import config from '../../config';

/**
 * Core Plugin
 * Used to add error routes
 * Has routes for general errors, internal errors, and not found errors
 *
 * Used only on the web connection
 *
 * @class ErrorHandlerPlugin
 * @constructor
 * @param {Hapi.Server} server Server attached to
 * @param {object} options Registration options
 * @param {function} next Next function called when complete
 */
function register(server, options, next) {
    var connection = server.select(config.get('/connections/web/label'));

    // Use the post handler to handle status codes in the event that a route failed
    connection.ext(
        'onPostHandler',
        (request, reply) => {
            let statusCode = statusCodeService.extractStatusCode(request.response);

            if (!statusCodeService.isErroneous(statusCode)) {
                return reply['continue']();
            }

            let errorRoutePath = 'error/ErrorRoute';

            if (statusCodeService.isInternalError(statusCode)) {
                errorRoutePath = 'error/InternalErrorRoute';
            } else if (statusCodeService.isNotFound(statusCode)) {
                errorRoutePath = 'error/NotFoundRoute';
            }

            return reply.view(
                    errorRoutePath
                )
                .code(statusCode);
        }
    );

    return next();
}

register.attributes =  {
    /**
     * Runtime name of the plugin
     *
     * @for ErrorHandlerPlugin
     * @property name
     * @type {string}
     */
    name: 'error'
};

export default register;
