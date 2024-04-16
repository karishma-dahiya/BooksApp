import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

class NavbarComp extends Component {

    state = {
        activeLink: '' ,
    }
    handleLinkClick = (link) => {
        this.setState({ activeLink: link });
    };
    render(){
        
        return (
            <>
             <Navbar expand="lg" className=" px-2">
      <Container>
        <Navbar.Brand >
        <Link
                        className='navbar-brand ms-4 '
                        to='/'
                        onClick={() => this.handleLinkClick('')}
                    >
                        <FontAwesomeIcon className='text-purple-500 text-4xl sm:text-5xl' icon={faBookOpen} />
                </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link >
                <Link
                     className={`nav-link  font-semibold ${this.state.activeLink === 'Harry' ? 'text-primary' : 'text-secondary'}`}
                    to='/books?searchText=Harry Potter'
                    onClick={() => this.handleLinkClick('Harry')}
                                >  
                                Harry Potter
                                <span className='badge badge-pill badge-secondary'></span>
                            </Link>
            </Nav.Link>
            <Nav.Link >
            <Link
                                    className={`nav-link font-semibold ${this.state.activeLink === 'Agatha' ? 'text-primary' : 'text-secondary'}`}
                                    onClick={() => this.handleLinkClick('Agatha')}
                                    to='/books?searchText=Agatha%20Christie'
                                >
                                    Agatha Christie
                                </Link>
            </Nav.Link>
            <Nav.Link >
            <Link
                                    className={`nav-link font-semibold ${this.state.activeLink === 'premchand' ? 'text-primary' : 'text-secondary'}`}
                                    onClick={() => this.handleLinkClick('premchand')}
                                    to='/books?searchText=Premchand'>
                               Premchand
                            </Link>
            </Nav.Link>
            <Nav.Link >
            <Link
                                    className={`nav-link font-semibold ${this.state.activeLink === 'Jane' ? 'text-primary' : 'text-secondary'}`}
                                    onClick={() => this.handleLinkClick('Jane')}
                                    to='/books?searchText=Jane%20Austen'>
                               Jane Austen
                            </Link>
            </Nav.Link>
            <Nav.Link >
            <Link
                                    className={`nav-link font-semibold ${this.state.activeLink === 'mybooks' ? 'text-primary' : 'text-secondary'}`}
                                    onClick={() => this.handleLinkClick('mybooks')}
                                    to='/mybooks'>
                               My Books
                            </Link>
            </Nav.Link>
            <Nav.Link >
                <Link
                    className={`nav-link font-semibold ${this.state.activeLink === 'settings' ? 'text-primary' : 'text-secondary'}`}
                    onClick={() => this.handleLinkClick('settings')}
                    to='/settings'>
                    Settings
                </Link>
            </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
            </>
        );
    }
}
export default NavbarComp;