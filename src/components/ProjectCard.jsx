import React, {useState} from 'react'
import {Card, Button, Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

// Should be passed a project as a property, and return a single project card.
export default function ProjectCard(props){
    
        return (
            <Card style={{width: '18rem',height:`100%`,padding:'5px',marginLeft:'10px'}} key={props.project.project_id}>
                <Card.Body>
                    <Card.Title>{props.project.title}</Card.Title>
                    <Card.Text>{props.project.desc}</Card.Text>
                </Card.Body>
                <Button 
                    variant='primary'
                    onClick={()=>{
                        console.log(`view for ${props.project.title} was clicked`)
                        props.viewClick(props.project)
                    }}
                    >View</Button>
            
            
            </Card>
        )
    }