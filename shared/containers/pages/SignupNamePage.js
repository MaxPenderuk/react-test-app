import { connect } from 'react-redux';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';

import SignupName from '../../components/pages/SignupName.jsx';

import {
    setCredentials
} from '../../actions/userInfo.js';

function mapStateToProps({
    userInfo
}) {
    return {
        userInfo,
        actions: {
            setCredentials
        }
    };
}

export default connect(mapStateToProps)(connectDataFetchers(SignupName, []));
