import File from "./File";
import Folder from "./Folder";

const RecursiveTree = ({ data }) => {
    return data.map(item => {

      if (item.type === 'file') {
        return <File key={item.id} name={item.name} />;
      }

      if (item.type === 'folder') {
        return (
          <Folder key={item.id} name={item.name}>
            <RecursiveTree key={item.id} data={item.childrens} />
          </Folder>
        );
      }
    });
};
  

export default RecursiveTree;