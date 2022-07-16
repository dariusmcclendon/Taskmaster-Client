import React, {useEffect, useContext} from 'react'
import {Nav, Navbar, Button, Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
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
        setCurrentUser(null)
        localStorage.clear()
        navigate('/login')
    }
    if(currentUser===null){
        return (
            <div>
                <Navbar bg="primary" variant='dark' expand="lg" className='border-bottom'>
                    <Container fluid>
                        <Navbar.Brand href='/'>Taskmaster</Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='me-auto'>
                                
                            </Nav>
                            <Nav.Link href='/login'>Login</Nav.Link>
                            <Nav.Link href='/signup'><Button>Sign Up</Button></Nav.Link>
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
                        <Navbar.Brand href='/'>Taskmaster || {currentUser.display_name}</Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='me-auto'>
                                <Nav.Link href='/dashboard'>Home</Nav.Link>
                                <Nav.Link href='/projects'>Projects</Nav.Link>
                            </Nav>
                           { currentUser ?  
                           <Button onClick={logout}>Logout</Button> : null}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
    
}