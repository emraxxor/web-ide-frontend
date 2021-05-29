import Editor from "@monaco-editor/react";
import { useContext, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ACTION } from "../../../../config/config";
import { ProjectContext } from "../../../../context/ProjectContext";
import ProjectCreateNewFile from "./ProjectCreateNewFile";

/**
 *
 * @param {*} props
 *
 * @author Attila Barna
 */
const CodeEditor = ( props) => {

    const editorRef = useRef(null)
    const monacoRef = useRef(null)
    const ctx = useContext(ProjectContext)
    const workdir = ctx.workdir 
    const [mounted, setMounted] = useState(false)
    const [displayNewFileComponent, setDisplayNewFileComponent] = useState(false)
    const {item} = props


    async function handleEditorDidMount(editor, monaco) {
      editorRef.current = editor;
      monacoRef.current = monaco
      setMounted(true)
    }

    function handleFileDialogActionListener(action) {
            if ( action.type === ACTION.SAVE ) {
                ctx.saveProjectFile(
                    {item : {    
                        ...item,
                        ...{
                            saved: false,
                            folder: workdir,
                            name: action.data.file.name
                        }
                    }},
                    editorRef.current.getValue()
                ).then( () => ctx.refreshProjectDirectory() );
            }
            setDisplayNewFileComponent(false)
    }

    useEffect( () => {
        const editor = editorRef.current
        const monaco = monacoRef.current

        if ( editor ) {
            editor.addCommand(monaco.KeyMod.CtrlCmd + monaco.KeyCode.KEY_S, () => {                
                if ( props && props.item && props.item.item.name ) {
                    ctx.saveProjectFile({
                        item: {
                            ...props.item.item,
                             componentId: item.componentId
                        }
                    }, editor.getValue()).then(r => console.debug(r))
                } else {
                    setDisplayNewFileComponent(true)
                }
            });
    
            editor.onDidChangeModelContent( () => {
                ctx.actionOnProjectEditor({...props, ...{action: 'change'}})
            });
        }
  
    } , [workdir,mounted] ); 


    return (
        <>
        <ProjectCreateNewFile displayComponent={displayNewFileComponent} actionListener={handleFileDialogActionListener}/>
        <Row>
            <Col>
                    <Editor
                        key={item.componentId}
                        height="90vh"
                        theme="vs-dark"
                        defaultLanguage={props.language ?? 'javascript'}
                        defaultValue={props.value ?? ''}
                        onMount={handleEditorDidMount}
                    />
            </Col>
        </Row>
        </>
    );
  
};

export default CodeEditor;