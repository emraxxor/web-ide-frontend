import styled from "styled-components";


const MenuItem = styled.div`
  cursor: pointer;
`;

/**
 * Attila Barna
 * @param {*} param0 
 */
const TreeContextMenuItem = ({  item, click , children }) => {
  return (<MenuItem className="menu-item" onClick={e => click(item)}>{item.text}</MenuItem>)
};

export default TreeContextMenuItem;
