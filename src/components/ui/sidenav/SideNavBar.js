import React from "react";
import SideNav, {
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";


const SideNavBar = () => {

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
          style={ {position: 'fixed'} }
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey={auth.authenticated ? 'home' : 'auth'}>
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
