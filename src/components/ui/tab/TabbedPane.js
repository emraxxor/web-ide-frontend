import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";



const TabbedPane = ({ data }) => {

    const [key, setKey] = useState('home');

    return (
        <Tabs
            id="project-manager"
            activeKey={key}
            onSelect={(k) => setKey(k)}
        >
            {data.map( (item,ix) => {

                if (item.type === 'component') {
                  return (  
                             <Tab key={ix} eventKey={`${item.eventKey}-${ix}`} title={item.title}>
                              {item.component}
                             </Tab> 
                  )
                }
           
            })}

        <Tab eventKey="home" title="Home">
            Empty
        </Tab>
        
        </Tabs>
    )
};

export default TabbedPane;