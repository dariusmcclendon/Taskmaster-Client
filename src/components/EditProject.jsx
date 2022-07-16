
import React, {useState, useEffect} from 'react'
import {Card, Button, ButtonGroup, Col, Form, CloseButton, Modal} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

//module used to create projects and manage current project,including editing, deleting, adding groups, adding tasks
export default function EditProjectModule(props){
    let [inTitle, setTitle] = useState(props.project.title)
    let [inDesc, setDesc] = useState(props.project.desc)


    let updateProject = async (e)=>{
        e.preventDefault()
        try {
            let response = await fetch(`https://taskmaster-io-api.herokuapp.com/projects/${props.project.project_id}`,{
                method: 'PUT',
                headers : {'Content-Type':'application/json'},
                body : JSON.stringify( {
                    title : inTitle,
                    desc : inDesc,
                    updatedAt: new Date()
                })
            })
            
            let reply = await response.json()
            console.log(reply)
            props.setCurrentProject(reply)
            
        } catch (err) {

        }
    }
   return (
    <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Edit Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={updateProject}>
                    <Form.Group controlId="projectName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control 
                            value={inTitle}
                            onChange={e=>{setTitle(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group controlId="projectTitle">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={inDesc}
                            onChange={e=>{setDesc(e.target.value)}}
                            />
                    </Form.Group>
                    <Button variant='warning' type='submit'>Update</Button>
                </Form>
            </Modal.Body>
        </Modal.Dialog>       
   )
}