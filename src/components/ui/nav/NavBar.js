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

    if ( auth.authenticated ) {
        logout = <Nav.Link href="/logout">Logout</Nav.Link>
    } else {
        login =  <Nav.Link href="/auth">Login</Nav.Link>
    }
    
    

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/home">WEB-IDE</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {login}
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/projects">Projects</Nav.Link>
                    {logout}
                </Nav>

                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
};



export default NavBar;
