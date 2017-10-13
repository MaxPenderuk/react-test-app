/* eslint import/no-unresolved: 0*/
import webpackAssets from '../etc/webpack-assets.json';

export function fetchComponentsData({ dispatch, components, params, query, hash, locale, location }) {
    const promises = components.map(current => {
        const component = current.WrappedComponent ? current.WrappedComponent : current;

        return component.fetchData
            ? component.fetchData({ dispatch, params, query, hash, locale, location })
            : null;
    });

    return Promise.all(promises);
}

export function getIp(req) {
    return req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;
}

export function getAssetsPaths() {
    return {
        js:  webpackAssets.main.js,
        css: webpackAssets.main.css
    };
}
