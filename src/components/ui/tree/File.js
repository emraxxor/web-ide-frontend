import { AiOutlineFile } from 'react-icons/ai';
import FILE_ICONS from './Icons';
import './File.scss';

const File = ({ name }) => {
  let ext = name.split('.')[1];

  return (
    <div className="file">
      {FILE_ICONS[ext] || <AiOutlineFile />}
      <span>{name}</span>
    </div>
  );
};

export default File;