/**
 * HTTP status code groups
 *
 * Follows code grouping seen below
 * @see http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
 *
 * @for ResponseStatusCodeService
 * @private
 * @property CODE_GROUPS
 * @type {object}
 * @static
 * @final
 */
const CODE_GROUPS = {
    NOT_FOUND: 400,
    INTERNAL_ERROR: 500
};

/**
 * Helper service to inspect HTTP status codes
 * Used to assist in inspecting a server response's information
 *
 * @class ResponseStatusCodeService
 */
export default class ResponseStatusCodeService {
    /**
     * Extracts the status code out of a Hapi response
     *
     * @for ResponseStatusCodeService
     * @method extractStatusCode
     * @param {Error|Hapi.Response} response Response object to inspect
     * @return {number}
     */
    extractStatusCode(response) {
        if (response instanceof Error) {
            return response.output.statusCode;
        }

        return response.statusCode;
    }

    /**
     * Determines if a status code is erroneous
     *
     * @for ResponseStatusCodeService
     * @method isErroneous
     * @param {number} statusCode
     * @return {boolean}
     */
    isErroneous(statusCode) {
        return this.isNotFound(statusCode) || this.isInternalError(statusCode);
    }

    /**
     * Determines if a status code is considered a not-found status code
     *
     * @for ResponseStatusCodeService
     * @method isNotFound
     * @param {number} statusCode
     * @return {boolean}
     */
    isNotFound(statusCode) {
        return Math.floor(statusCode / CODE_GROUPS.NOT_FOUND) >= 1;
    }

    /**
     * Determines if a status code is considered an internal error
     *
     * @for ResponseStatusCodeService
     * @method isInternalError
     * @param {number} statusCode
     * @return {boolean}
     */
    isInternalError(statusCode) {
        return Math.floor(statusCode / CODE_GROUPS.INTERNAL_ERROR) >= 1;
    }
};
