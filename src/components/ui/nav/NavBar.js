import { Form, FormControl, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useSelector } from "react-redux";


/**
 * 
 * @param {*} props 
 * @param {*} children 
 * 
 * @author Attila Barna
 */
const NavBar = ( props, children ) => {

    const auth = useSelector( (state) => state.auth );
    let login = null
    let logout = null
    let projects = null
    let home = null 
    let profile = null
    let admin = null 

    if ( auth && auth.user && auth.user.role === 'ADMIN' ) {
        admin = <Nav.Link href="/admin">Admin</Nav.Link>
    }

    if ( auth.authenticated ) {
        home = <Nav.Link href="/home">Home</Nav.Link>
        projects = <Nav.Link href="/projects">Projects</Nav.Link>
        profile = <Nav.Link href="/profile">Profile</Nav.Link>
        logout = <Nav.Link href="/logout">Logout</Nav.Link>
    } else {
        login =  ( 
            <>
            <Nav.Link href="/auth">Login</Nav.Link>
            <Nav.Link href="/registration">Registration</Nav.Link>
            </> 
        )
    }
    
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/home">WEB-IDE</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {login}
                    {admin}
                    {home}
                    {projects}
                    {profile}
                    {logout}
                </Nav>

                {/*<Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>*/}
            </Navbar.Collapse>
        </Navbar>
    )
};



export default NavBar;
