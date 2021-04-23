import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { ProjectContext } from "../../../../context/ProjectContext";
import './ProjectBrowserComponent.css'

const Browser = React.forwardRef(( props, ref ) => {
    const {theme  } = props
    const [defaultUrl, setDefaultUrl] = useState(null)
    const browserInput = useRef(null)
    const currentProject = useSelector(state => state.project.currentProject )
    const projectContext = useContext(ProjectContext)
    const parentBrowserContainer = useRef(null)
    const iframe = useRef(null)
    const themeClass = theme === 'dark' ? 'dark' : 'light';
    const browserData = projectContext.browserData;
  
  
    const reload = () => {
      setDefaultUrl(browserInput.current.value)
    }
   

    const openInNewWindow = () => {
      window.open(browserInput.current.value)
    }

    const onKeyUp = (e) => {
      e.preventDefault()

      if (e.key === 'Enter') {
         setDefaultUrl(e.target.value)
      }
    }

    useEffect( () => {

      if ( browserData && browserData.NetworkSettings && browserData.NetworkSettings.IPAddress ) {
        if ( currentProject && currentProject.project && currentProject.project.containerElement ) {
           let port = currentProject.project.containerElement.exposed
           setDefaultUrl('http://'+browserData.NetworkSettings.IPAddress + ':' + port)
           
           if ( browserInput.current )
              browserInput.current.value = 'http://'+browserData.NetworkSettings.IPAddress + ':' + port
        }
      }

    }, [browserData,currentProject] )


    useEffect( () => {
      if ( defaultUrl ) 
        browserInput.current.value = defaultUrl
      
    }, [defaultUrl] )

    if ( !browserData || !defaultUrl ) 
      return null
    

    return (
      <div id={parentBrowserContainer} className="container" >
        <div className={`header header-${themeClass}`} style={ {display: 'flex'}}>
          <button onClick={reload} className={`browser abtn mr-rt-4 fs-24 rotated-90 ${themeClass}`}>&#x21bb;</button>
          <div className={`url-bar mr-rt-4 mr-lt-4 ${themeClass}`} style={ { marginTop :'10px', width: '100%'} }>
             <input ref={browserInput} onKeyUp={onKeyUp} type="text" style={ { width: '100%'} }/>
          </div>
          <button onClick={openInNewWindow} className={`btn fs-22 mr-lt-4 new-window ${themeClass}`}>&#x2610;</button>
          {props.children}
        </div>
        <iframe ref={iframe}
          title="editor"
          src={defaultUrl}
          width="100%"
          allow="*"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          allowFullScreen
          className="windowFrame"
        />
      </div>
    )
  
})

export default Browser;