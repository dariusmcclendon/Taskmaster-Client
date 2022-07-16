//imports
import React, {useContext, useState,useEffect} from 'react'
import {Form, Card, CloseButton, Button, Row, Col, Container} from 'react-bootstrap'
import Calendar from 'react-calendar'
import {CurrentUser} from '../contexts/currentUser'

export default function EditTaskModule(props){
    // state variables
    let {currentUser} = useContext(CurrentUser)
    let [newTaskName, setNewTaskName] = useState(props.task.title)
    let [taskDate, setTaskDate] = useState(new Date())
    let [taskDesc, setTaskDesc] = useState(props.task.desc)

    let updateTask = async(e)=>{
        e.preventDefault()
        try {
            let settings = {
                    title: newTaskName,
                    project_id: props.currentProject.project_id,
                    desc : taskDesc,
                    dueDate : taskDate,
                    creator: currentUser.user_id,
                    updatedAt: new Date()

            }
            let response = await fetch(`https://taskmaster-io-api.herokuapp.com/tasks/${props.task.task_id}`,{
                method:'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(settings)
            })
            let reply = await response.json()
            props.fetchTasks(props.currentProject)
            props.show(false)
        } catch(err){
            console.log(err)
        }
    }

    return (
        <Row>
            <Row>
               Edit Task<CloseButton onClick={()=>{props.show(null)}}/>
            </Row>
            <Row>
            <Form onSubmit={updateTask}>
                    <Form.Group controlId="taskName">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control
                            placeholder="Task Name"
                            value={newTaskName}
                            onChange={e=>{setNewTaskName(e.target.value)}}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="taskDesc">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control
                            value={taskDesc}
                            onChange={e=>{setTaskDesc(e.target.value)}}/>
                    </Form.Group>
                    
                    <Calendar onChange={setTaskDate} value={taskDate}/>
                    <Button type="submit">
                      Update Task
                    </Button>
                </Form>
            </Row>
        </Row>
            
    )
}