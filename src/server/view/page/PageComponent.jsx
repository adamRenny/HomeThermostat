import React from 'react';

import assetService from '../../module/assets/service';

/**
 * Server-level React Component
 * Standard page layout structure
 *
 * Used to set up the markup
 *
 * @see Page
 *
 * @class PageComponent
 * @extends React.Component
 */
export default class PageComponent extends React.Component {
    /**
     * Render method to generate the page layout
     * Expects children
     *
     * @for PageComponent
     * @method render
     */
    render() {
        return (
            <html lang="en">
                {/* Page head */}
                <head>
                    {/* Charset */}
                    <meta charSet="utf-8" />

                    <title>APKM Thermostat</title>

                    {/* Robots metadata */}
                    <meta name="robots" content="index,follow" />

                    {/* Favicon */}
                    <link rel="icon" href={ assetService.buildURI('media/favicon/favicon.ico') }
                          sizes="16x16 32x32 48x48 64x64"
                          type="image/vnd.microsoft.icon" />

                    {/* Mobile Viewport Properties */}
                    <meta name="viewport"
                          content="width=device-width, user-scalable=no" />

                    {/* Styles Properties */}
                    <link href={ assetService.buildURI('/style/screen.css') }
                          rel="stylesheet"
                          media="screen" />
                </head>
                {/* End Page head */}

                { this.props.children }
            </html>
        );
    }
};