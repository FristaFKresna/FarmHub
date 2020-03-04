import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom'

class FarmHubNavbar extends React.Component{
    state = {
        isOpen : false

    }

    toggle = () => {
        this.setState({isOpen : !this.state.isOpen})
    }


    render(){
        return (
            <div className='sticky-top'>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">FarmHub</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to='/product'>
                                    Products
                                </Link>
                            </NavItem>
                        </Nav>


                        <Nav navbar>
                            <NavItem>
                                <Link to='/login'>
                                    Login
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/register'>
                                    Register
                                </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
    </div>
        )
    }
}

export default FarmHubNavbar;