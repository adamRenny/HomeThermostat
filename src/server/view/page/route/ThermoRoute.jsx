import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PageComponent from '../PageComponent';
import ThermoContent from '../../shared/ThermoContent';

/**
 * Server-level React Component
 * Thermo Route
 *
 * State-less React component
 *
 * @class ThermoRoute
 * @extends React.Component
 * @constructor
 * @param {object} options
 * @param {Page} [options.page] Page to render with
 */
export default class ThermoRoute extends React.Component {

    buildWebContent() {
        return ReactDOMServer.renderToStaticMarkup(
            <ThermoContent />
        );
    }

    render() {
        return (
            <PageComponent>
                <body dangerouslySetInnerHTML={ { __html: this.buildWebContent() } } />
            </PageComponent>
        );
    }
};