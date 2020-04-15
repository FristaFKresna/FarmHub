import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
  
} from 'reactstrap';
import Swal from 'sweetalert2';
// import {Link}from 'react-router-dom'


class FarmHubNavbar extends React.Component{
    state = {
        isOpen : false

    }

    toggle = () => {
        this.setState({isOpen : !this.state.isOpen})
    }

    onLogoutClick = () => {
        Swal.fire({
            title : "Logout",
            text : "Are You Sure Want To Logout",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        })
        .then((val)=>{
            if(val.value){
                localStorage.removeItem('id')       //delete data di local storage
                this.props.fnDeleteDataUser()      //delete data di app.js
                Swal.fire({
                    icon:'success',
                    title:'Logout Success',
                    timer:2000,
                    showConfirmButton:false,
                })
                .then((res)=>{
                    window.location = '/'
                })
                
            }
        })

    }

    onClickCartBtn = () => {
        var id = localStorage.getItem('id')
        window.location='/cart/' + id

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
                                <NavLink href='/'>
                                    {/* <Link to='/'> */}
                                        Products
                                    {/* </Link> */}
                                </NavLink>
                            </NavItem>
                        </Nav>


                    {
                        this.props.user === null ?
                        <Nav navbar>
                            <NavItem>
                                <NavLink href='/login'>
                                    Login
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/register'>
                                    Register
                                </NavLink>
                            </NavItem>
                        </Nav>
                        :
                        <Nav navbar>
                            {
                                this.props.user.role === 'pembeli' ?

                                <Nav navbar>
                                <NavItem>
                                    <NavLink href='/cart-revisi' style={{cursor:'pointer'}}>
                                        Cart Revisi
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={this.onClickCartBtn} style={{cursor:'pointer'}}>
                                        Cart
                                    </NavLink>
                                </NavItem>
                                </Nav>
                                :
                                this.props.user.role === 'penjual' ?
                                
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                        Menu
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem href='/post-your-product'>
                                                Post Product
                                            </DropdownItem>
                                            <DropdownItem href='/manage-product'>
                                                Manage Product
                                            </DropdownItem>
                                        </DropdownMenu>

                                    </UncontrolledDropdown>

                                    
                                : 
                                null
                            }
                             <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Hello, {this.props.user.email}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem href='/change-profile'>
                                    Change Profile
                                    </DropdownItem>
                                    <DropdownItem href='/history'>
                                    History
                                    </DropdownItem>
                                    <DropdownItem href='/wishlist'>
                                    Wishlist
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.onLogoutClick}>
                                    Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            
                        </Nav>

                    }

                    </Collapse>
                </Navbar>
            </div>
        )

    }
}

export default FarmHubNavbar;