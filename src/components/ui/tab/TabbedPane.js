import {  useState } from "react";
import { Tab, Tabs } from "react-bootstrap";


/**
 * 
 * @author Attila Barna 
 */
const TabbedPane = ({ props, data }) => {
    const [key, setKey] = useState(`${data[0].eventKey}-0`);

    return (

        <Tabs
            id="project-manager"
            activeKey={key}
            onSelect={(k) => setKey(k)}
        >
            {data.map( (item,ix) => {

                if (item.type === 'component') {
                  return (  
                        <Tab key={ix} {...props} eventKey={`${item.eventKey}-${ix}`} title={`${item.title} ${!item.saved ? '(*)' : ''}`}>
                             {item.component}
                        </Tab> 
                  )
                }
           
            })}
        
             
        </Tabs>
    )

    
};

export default TabbedPane;