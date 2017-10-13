import path         from 'path';
import * as fs      from 'fs';
import express      from 'express';
import serializeJs  from 'serialize-javascript';
import geoip        from 'geoip-lite';

import React                    from 'react';
import ReactDOM                 from 'react-dom/server';
import { Provider }             from 'react-redux';
import { RouterContext, match } from 'react-router';
import routes                       from '../shared/routes.jsx';
import configureStore               from '../shared/store/configureStore';
import i18n                         from '../shared/i18n';
import clientConfig                 from '../shared/config';
import { setUserCountryCode }       from '../shared/actions/userInfo.js';
import {
    fetchComponentsData,
    getAssetsPaths
} from './utils';

const cssContents = !clientConfig.staticUrl.match(/localhost/) ?
    fs.readFileSync(path.join(__dirname, '../public/static/build', 'main.css')) : '';

const app = express();

app.use('/static', express.static('public/static'));

app.use((req, res) => {
    const store = configureStore();
    const clientIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
    const geolocation = geoip.lookup(clientIp);

    match({ routes, location: req.url }, async (error, redirectLocation, renderProps) => {
        try {
            if (!renderProps) {
                return;
            }

            if (geolocation) {
                store.dispatch(setUserCountryCode(geolocation));
            }

            await fetchComponentsData({
                dispatch   : store.dispatch,
                components : renderProps.components,
                params     : renderProps.params,
                query      : renderProps.location.query,
                hash       : renderProps.location.hash,
                location   : renderProps.location
            });

            const initialState = store.getState();

            const componentHTML = ReactDOM.renderToString(
                <Provider store={store}>
                    <i18n.Provider i18n={{}}>
                        <RouterContext {...renderProps} />
                    </i18n.Provider>
                </Provider>
            );

            const html = renderHTML({
                componentHTML,
                initialState,
                config : clientConfig,
                req
            });

            res.setHeader('Content-Type', 'text/html');
            res.end(html);
        } catch (err) {
            console.log(err.stack);
            res.end(err.message);
        }
    });
});

function renderHTML({ componentHTML, initialState, config }) {
    return (
        `<!DOCTYPE html>
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
                <meta name="theme-color" content="#db5945">
                <title id="meta-title">Test app</title>
                ${config.staticUrl.match(/localhost/)
                    ? `<link rel="stylesheet" href="${config.staticUrl}/${getAssetsPaths().css}">`
                    : `<style type="text/css">${cssContents}</style>`}
            </head>
            <body style="height: 100vh;">
                <div id="react-view">${componentHTML}</div>
                <script type="application/javascript">
                    window.__CONFIG__        = ${serializeJs(config, { isJSON: true })};
                    window.__INITIAL_STATE__ = ${serializeJs(initialState, { isJSON: true })};
                </script>
                <script
                    type="application/javascript"
                    src="${config.staticUrl}/${getAssetsPaths().js}?${config.version}" defer></script>
            </body>
        </html>`
    );
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on: ${PORT}`);
});
