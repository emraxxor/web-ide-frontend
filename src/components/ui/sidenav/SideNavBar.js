import React, { useState } from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Redirect, useHistory } from "react-router-dom";


const SideNavBar = ( props, children ) => {

    const auth = useSelector( (state) => state.auth );
    const history = useHistory();
    const onSelected = (e) => history.push(`/${e}`)
    let logout = ""

    if ( auth.authenticated ) {
      logout = ( 
        <NavItem eventKey="logout">
            <NavIcon>
              <FontAwesomeIcon icon={faSignOutAlt} style={{fontSize: "1.75em" }}/>
            </NavIcon> 
        </NavItem>
      )
    }


    return (
        <SideNav
          onSelect={onSelected}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="auth">
              <NavIcon>
                <FontAwesomeIcon icon={faHome} style={{fontSize: "1.75em" }}/>
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            {logout}
          </SideNav.Nav>
        </SideNav>
      );



};

export default SideNavBar;
