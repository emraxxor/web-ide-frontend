import { DefaultConfiguration, DefaultLocalStorage } from '../../config/config';
import axios from '../../HttpClient';

export const AUTH_START = 'AUTH_START';
export const AUTH_INFO = 'AUTH_INFO';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';


export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = ({token, userId, neptunId}) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        neptunId: neptunId
    };
};

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    DefaultLocalStorage.remove();
    return {
        type: AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};


/**
 * 
 * @param {string} username
 * Email of the user ** Just only the username method is defined in UserDetails interface
 * Actually the user name is the email 
 *  
 * @param {*} password 
 */
export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            username,
            password
        };
     
        axios.post(`/authenticate`, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                const { token, userId, neptunId } = response.data;
                DefaultLocalStorage.set(token, userId, neptunId, expirationDate);
                dispatch(authSuccess(response.data));
                dispatch(currentUserInfo())
            })
            .catch(err => {
                dispatch(authFail({message:'Invalid email or password.'}));
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path: path
    };
};


export const currentUserInfo = () => async dispatch => {
    try {
        const data = await axios.get(`/api/user/info`)
        dispatch(authInfo(data.data))
    } catch(e) {
        dispatch(logout())
    }
}

export const authInfo = (data) => {
    return {
        type: AUTH_INFO,
        data
    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem(DefaultConfiguration.TOKEN_STORAGE_KEY)
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(DefaultConfiguration.EXPIRATION_DATE)
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const { userId, neptunId, token  } = localStorage
                dispatch(authSuccess(token, userId, neptunId))
                dispatch(currentUserInfo())
            }   
        }
    };
};