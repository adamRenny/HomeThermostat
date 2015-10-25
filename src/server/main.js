/**
 * Server component used to run the server side of the application
 *
 * @module Server
 */

import config from './config';
import bootstrap from './bootstrap';
import Promise from 'bluebird';

/**
 * OS level signals used to mark as a teardown
 * Provided from Openshift
 *
 * Likely limited to *nix, untested for Windows
 *
 * @for Server
 * @private
 * @property TEARDOWN_SIGNALS
 * @static
 * @final
 */
const TEARDOWN_SIGNALS = [
    'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
    'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
];

/**
 * Signal -> termination handler
 *
 * Kills the process after completion
 *
 * @for Server
 * @private
 * @method onReceivedKillSignal
 * @param {string} signal Signal received
 */
function onReceivedKillSignal(signal) {
    console.log('Received %s - terminating node server ...', signal);
    process.exit(1);
}

/**
 * Final termination handler
 *
 * @for Server
 * @private
 * @method processHasStopped
 */
function processHasStopped() {
    console.log('Node server stopped.');
}

// Setup all process failure events
process.on('exit', processHasStopped);
TEARDOWN_SIGNALS.forEach((signal) => process.on(
    signal,
    () => onReceivedKillSignal(signal)
));

// Initialize the server
bootstrap()
    .then(
        ({error, server}) => {
            if (error) {
                console.log('Could not start server');
                Promise.reject(error);
            }

            return new Promise((resolve) => {
                server.start(resolve);
            });
        }
    )
    .then(
        () => {
            console.log('Node server started on %s:%d ...', config.get('/connections/web/ipAddress'), config.get('/connections/web/port'));
        },
        (error) => {
            console.error(error);
        }
    );

// bootstrap(
//     (error, server) => {
//         if (error) {
//             console.log('Could not start server');
//             console.error(error);
//         }

//         server.start(() => {
//             console.log('Node server started on %s:%d ...', config.get('/connections/web/ipAddress'), config.get('/connections/web/port'));
//         });
//     }
// );