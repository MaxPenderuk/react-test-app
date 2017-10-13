export const UPLOAD_IMAGE           = 'UPLOAD_IMAGE';
export const DELETE_IMAGE           = 'DELETE_IMAGE';
export const SET_CREDENTIALS        = 'SET_CREDENTIALS';
export const SET_USER_COUNTRY_CODE  = 'SET_USER_COUNTRY_CODE';

export function setCredentials(credentials) {
    return {
        type: SET_CREDENTIALS,
        credentials
    };
}

export function setUserCountryCode(geolocation) {
    return {
        type: SET_USER_COUNTRY_CODE,
        code: geolocation.country
    };
}

export function uploadImage(imageInBase64, side) {
    return {
        key:        side,
        type:       UPLOAD_IMAGE,
        image:      imageInBase64
    };
}

export function deleteImage(side) {
    return {
        type : DELETE_IMAGE,
        key  : side
    };
}
