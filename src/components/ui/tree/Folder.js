import './Folder.scss';

import { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineFolder } from 'react-icons/ai';
import styled from 'styled-components';

import { ProjectContext } from '../../../context/ProjectContext';
import TreeContextMenu from '../context-menu/TreeContextMenu';
import ProjectRenameDirectory from '../project/editor/ProjectRenameDirectory';
import { ACTION } from '../../../config/config';

const Collapsible = styled.div`
  height: ${p => (p.isOpen ? 'auto' : '0')};
  cursor: pointer;
  overflow: hidden;
`;

/**
 * 
 * @author Attila Barna 
 */

const Folder = ({ name, children, item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ctx = useContext(ProjectContext)
    const folderLabel = useRef(null)
    const contextMenuRef = useRef(null)
    const [displayDialog,setDisplayDialog] = useState(false)


    const handleToggle = e => {
      e.preventDefault();    
      ctx.changeWorkingDirectory(item)
      setIsOpen(!isOpen)
      // # State hack
      folderLabel.current.click();
    }


    function handleDialogActionListener(action) {
      if ( action.type === ACTION.SAVE ) {
        ctx
        .renameProjectDirectory(item, {action})
        .then(e => console.log(e))
        .catch(e => console.error(e))
      }
      setDisplayDialog(false)
    }

    const removeSelectedItem = () => {
       ctx.removeProjectDirectory(item)
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
      }
   ]
 

    return (
      <>
      <ProjectRenameDirectory displayComponent={displayDialog} item={item} actionListener={handleDialogActionListener} ></ProjectRenameDirectory>
      <div key={`folder-` + item.componentId} className="folder">
        <div ref={folderLabel} className="folder--label" onClick={handleToggle}>
          <AiOutlineFolder />
          <span ref={contextMenuRef}>{name}</span>
          <TreeContextMenu key={`tree-context-folder-` + item.componentId} onItemClick={handleItemClick} contextMenuRef={contextMenuRef} items={items} ></TreeContextMenu>
        </div>
        <Collapsible isOpen={isOpen}>{children}</Collapsible>
      </div>
      </>
    );
  };
  

  export default Folder;