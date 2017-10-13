import { connect } from 'react-redux';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';

import SignupImage from '../../components/pages/SignupImage.jsx';

import {
    uploadImage,
    deleteImage
} from '../../actions/userInfo.js';

function mapStateToProps({
    userInfo
}) {
    return {
        userInfo,
        actions: {
            uploadImage,
            deleteImage
        }
    };
}

export default connect(mapStateToProps)(connectDataFetchers(SignupImage, []));
