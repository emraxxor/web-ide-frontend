import { useEffect, useCallback, useState } from "react";

/**
 * Simple context menu hook
 * 
 * @param {} outerRef
 * @author Attila Barna 
 */
const useContextMenu = (outerRef) => {
  const [leftPos, setLeftPos] = useState("0px");
  const [topPos, setTopPos] = useState("0px");
  const [menu, setMenu] = useState(false);

  const displayContextMenu = useCallback(
    event => {
      event.preventDefault();

      if (outerRef.current && outerRef.current.contains(event.target)) {
        outerRef.current.classList.add('selected-item')
        setLeftPos(`${event.x - 30}px`);
        setTopPos(`${event.y - 180}px`);
        setMenu(true);
      } else {
        outerRef.current.classList.remove('selected-item')
        setMenu(false);
      }

    },
    [setMenu, outerRef, setLeftPos, setTopPos]
  );

  const closeContextMenu = useCallback(() => {
    setMenu(false);
    if ( outerRef.current != null )
      outerRef.current.classList.remove('selected-item')
  }, [setMenu]);


  useEffect(() => {
    document.addEventListener("click", closeContextMenu);
    document.addEventListener("contextmenu", displayContextMenu);

    return () => {
      document.removeEventListener("click", closeContextMenu);
      document.removeEventListener("contextmenu", displayContextMenu);
    };
  }, []);

  return {leftPos, topPos, menu, outerRef};
};

export default useContextMenu;
