import * as actionTypes from './actions';
import { update } from '../utility';
import axios from '../../HttpClient';

const initialState = {
    currentProject: null,
    currentFile: null,
    projects: []
};

const setProjects = ( state, action ) => {
    return update( state, { projects: action.projects } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_PROJECTS: return setProjects(state, action);
        default:
            return state;
    }
};

export default reducer;