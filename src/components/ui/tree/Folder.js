import { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineFolder } from 'react-icons/ai';
import styled from 'styled-components';
import { ProjectContext } from '../../../context/ProjectContext';
import './Folder.scss'

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

    const handleToggle = e => {
      e.preventDefault();    
      ctx.changeWorkingDirectory(item)
      setIsOpen(!isOpen)
      // # State hack
      folderLabel.current.click();
    };

    return (
      <div className="folder">
        <div ref={folderLabel} className="folder--label" onClick={handleToggle}>
          <AiOutlineFolder />
          <span>{name}</span>
        </div>
        <Collapsible isOpen={isOpen}>{children}</Collapsible>
      </div>
    );
  };
  

  export default Folder;