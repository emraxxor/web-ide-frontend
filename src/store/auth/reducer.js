import * as actionTypes from './actions';
import { update } from '../utility';
import axios from '../../HttpClient';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authenticated: false,
    user: null,
    authRedirectPath: '/'
};

const authStart = ( state, action ) => {
    return update( state, { error: null, loading: true } );
};

const authInfo = ( state, action ) => {
    return update( state,  { user: action.data } );
};

const authSuccess = (state, action) => {
    axios.defaults.headers.common['authorization'] = `Bearer ${action.idToken}`;
    return update( state, { 
        token: action.idToken,
        userId: action.userId,
        neptunId: action.neptunId,
        authenticated: true,
        error: null,
        loading: false
     } );
};

const authFail = (state, action) => {
    return update( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return update(state, { token: null, userId: null, authenticated: false, neptunId: null });
};

const setAuthRedirectPath = (state, action) => {
    return update(state, { authRedirectPath: action.path })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_INFO: return authInfo(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer;