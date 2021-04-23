import React, { createContext, useState } from "react";


export const ProjectDialogContext = createContext({});

/**
 * 
 * @author Attila Barna
 */
export default function ProjectDialogContextProvider({children }) {
    const [display,setDisplay] = useState(false)
    const [content,setContent] = useState(<></>)
    const [title,setTitle] = useState('')

    const ctx = {
          display, setDisplay, content, setContent, title, setTitle
    }


    return (
        <ProjectDialogContext.Provider value={ctx}>
            {children}
        </ProjectDialogContext.Provider>
    );

}