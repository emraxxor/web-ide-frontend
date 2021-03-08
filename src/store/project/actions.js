import axios from '../../HttpClient';

export const SET_PROJECTS = 'SET_PROJECTS';


export const setProjects = ( projects ) => {
    return {
        type: SET_PROJECTS,
        projects
    };
}

export const initProject = () => async dispatch => {
    axios.get( `/api/project` )
    .then( resp => {
        dispatch(setProjects(resp.data.object));
    })
}
