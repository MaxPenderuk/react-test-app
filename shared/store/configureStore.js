import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

// const composeEnhancers = process.env.BROWSER && process.env.NODE_ENV !== 'production'
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//    : compose;

const composeEnhancers = compose;

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(thunkMiddleware)));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
