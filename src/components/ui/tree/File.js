import { AiOutlineFile } from 'react-icons/ai';
import FILE_ICONS from './Icons';
import './File.scss';
import { useContext, useRef, useState } from 'react';
import { ProjectContext } from '../../../context/ProjectContext';
import TreeContextMenu from '../context-menu/TreeContextMenu';
import ProjectRenameFile from '../project/editor/ProjectRenameFile';
import { ACTION } from '../../../config/config';

/**
 * 
 * @author Attila Barna 
 */
const File = ({ name, item }) => {
  const ctx = useContext(ProjectContext)
  const contextMenuRef = useRef(null);
  const [displayDialog,setDisplayDialog] = useState(false)

  const handleClick = e => {
    e.preventDefault()
    ctx.openProjectFile(item)
  };

  const removeSelectedItem = () => {
      ctx.removeProjectFile(item).then( e => console.log(e) )
  }

  function handleFileDialogActionListener(action) {
    if ( action.type === ACTION.SAVE ) {
       ctx.renameProjectFile(item, {action})
    }
    setDisplayDialog(false)
  }

  const handleItemClick = (item) => {
      if ( item.action === 'delete' ) {
          removeSelectedItem()
      } else if ( item.action === 'rename' ) {
         setDisplayDialog(true)
      }
  }

  const items = [
     {
        action: 'delete',
        text : 'Delete'
     },
     {
      action: 'rename',
      text : 'Rename'
     },
     {
      action: 'properties',
      text : 'Properties'
     }
  ]

  let ext = name.split('.')[1];

  return (
    <>
    <ProjectRenameFile displayComponent={displayDialog} item={item} actionListener={handleFileDialogActionListener} ></ProjectRenameFile>
    <div onClick={handleClick} className="file">
      {FILE_ICONS[ext] || <AiOutlineFile />}
      <span ref={contextMenuRef}>{name}</span>
      <TreeContextMenu onItemClick={handleItemClick} contextMenuRef={contextMenuRef} items={items} ></TreeContextMenu>
    </div>
    </>
  );
};

export default File;