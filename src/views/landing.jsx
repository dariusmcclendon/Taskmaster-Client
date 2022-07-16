import React,{  useState, useEffect } from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import {navigate, useNavigate} from 'react-router-dom'

// Landing page
export default function Landing(){
    let navigate = useNavigate()
    return (
       <Container className='border-start border-end mt-2 px-5'>
            <Row className='mx-5'>
                <h2>Welcome to Taskmaster</h2>
            </Row>
            <Row className='mx-5'>
                <p>Taskmaster is an app that lets you take control of your projects.</p>
                <p>- Create projects, tasks, and deadlines.</p>
                <p>- See your due and upcoming tasks.</p>
            </Row>
            <Row>
                <Col>
                </Col>
                <Col>
                    <Button variant='success' className='float-end' onClick={()=>{navigate('/signup')}}>
                        Get started
                    </Button>
                </Col>
                
            </Row>
       </Container>
    )
}