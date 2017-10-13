import { connect } from 'react-redux';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';

import SignupFinal from '../../components/pages/SignupFinal.jsx';

function mapStateToProps({
    userInfo
}) {
    return {
        userInfo
    };
}

export default connect(mapStateToProps)(connectDataFetchers(SignupFinal, []));
