import path from 'path';
import assert from 'assert';
import config from '../../config';

/**
 * Helper service to provide external-to-module support for assets
 *  Assets includes:
 *    - Scripts
 *    - Styles
 *    - Media
 *
 * @class AssetService
 */
export default class AssetService {

    /**
     * Assists in building a URI for an asset
     * Provided URIs are relative to the web page root
     *
     * Assets are not verified before usage
     *
     * @for AssetService
     * @method buildURI
     * @param {string} assetPath Subpath for the asset requested
     * @return {string}
     */
    buildURI(assetPath) {
        assert.equal(typeof assetPath, 'string', 'Expected path provided to be a string, but received a ' + typeof assetPath);

        return path.join(config.get('/urls/uri/assets'), assetPath);
    }
};