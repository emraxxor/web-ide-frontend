import { useState } from 'react';
import { AiOutlineFolder } from 'react-icons/ai';
import styled from 'styled-components';
import './Folder.scss'

const Collapsible = styled.div`
  height: ${p => (p.isOpen ? 'auto' : '0')};
  cursor: pointer;
  overflow: hidden;
`;


const Folder = ({ name, children }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleToggle = e => {
      e.preventDefault();
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="folder">
        <div className="folder--label" onClick={handleToggle}>
          <AiOutlineFolder />
          <span>{name}</span>
        </div>
        <Collapsible isOpen={isOpen}>{children}</Collapsible>
      </div>
    );
  };
  

  export default Folder;