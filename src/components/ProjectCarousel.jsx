import React, { useState, useEffect } from 'react'
import {Container, Col, Spinner} from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'

export default function ProjectCarousel(props){
    if(props.projects){
        let projectCards = props.projects.map((project)=>{
            return (
                <Col lg="auto">
                    <ProjectCard project={project} viewClick={props.viewClick} deleteClick={props.deleteClick} key={project.project_id}/>
                </Col>
            )
        })
        return (
            <Container className='d-flex flex-row flex-nowrap overflow-auto  my-2 py-2 bg-light border-bottom'>
                
                    {projectCards}
        
            </Container>
        )
    
    }else{
        return (
            <Container>
                <Spinner animation='border' role="status">
                    <span className='visually-hidden'>Loading Projects...</span>
                </Spinner>
            </Container>
        )
    }
        
}