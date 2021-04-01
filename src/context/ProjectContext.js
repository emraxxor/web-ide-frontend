import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CodeEditor from "../components/ui/project/CodeEditor";
import { actionInitProject, actionReloadWorkingDirectory, actionRemoveProjectFile, actionUpdateWorkingDirectory } from "../store/project/actions";
import {store} from "../store/store"
import axios from '../HttpClient';
import idGenerator from "react-id-generator";

export const ProjectContext = createContext();

/**
 * 
 * @author Attila Barna
 */
export default function ProjectContextProvider({ props, children }) {
    const {id} = useParams()
    const files = useSelector( state => state.project.files )
    const workdir = useSelector(state => state.project.currentProject.workdir)
    const [treeData, setTreeData] = useState([])
    const [displayProjectProperties,setDisplayProjectProperties] = useState(false)
    const [displayProjectCommandDialog,setDisplayProjectCommandDialog] = useState(false)
    const [displayProjectInspectorDialog,setDisplayProjectInspectorDialog] = useState(false)
    const [containerInformation,setContainerInformaton] = useState(null)
    const [projectSpinner, setProjectSpinner] = useState((<></>))

    const [tabs, setTabs] = useState(
        [
            {
                type: 'component',
                title: 'New file',
                saved: false,
                componentId: idGenerator(),
                item: {
                    componentId: idGenerator(),
                    saved: false
                },
                eventKey: 'editor',
                component: ( <CodeEditor {...props} item={ {saved: false} } value='' /> )
            }
        ]
    )

    const language = (filename) => {
        let ext = filename.split('.')[1];
        if ( ext === 'html' || ext == 'html' ) {
            return 'html'
        } else if ( ext === 'js' ) {
            return 'javascript'
        } else if ( ext === 'cs' ) {
            return 'csharp'
        } else if ( ext === 'cpp' ) {
            return 'cpp'
        } else if ( ext === 'css' ) {
            return 'css'
        } else if ( ext === 'go' ) {
            return 'go'
        } else if ( ext === 'java' ) {
            return 'java'
        } else if ( ext === 'php' ) {
            return 'php'
        } else if ( ext === 'sql' ) {
            return 'sql'
        } else if ( ext === 'py' ) {
            return 'python'
        } else if ( ext === 'json' ) {
            return 'json'
        } 
    }

    const changeWorkingDirectory = (item) => {
        store.dispatch(actionUpdateWorkingDirectory(id, item.folder,item.name))
    }

    const refreshProjectDirectory = () => {
        store.dispatch(actionReloadWorkingDirectory(id, workdir))
    }

    const actionOnProjectEditor = (el) => {
            const { item } = el
            if ( item && el.action === 'change' ) {
                let stabs = [...tabs]
                let stab = stabs.find( e => e.componentId === item.componentId )
                stab.item.saved = false
                setTabs(stabs)
            }
    }

    const removeProjectFile = async (item) => {
        return store.dispatch( actionRemoveProjectFile (id, item.folder,item.name))
    }


    const removeTab = (tab) => {
        let stabs = [...tabs].filter( e => e.componentId && e.componentId !== tab.componentId )
        if ( stabs.length > 0 )
            setTabs(stabs)
    }

    const renameProjectFile = async (item,{action}) => {
        if ( item && item.name ) {
            let { folder, name } = item 
            if ( folder == '/' ) 
                folder = '';

            const data = {
                type : 'FILE',
                name : action.data.file.name,
                data : 'FAKE'
            }

            return new Promise( (resolve,reject) => {
                    axios
                        .put(`/api/project-filemanager/${id}/rename/file/${folder}/${name}`, data)
                        .then(resp =>  {
                            if ( resp.status === 202 ) {
                                let stabs = [...tabs]
                                let stab = stabs.find( e => e.item && e.item.componentId && e.item.componentId === item.componentId )
                                if ( stab ) {
                                    stab.item = item
                                    stab.item.name = action.data.file.name
                                    stab.title = action.data.file.name
                                    stab.item.saved = true
                                    setTabs(stabs)
                                }                             
                                store.dispatch(actionReloadWorkingDirectory(id, workdir))         
                                resolve( {resp,tabs,item} )
                            }
                        })
                        .catch( err => reject(err) )
            });

        } 
    }    

    const saveProjectFile = async (element, data) => {
        const { item } = element

        if ( item && item.name ) {
            let { folder, name } = item 
            if ( folder == '/' ) 
                folder = '';

            return new Promise( (resolve,reject) => {
                    axios
                        .put(`/api/project-filemanager/${id}/file/${folder}/${name}`, {data})
                        .then(resp =>  {
                            if ( resp.status === 202 ) {
                                let stabs = [...tabs]
                                let stab = stabs.find( e => e.componentId === item.componentId )
                                if ( !stab.item.name ) {
                                    stab.item = item
                                    stab.title = item.name
                                }
                                stab.item.saved = true
                                setTabs(stabs)                    
                                resolve( {resp,tabs,item} )
                            }
                        })
                        .catch( err => reject(err) )
            });

        } 
    }    

    const startProject = async () => {
        return new Promise( (resolve,reject )  =>  {
                    axios
                    .post(`/api/project/start/${id}`,{})
                    .then(resp => { 
                            if ( resp.data.code === 1 ) {
                                setContainerInformaton(resp.data.object)
                                resolve(resp.data.object)
                            }
                        
                     })
                    .catch(err => reject(err))  
        });
    }

    const openProjectFile = (item) => {
        let {folder, name} = item
        if ( folder == '/' ) 
            folder = '';

        if ( !item.saved ) 
            item.saved = false
        
        if ( tabs.find(e => e.item && e.item.componentId && e.item.componentId === item.componentId ) )
            return 

        axios
            .get(`/api/project-filemanager/${id}/file/${folder}/${name}`)
            .then(resp =>  
                setTabs([...tabs, {
                    type: 'component',
                    title: name,
                    componentId: idGenerator(),
                    saved: false,
                    item,
                    eventKey: 'editor',
                    component: ( <CodeEditor {...props} item={item} language={language(name)} response={resp} value={ atob(resp.data.object.data) } /> )
                }])  
            ) ; 
    
    }

    const ctx = {
        projectId : id,
        tabs,
        treeData,
        workdir,
        displayProjectProperties,
        projectSpinner,
        containerInformation,
        displayProjectCommandDialog,
        displayProjectInspectorDialog,
        setProjectSpinner,
        setDisplayProjectInspectorDialog,
        setDisplayProjectCommandDialog,
        setDisplayProjectProperties,
        openProjectFile,
        refreshProjectDirectory,
        saveProjectFile,
        removeProjectFile,
        renameProjectFile,
        changeWorkingDirectory,
        actionOnProjectEditor,
        startProject,
        removeTab,
        addNewTab : (tab) => setTabs([...tabs, tab])
    }

    const findDirectory = (tree,dirnames, depth, parent=tree) => {
        if ( depth === dirnames.length ) {
             return {parent,tree};
         } else {
             const dirname = dirnames[depth]
             parent = tree.find(e => e.type === 'folder' && e.name === dirname); 
             return findDirectory( parent.childrens , dirnames, depth + 1 , parent );
         }
    }


    useEffect( () => {
        if ( workdir && files ) {
            const dirs = Array.from(workdir.split("/")).filter( e => e !== "");
            const { tree, parent } = findDirectory(treeData, dirs, 0);
            const data = [];
            Array.from(files).forEach( e => {
                 if ( e.type === 'FILE' ) {
                     data.push( {
                         type: 'file',
                         folder: workdir,
                         componentId: idGenerator(),
                         id: e.name,
                         name: e.name
                     })
                 } else if ( e.type === 'DIR' ) {
                    data.push( {
                        type: 'folder',
                        folder: workdir,
                        componentId: idGenerator(),
                        id: e.name,
                        name: e.name,
                        childrens: []
                    })
                 }
            });

            if ( treeData.length === 0 || (treeData.length !== 0 && workdir === '/') ) {
                setTreeData( data )
            } else {
                parent.childrens = data
                setTreeData(treeData)
            }
            
        }
    }, [files] )


    useEffect(() => {
        store.dispatch(actionInitProject(id))
    }, [id])

    return (
        <ProjectContext.Provider value={ctx}>
            {children}
        </ProjectContext.Provider>
    );
}