import {
    UPLOAD_IMAGE,
    DELETE_IMAGE,
    SET_CREDENTIALS,
    SET_USER_COUNTRY_CODE
} from '../actions/userInfo';

const DEFAULT_STATE = {
    email           : '',
    pwd             : '',
    firstName       : '',
    lastName        : '',
    street          : '',
    postCode        : '',
    city            : '',
    country         : null,
    countryCode     : '',
    birthdayDate    : '',
    frontSideImg    : null,
    backSideImg     : null,
    field1          : '',
    field2          : '',
    date            : ''
};

export default function userInfo(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SET_CREDENTIALS:
            return {
                ...state,
                ...action.credentials
            };
        case SET_USER_COUNTRY_CODE:
            return {
                ...state,
                countryCode: action.code
            };
        case UPLOAD_IMAGE:
            return uploadImage(state, action);
        case DELETE_IMAGE:
            return deleteImage(state, action);
        default:
            return state;
    }
}

function uploadImage(state, action) {
    const newState = { ...state };

    newState[action.key] = action.image;

    return newState;
}

function deleteImage(state, action) {
    const newState = { ...state };

    newState[action.key] = null;

    return newState;
}
