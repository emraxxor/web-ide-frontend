import * as actionTypes from './actions';
import { update } from '../utility';
import axios from '../../HttpClient';

const initialState = {
    currentProject: {
        files: {},
        workdir: '',
        project: {},
        projectTree : []
    },

    projects: [],
};

const setProject = (state,action) => {
    const currentProject = state.currentProject
    currentProject.project = action.project 
    currentProject.workdir = action.dir
    return update( state, {  currentProject })
};

const setWorkingDirectory = (state,action) => {
    const currentProject = state.currentProject
    currentProject.workdir = action.dir
    return update( state, {  currentProject })
};

const setProjectTree = (state,action) => {
    console.log('SET PROJECT TREE --> REDUCER')
    const currentProject = state.currentProject
    currentProject.projectTree = action.tree
    console.log(currentProject)
    return update( state, { currentProject })
};


const setProjectFiles = (state,action) => {
    const currentProject = state.currentProject
    currentProject.files = action.files
    return update( state, currentProject)
};

const setProjects = ( state, action ) => {
    return update( state, { projects: action.projects } )
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_PROJECTS: return setProjects(state, action)
        case actionTypes.SET_PROJECT: return setProject(state, action)
        case actionTypes.SET_PROJECT_FILES: return setProjectFiles(state, action)
        case actionTypes.SET_WORKING_DIRECTORY: return setWorkingDirectory(state, action)
        case actionTypes.SET_PROJECT_TREE: return setProjectTree(state, action)
        default: return state;
    }
};

export default reducer;