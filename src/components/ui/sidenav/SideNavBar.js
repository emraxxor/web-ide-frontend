import React, {useEffect, useState} from "react";
import SideNav, {
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHome, faProjectDiagram, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";


const SideNavBar = () => {

    const auth = useSelector( (state) => state.auth );
    const history = useHistory();
    const onSelected = (e) => history.push(`/${e}`)
    const [items, setItems] = useState([]);

    useEffect( () => {
        if (auth.authenticated) {
            setItems([
                {
                    eventKey: "projects",
                    icon: faProjectDiagram,
                    navText: "Projects"
                },
                {
                    eventKey: "profile",
                    icon: faUser,
                    navText: "Profile"
                },
                {
                    eventKey: "logout",
                    icon: faSignOutAlt,
                    navText: "Logout"
                },
            ]);
        }
    }, [auth.authenticated]);

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
            {
                items.map( (e,ix) => (
                    <NavItem eventKey={e.eventKey} key={ix}>
                        <NavIcon>
                            <FontAwesomeIcon icon={e.icon} style={{fontSize: "1.75em" }}/>
                        </NavIcon>
                        <NavText>{e.navText}</NavText>
                    </NavItem>
                ))
            }
          </SideNav.Nav>
        </SideNav>
      );



};

export default SideNavBar;
