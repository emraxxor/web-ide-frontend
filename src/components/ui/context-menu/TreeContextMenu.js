import styled from "styled-components";
import useContextMenu from "./ContextMenu";
import TreeContextMenuItem from "./TreeContextMenuItem";

const Menu = styled.div`
  cursor: pointer;
  position: absolute;
  border: 1px solid black;
  background-color: white;
  width: 200px;
  height: 200px;
  overflow: hidden;
  z-index: 5000;
`;

/**
 * Attila Barna
 * @param {*} param0 
 */
const TreeContextMenu = ({ contextMenuRef, onItemClick,  items }) => {
  const { leftPos, topPos, menu } = useContextMenu(contextMenuRef);

  if (menu) {
    return (
      <Menu style={{  top: topPos, left: leftPos }}>
        {
            items.map( (e,ix) => (
                 <TreeContextMenuItem key={ix} click={onItemClick} item={e} />
            ))
        }
      </Menu>
    );
  }
  return <></>;
};

export default TreeContextMenu;
