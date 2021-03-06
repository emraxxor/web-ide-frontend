import { Component } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import AsyncComponent from './components/async/AsyncComponent';
import Auth from './components/ui/auth/Auth';
import RegistrationComponent from './components/ui/registration/RegistrationComponent';
import Logout from './components/ui/logout/Logout';
import NavBar from './components/ui/nav/NavBar';
import ProjectBrowser from './components/ui/project/list/ProjectBrowser';
import SideNavBar from './components/ui/sidenav/SideNavBar';
import ProjectContextProvider from './context/ProjectContext';
import * as actions from './store/auth/actions';
import ProfileComponent from './components/ui/profile/ProfileComponent';
import AdminProjectBrowser from './components/ui/admin/project/AdminProjectBrowser';
import './App.css';
import UserHomePage from './components/ui/home/UserHomePage';

const AsyncProjectEditor = AsyncComponent(() => {
  return import('./components/ui/project/editor/ProjectEditor');
});

/**
 * 
 * @author Attila Barna
 */
class App extends Component {

  componentDidMount () {
    this.props.onAutoSignup();
  }

  render () {
    let routes;

    routes = (
          <Switch>
            <Route path="/auth" exact component={Auth} />
            <Route path="/registration" exact component={RegistrationComponent} />
            <Route path="/" exact component={Auth} />
            { this.props.user !== null  ? <Redirect to="/" />  : null }
          </Switch>
    );

    if ( this.props.isAuthenticated  ) {
      routes = (
            <Switch>
              <Route path="/logout" exact component={Logout} />
              <Route path="/admin" exact component={AdminProjectBrowser} />
              <Route path="/profile" exact component={ProfileComponent} />
              <Route path="/projects" exact component={ProjectBrowser} />
              <Route path="/project/:id">
                  <ProjectContextProvider>
                    <AsyncProjectEditor/>
                  </ProjectContextProvider>
              </Route>
              <Route path="/" exact component={UserHomePage} />
              <Redirect to="/" />
            </Switch>
      );
    } 

    return (
      <Container fluid style={ { marginLeft : "75px", width: "auto" } } >
          <SideNavBar/>
          <NavBar/>
            {routes}
      </Container>
    );
  }
}

const states = state => {
  return {
    isAuthenticated: state.auth.authenticated,
    user: state.auth.user
  };
};

const dispatches = dispatch => {
  return {
    onAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( states, dispatches )( App ) );