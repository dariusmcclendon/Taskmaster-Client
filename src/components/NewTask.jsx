//imports
import React, {useContext, useState,useEffect} from 'react'
import {Form, Card, CloseButton, Button, Row, Col, Container} from 'react-bootstrap'
import Calendar from 'react-calendar'
import {CurrentUser} from '../contexts/currentUser'

export default function NewTaskModule(props){
    // state variables
    let {currentUser} = useContext(CurrentUser)
    let [newTaskName, setNewTaskName] = useState('')
    let [taskDesc, setTaskDesc] = useState('')
    let [taskDate, setTaskDate] = useState(new Date())

    let createTask = async(e)=>{
        e.preventDefault()
        try {
            let settings = {
                    title: newTaskName,
                    project_id: props.currentProject.project_id,
                    dueDate : taskDate,
                    desc : taskDesc,
                    assigned: currentUser.user_id,
                    creator: currentUser.user_id,
                    createdAt: new Date(),
                    updatedAt: new Date()

            }
            let response = await fetch(`https://taskmaster-io-api.herokuapp.com/tasks`,{
                method:'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(settings)
            })
            let reply = await response.json()
            console.log(reply)
            props.show(false)
            props.fetchTasks(props.currentProject)
        } catch(err){
            console.log(err)
        }
    }

    return (
        <Container>
            <Row className="mb-4">
                New Task  <CloseButton onClick={()=>{props.show(false)}}/>
            </Row>
            <Row>
            <Form onSubmit={createTask}>
                    <Form.Group controlId="taskName" className="mb-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            placeholder="Task Name"
                            value={newTaskName}
                            onChange={e=>{setNewTaskName(e.target.value)}}
                        >
                        </Form.Control>
                       
                    </Form.Group>
                    <Form.Group controlId='taskDesc' className="mb-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            placeholder="Task description"
                            value={taskDesc}
                            onChange={e=>{setTaskDesc(e.target.value)}}
                        />
                    </Form.Group>
                    <Calendar onChange={setTaskDate} value={taskDate} className="mb-2"/>
                    <Button type="submit">
                       Create Task
                    </Button>
                </Form>
            </Row>
       </Container>
    )
}