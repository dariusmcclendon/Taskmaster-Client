//imports
import  React, { useState, useContext } from 'react'
import { Container, Form, Button} from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import {CurrentUser} from '../contexts/currentUser'

//login page
export default function Signup(props){
    //State Variables
    let [inputUsername, setUsername] = useState('')
    let [inputPassword, setPassword] = useState('')
    let [passwordConfirm, setPasswordConfirm] = useState('')
    let [badAttempt, setBadAttempt] = useState(false)
    let [errMessage, setErrMessage] = useState('')
    let {setCurrentUser} = useContext(CurrentUser)
    let navigate = useNavigate()
    let validate = async(e)=>{
        e.preventDefault()
        console.log(inputUsername,inputPassword)
        if(inputUsername !== "" && inputPassword !== ""){
            let response = await fetch('https://taskmaster-io-api.herokuapp.com/auth/signup',
            {
                method : 'POST',
                headers:{'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    username : inputUsername,
                    password : inputPassword,
                    display_name : inputUsername,
                    createdAt : new Date(),
                    updatedAt : new Date()
                })
            })
            if(response.status===200){
                let resData = await response.json()
                setCurrentUser(resData)
                navigate('/dashboard')
            }
            
        } else {
            setErrMessage('No username or password.')
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
                <Form.Group controlId="passwordConfirm">
                    <Form.Label>Retype Password</Form.Label>
                    <Form.Control type="password" placeholder="re-enter password" value={passwordConfirm} onChange={e=>{setPasswordConfirm(e.target.value)}}/>
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Sign Up
                </Button>
            </Form>
        </Container>
    )
}