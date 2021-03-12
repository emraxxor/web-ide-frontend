import File from "./File";
import Folder from "./Folder";

/**
 * 
 * @author Attila Barna 
 */
const RecursiveTree = ({ data }) => {

    if ( !data ) 
      return (<></>)

    return data.map(item => {

                      if (item.type === 'file') {
                        return <File key={item.id} name={item.name} item={item} />;
                      }

                      if (item.type === 'folder') {
                        return (
                          <Folder key={item.id} name={item.name} item={item} >
                            <RecursiveTree key={item.id} data={item.childrens} item={item} />
                          </Folder>
                        );
                      }
                  })
                  
};
  

export default RecursiveTree;