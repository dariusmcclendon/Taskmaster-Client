import React, {useEffect, useContext} from 'react'
import {Nav, Navbar, Button, Container} from 'react-bootstrap'
import { useNavigate, Route, Link } from 'react-router-dom'
import {CurrentUser} from '../contexts/currentUser'

export default function Header(props){
    let {currentUser} = useContext(CurrentUser)
    let{setCurrentUser} = useContext(CurrentUser)
    let navigate = useNavigate()
    let logout = async ()=>{
        let response = await fetch(`https://taskmaster-io-api.herokuapp.com/auth/signout`,{
            method: 'POST',
            header : {'Content-Type':'application/json'},
            credentials : 'include'
        })
        setCurrentUser(undefined)
        localStorage.clear()
        navigate('/login')
    }
    console.log(currentUser)
    if(currentUser === undefined){
        return (
            <div>
                <Navbar bg="primary" variant='dark' expand="lg" className='border-bottom'>
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/">Taskmaster</Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='me-auto'>
                                
                            </Nav>

                                <Nav.Link as={Link} to='/login'><Button>Login</Button></Nav.Link>
                                <Nav.Link as={Link} to='/signup'><Button>Sign Up</Button></Nav.Link>
                        </Navbar.Collapse>
                        
                    </Container>
                </Navbar>
            </div>
        )
    }else if(currentUser){
        return (
            <div>
                <Navbar bg="primary" variant='dark' expand="lg" className='border-bottom'>
                    <Container fluid >
                        <Navbar.Brand as={Link} to="/">Taskmaster || {currentUser.display_name}</Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='me-auto'>
                                <Nav.Link as={Link} to='/dashboard'>Home</Nav.Link>
                                <Nav.Link as={Link} to='/projects'>Projects</Nav.Link>
                            </Nav>
                           { currentUser != undefined ? 
                           <Button onClick={logout}>Logout</Button> : null}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
    
}