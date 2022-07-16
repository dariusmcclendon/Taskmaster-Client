//imports
import React , {useContext, useState} from 'react'
import {Card, Button, Row, Form, CloseButton, Modal} from 'react-bootstrap'
import {CurrentUser} from '../contexts/currentUser'

// Module used to create new projects
export default function NewProjectModule(props){
    // context usage
    let { currentUser } = useContext(CurrentUser)
    // state variables
    let [newProjectName, setNewProjectName] = useState('')
    let [newProjectDesc, setNewProjectDesc] = useState('')
    // function to create new project
    let createProject = async (e) => {
        e.preventDefault()
        console.log('create project button clicked')
        if (newProjectName !== '') {
            try {
                let response = await fetch(`https://taskmaster-io-api.herokuapp.com/projects`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: newProjectName,
                        desc: newProjectDesc,
                        owner_id: currentUser.user_id,
                        createdAt: new Date(),
                        updatedAt: new Date()

                    })
                }) //end fetch
                let newProject = response.json()
                console.log('new project created : ', newProject)
                props.setCurrentProject(newProject)
                props.setUpdate(!props.update)
                props.show(false)
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
            <Modal.Dialog className="m-2">
                <Modal.Header closeButton>
                    <Modal.Title>New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createProject}>
                        <Form.Group controlId="projectName" className='mb-2'>
                            <Form.Control 
                                placeholder="Name your project"
                                value={newProjectName}
                                onChange={e=>{setNewProjectName(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group controlId="projectDesc" className='mb-2'>
                            <Form.Control
                                placeholder="describe your project"
                                value={newProjectDesc}
                                onChange={e=>{setNewProjectDesc(e.target.value)}}
                            />
                        </Form.Group>
                        <Button variant='primary' type='submit'>Create</Button>
                    </Form>
            </Modal.Body>
            </Modal.Dialog>       
    )
}