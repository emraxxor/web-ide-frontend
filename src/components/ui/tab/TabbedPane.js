import {  useState, cloneElement, useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { ProjectContext } from "../../../context/ProjectContext";


/**
 * 
 * @author Attila Barna 
 */
const TabbedPane = ({ props, data }) => {
    const ctx = useContext(ProjectContext)
    const [key, setKey] = useState(`${data[0].eventKey}-0`);

    const onCloseTab = (item) => {
            ctx.removeTab(item)
    }

    return (

        <Tabs
            id="project-manager"
            activeKey={key}
            onSelect={(k) => setKey(k)}
        >
            {data.map( (item,ix) => {
                
                const cloned =  cloneElement(
                    item.component,
                    {item: item}
                )            

                if (item.type === 'component') {
                  return (  
                        <Tab key={ix} {...props} eventKey={`${item.eventKey}-${ix}`} title={<span>{item.title} {!item.item.saved ? '(*)' : ''} <span onClick={ e => onCloseTab(item)}><AiOutlineClose/></span> </span>}>
                             {cloned}
                        </Tab> 
                  )
                }
           
            })}
        
             
        </Tabs>
    )

    
};

export default TabbedPane;