import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";

/**
 * 
 * @param {*} props 
 * @param {*} children
 * 
 * @author Attila Barna 
 */
const CodeEditor = ( props, children ) => {

    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
      editorRef.current = editor; 
    }
  
    return (
      <Row>
          <Col>
                <Editor
                    height="90vh"
                    theme="vs-dark"
                    defaultLanguage={props.language ?? 'javascript'}
                    defaultValue={props.value ?? ''}
                    onMount={handleEditorDidMount}
                />
          </Col>
      </Row>
    );
  
    
};


export default CodeEditor;