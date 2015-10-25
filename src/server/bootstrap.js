/**
 * Bootstrapper component to begin setup and configuration of the server
 *
 * @class bootstrap
 */

import Glue from 'glue';
import manifest from './manifest';
import Promise from 'bluebird';

/**
 * Glue composition options
 *
 * @for bootstrap
 * @private
 * @property composeOptions
 * @static
 * @final
 */
var composeOptions = {
    relativeTo: __dirname
};


module.exports = () => new Promise(
    (resolve) => Glue.compose(
        // Configuration
        manifest.get('/'),
        // Composition Options
        composeOptions,
        // Promisification
        (err, server) => resolve({
            err,
            server
        })
    )
);

// module.exports = callback => Glue.compose(
//     // Configuration
//     manifest.get('/'),
//     // Composition Options
//     composeOptions,
//     // Promisification
//     callback
// );