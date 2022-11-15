import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';
import {
    Router,
    browserHistory,
    match
} from 'react-router';

import configureStore  from '../shared/store/configureStore';
import routes          from '../shared/routes.jsx';
import i18n            from '../shared/i18n';

const initialState  = window.__INITIAL_STATE__ || {};
const store         = configureStore(initialState);

(async () => {
    try {
        match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
            ReactDOM.render(
                <Provider store={store}>
                    <i18n.Provider i18n={{}}>
                        <Router {...renderProps} />
                    </i18n.Provider>
                </Provider>,

                document.getElementById('react-view')
            );
        });
    } catch (err) {
        console.error(err);
    }
})();
