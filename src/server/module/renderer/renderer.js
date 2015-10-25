/**
 * React Renderer
 * Custom renderer used to render on a Hapi Server
 *
 * Based off of React 0.14
 *
 * Based off of:
 * @see https://github.com/jedireza/hapi-react-views
 *
 * Includes a localized cache and attempts to unload the require cache
 * Assumes all JSX provided is pre-transpiled to raw JS
 *
 * @class ReactRenderer
 */

import Hoek from 'hoek';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

/**
 * Default settings for the renderer
 * Used to preset any defaults for properties not set
 *
 * @for ReactRenderer
 * @private
 * @property DEFAULTS
 * @type {object}
 * @static
 * @final
 */
const DEFAULTS = {
    doctype: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
    isCached: false
};

/**
 * Internal compile function
 * An individual compile function is called per primary route/view called
 * Cache for that view is created within the local cache
 * Called once at initial view request time
 *
 * @for ReactRenderer
 * @private
 * @method compile
 * @param {string} baseViewPath Path to the view object to render
 * @param {string} template Template file to use (unused)
 * @param {object} compileOptions Compile options passed in at configuration time
 * @return {function}
 */
function compile(baseViewPath, template, compileOptions) {
    compileOptions = Hoek.applyToDefaults(DEFAULTS, compileOptions);
    let localCache = {
        Component: null,
        Element: null,
        baseViewPath
    };

    return (context, renderOptions) => engineRuntime(localCache, compileOptions, context, renderOptions);
}

/**
 * Internal runtime function
 * Method to process the Component and Element
 * Processes the content into the transformed string
 *
 * @for ReactRenderer
 * @private
 * @method engineRuntime
 * @param {object} localCache Cache to store any content for the React system
 * @param {object} compileOptions options passed in at configuration time
 * @param {object} context View context to use within the views
 * @param {object} renderOptions Options passed in at render time 
 * @return {string}
 */
function engineRuntime(localCache, compileOptions, context, renderOptions) {
    renderOptions = Hoek.applyToDefaults(compileOptions, renderOptions);
    
    var dest = renderOptions.doctype;
    localCache.Component = localCache.Component || require(compileOptions.filename);
    localCache.Element = localCache.Element || React.createFactory(localCache.Component);
    dest = dest + ReactDOMServer[renderOptions.renderMethod](localCache.Element(context));

    // Clear the cache each time if its not cached
    if (!renderOptions.isCached) {
        localCache.Component = undefined;
        localCache.Element = undefined;

        Object.keys(require.cache)
            .filter((module) => module.indexOf(localCache.baseViewPath) === 0)
            .forEach((module) => delete require.cache[module]);
    }

    return dest;
}

/**
 * Supporting creation method used to associate a desired view path with the renderer to make it more configurable

 * Provides an compilation object
 *
 * TODO: Find a way to pass this content through Hapi.Server views
 *
 * @for ReactRenderer
 * @method factory
 * @param {string} viewPath Absolute path to the views
 * @return {object}
 */
function factory(viewPath) {
    if (typeof viewPath !== 'string') {
        viewPath = '.';
    }

    return {
        compile: (template, compileOptions) => compile(viewPath, template, compileOptions)
    };
}

export default factory;