import { AiOutlineFile } from 'react-icons/ai';
import FILE_ICONS from './Icons';
import './File.scss';
import { useContext } from 'react';
import { ProjectContext } from '../../../context/ProjectContext';

/**
 * 
 * @author Attila Barna 
 */
const File = ({ name, item }) => {
  const ctx = useContext(ProjectContext)


  const handleClick = e => {
    e.preventDefault()
    ctx.openProjectFile(item)
  };

  let ext = name.split('.')[1];

  return (
    <div onClick={handleClick} className="file">
      {FILE_ICONS[ext] || <AiOutlineFile />}
      <span>{name}</span>
    </div>
  );
};

export default File;