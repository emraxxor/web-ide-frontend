import * as actionTypes from './actions';
import { update } from '../utility';

const initialState = {
    currentProject: {
        files: {},
        workdir: '',
        project: {},
        projectTree : []
    },
    state : 'INIT',
    projects: [],
};

const setProject = (state,action) => {
    const currentProject = state.currentProject
    currentProject.project = action.project 
    currentProject.workdir = action.dir.replaceAll("//","/")
    return update( state, {  currentProject })
};

const setWorkingDirectory = (state,action) => {
    const currentProject = state.currentProject
    currentProject.workdir = action.dir.replaceAll("//","/")
    return update( state, {  currentProject })
};

const setProjectTree = (state,action) => {
    const currentProject = state.currentProject
    currentProject.projectTree = action.tree
    return update( state, { currentProject })
};

const setProjectsState = (state,action) => {
    return update( state, { state: action.state })
};


const setProjectFiles = (state,action) => {
    const currentProject = state.currentProject
    currentProject.files = action.files
    return update( state, currentProject)
};

const setProjects = ( state, action ) => {
    return update( state, { projects: action.projects } )
};

const actionResetProject = (state, action) => {
    return {...state, currentProject: {
        files: {},
        workdir: '',
        project: {},
        projectTree : []
    }}
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_PROJECTS: return setProjects(state, action)
        case actionTypes.SET_PROJECT: return setProject(state, action)
        case actionTypes.SET_PROJECT_FILES: return setProjectFiles(state, action)
        case actionTypes.SET_WORKING_DIRECTORY: return setWorkingDirectory(state, action)
        case actionTypes.SET_PROJECT_TREE: return setProjectTree(state, action)
        case actionTypes.SET_PROJECTS_STATE: return setProjectsState(state, action)
        case actionTypes.ACTION_RESET_PROJECT: return actionResetProject(state)


        default: return state;
    }
};

export default reducer;