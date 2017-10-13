import React     from 'react';
import { Route } from 'react-router';

import App                  from './containers/App.js';
import SignupPage           from './containers/pages/SignupPage.js';
import SignupSuccess        from './components/pages/SignupSuccess.jsx';
import SignupNamePage       from './containers/pages/SignupNamePage.js';
import SignupAddressPage    from './containers/pages/SignupAddressPage.js';
import SignupBirthdayPage   from './containers/pages/SignupBirthdayPage.js';
import SignupContinue       from './components/pages/SignupContinue.jsx';
import SignupImagePage      from './containers/pages/SignupImagePage.js';
import SignupAdditionalPage from './containers/pages/SignupAdditionalPage.js';
import SignupFinalPage      from './containers/pages/SignupFinalPage.js';

export default (
    <Route component={App}>
        <Route component={SignupPage} path='/' />
        <Route component={SignupSuccess} path='/signup-success' />
        <Route component={SignupNamePage} path='/signup-name' />
        <Route component={SignupAddressPage} path='/signup-address' />
        <Route component={SignupBirthdayPage} path='/signup-birthday' />
        <Route component={SignupSuccess} path='/signup-complete' />
        <Route component={SignupContinue} path='/signup-continue' />
        <Route component={SignupImagePage} path='/signup-image' />
        <Route component={SignupAdditionalPage} path='/signup-additional' />
        <Route component={SignupFinalPage} path='/signup-final' />
    </Route>
);
