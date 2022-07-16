//imports
import  React, { useState, useContext} from 'react'
import { Container, Form, Button} from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import {CurrentUser} from '../contexts/currentUser'

//login page
export default function Login(props){
    //State Variables
    let [inputUsername, setUsername] = useState('')
    let [inputPassword, setPassword] = useState('')
    let [badAttempt, setBadAttempt] = useState(false)
    let [errMessage, setErrMessage] = useState('')
    let navigate = useNavigate()


    //Login validation function
    let {setCurrentUser} = useContext(CurrentUser)
    let credentials = {
            username : inputUsername,
            password : inputPassword }

    let validate = async(e)=>{
        e.preventDefault()
        // try block for  password authentication
        try {
           
            if(inputUsername !== "" && inputPassword !== ""){
                let response = await fetch(`https://taskmaster-io-api.herokuapp.com/auth/login/`,{
                    method: 'POST',
                    credentials:'include',
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(credentials)
                })
                const data = await response.json()
                if(response.status === 200) {
                    setCurrentUser(data.user)
                    navigate('/dashboard')
                }
            }
        } catch (err) {
            console.log(err)
        }
        
    }
    return (
        <Container>
            <Form onSubmit={validate}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Enter Username" value={inputUsername} onChange={e=>{setUsername(e.target.value)}}/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="enter a password" value={inputPassword} onChange={e=>{setPassword(e.target.value)}}/>
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Log In
                </Button>
            </Form>
        </Container>
    )
}