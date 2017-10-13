import { connect } from 'react-redux';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';

import SignupBirthday from '../../components/pages/SignupBirthday.jsx';

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

export default connect(mapStateToProps)(connectDataFetchers(SignupBirthday, []));
