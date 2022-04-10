import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import '../css/navbar.css'

function NavBar() {
    return (
      <>
        <div className='navBar'>
            <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand as={Link} to="/">
                <h1 className='main-header'>BYARNOLD</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="navbar-collapse" id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link className="nav-link" as={Link} to="/about" >Over mij</Nav.Link>
                <Nav.Link className="nav-link" as={Link} to="/gallery">Gallerij</Nav.Link>
                <Nav.Link className="nav-link" as={Link} to="/contact">Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </div>
      
      </>
    );
  }
  
  export default NavBar;