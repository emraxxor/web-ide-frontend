import { Component } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import AsyncComponent from './components/async/AsyncComponent';
import Auth from './components/ui/auth/Auth';
import Registration from './components/ui/auth/Registration';
import Home from './components/ui/home/Home';
import Logout from './components/ui/logout/Logout';
import NavBar from './components/ui/nav/NavBar';
import SideNavBar from './components/ui/sidenav/SideNavBar';
import ProjectContextProvider from './context/ProjectContext';
import * as actions from './store/auth/actions';


const AsyncProjectEditor = AsyncComponent(() => {
  return import('./components/ui/project/ProjectEditor');
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
    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/registration" exact component={Registration} />
        <Route path="/" exact component={Home} />
        { this.props.user !== null  ? <Redirect to="/" />  : null }
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/logout" exact component={Logout} />
          <Route path="/home" exact component={Home} />
          <Route path="/project/:id">
              <ProjectContextProvider>
                <AsyncProjectEditor/>
              </ProjectContextProvider>
          </Route>
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    } 

    return (
      <Container>
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