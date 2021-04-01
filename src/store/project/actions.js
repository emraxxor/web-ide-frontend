import axios from '../../HttpClient';

export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_PROJECT = 'SET_PROJECT';
export const SET_PROJECT_FILES = 'SET_PROJECT_FILES';
export const SET_WORKING_DIRECTORY = 'SET_WORKING_DIRECTORY';
export const SET_PROJECT_TREE = 'SET_PROJECT_TREE';


export const setProjects = ( projects ) => {
    return {
        type: SET_PROJECTS,
        projects
    };
}

export const setProject = ( project ) => {
    return {
        type: SET_PROJECT,
        dir: '/',
        project
    };
}

export const setProjectTree = (tree) => {
    return {
        type: SET_PROJECT_TREE,
        tree
    }
}

export const setWorkingDirectory = ( folder, name ) => {
    if ( folder == '/' ) 
        folder = '';
    

    return {
        type: SET_WORKING_DIRECTORY,
        dir: folder + '/' + name
    }
}

export const setProjectFiles = ( files ) => {
    return {
        type: SET_PROJECT_FILES,
        files
    };
}

export const actionReloadWorkingDirectory = (projectId, folder) => async dispatch => {
    axios
        .get(`/api/project-filemanager/${projectId}?dir=${folder}`)
        .then(resp =>  dispatch( setProjectFiles(resp.data.object) ) ) ; 
}

export const actionUpdateWorkingDirectory = ( projectId, folder, name ) => async dispatch => {
    dispatch( setWorkingDirectory(folder,name) )

    axios
        .get(`/api/project-filemanager/${projectId}?dir=${folder}${name}`)
        .then(resp =>  dispatch( setProjectFiles(resp.data.object) ) ) ; 
} 

export const actionRemoveProjectFile = ( projectId, folder, name ) => async dispatch => {
    return new Promise( (resolve, reject) => {
        axios
            .delete(`/api/project-filemanager/${projectId}/file/${folder}${name}`)
            .then(res =>  { 
                dispatch(actionReloadWorkingDirectory(projectId,folder))
                resolve(res)
             }  ) 
            .catch(err => reject(err) ) 
    } );
} 


export const actionUpdateProjectTree = ( tree ) => async dispatch => {
    dispatch( setProjectTree(tree) )
} 

export const actionInitProject = (projectId) => async dispatch =>   {

    axios.get(`/api/project/${projectId}`)
    .then(resp => dispatch(setProject(resp.data.object)));

    axios.get(`/api/project-filemanager/${projectId}`)
    .then(resp => dispatch( setProjectFiles(resp.data.object) ));
}

export const initProject = () => async dispatch => {
    axios.get( `/api/project` )
    .then( resp => {
        dispatch(setProjects(resp.data.object));
    })

}
