import { connect } from 'react-redux';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';

import SignupAddress from '../../components/pages/SignupAddress.jsx';

import countries from '../../../etc/countries.json';

import {
    setCredentials
} from '../../actions/userInfo.js';

function mapStateToProps({
    userInfo
}) {
    const userCountriesList = countries.map(country => {
        return {
            value: country.name,
            label: country.name,
            code: country.code
        };
    });

    return {
        userInfo,
        userCountriesList,
        actions: {
            setCredentials
        }
    };
}

export default connect(mapStateToProps)(connectDataFetchers(SignupAddress, []));
