import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CodeEditor from "../components/ui/project/CodeEditor";
import { actionInitProject, actionUpdateWorkingDirectory } from "../store/project/actions";
import {store} from "../store/store"
import axios from '../HttpClient';

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
    const [tabs, setTabs] = useState(
        [
            {
                type: 'component',
                title: 'New file',
                saved: false,
                item: null,
                eventKey: 'editor',
                component: ( <CodeEditor {...props} value='' /> )
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
        }

    }

    const changeWorkingDirectory = (item) => {
        store.dispatch(actionUpdateWorkingDirectory(id, item.folder,item.name))
    }

    const openProjectFile = (item) => {
        let {folder, name} = item
        if ( folder == '/' ) 
            folder = '';

        axios
            .get(`/api/project-filemanager/${id}/file/${folder}/${name}`)
            .then(resp =>  
                setTabs([...tabs, {
                    type: 'component',
                    title: name,
                    saved: false,
                    item: item,
                    eventKey: 'editor',
                    component: ( <CodeEditor {...props} language={language(name)} response={resp} value={ atob(resp.data.object.data) } /> )
                }])  
            ) ; 
    
    }

    const ctx = {
        projectId : id,
        tabs,
        treeData,
        workdir,
        openProjectFile,
        changeWorkingDirectory,
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
                         id: e.name,
                         name: e.name
                     })
                 } else if ( e.type === 'DIR' ) {
                    data.push( {
                        type: 'folder',
                        folder: workdir,
                        id: e.name,
                        name: e.name,
                        childrens: []
                    })
                 }
            });

            if ( treeData.length === 0 ) {
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