//imports
import React, { useState, useEffect, useContext } from 'react'
import { Card, Container, Button, Carousel, Col, Row, Badge, Modal } from 'react-bootstrap'
import { CurrentUser } from '../contexts/currentUser'
import ProjectCarousel from '../components/ProjectCarousel'
import TaskList from '../components/TaskList'
import EditProjectModule from '../components/EditProject'
import NewProject from '../components/NewProject'
import NewTask from '../components/NewTask'
import GroupModule from '../components/GroupModule'


export default function ProjectViewer(props) {
    let { currentUser } = useContext(CurrentUser)
    // State Variables
    let [currentProject, setCurrentProject] = useState(null) // Sets the current project to the project passed to the project viewer.
    let [projects, setProjects] = useState([]) // Sets the projects
    let [tasks, setTasks] = useState([]) // Sets the tasks
    let [group, setGroup] = useState([])
    let [update, setUpdate] = useState(false) // used to force updates
    let [showUpdateProject, setShowUpdateProject] = useState(false)
    let [showNewProject, setShowNewProject] = useState(false) // used to show new project module
    let [showNewTask, setShowNewTask] = useState(false)
    
    // initial fetch of user's projects.
    useEffect(() => {
        fetchData()
    }, [currentUser, update, currentProject])
    // GET full data
    let fetchData = async () => {
        if (currentUser) {
            console.log('fetching projects for ', currentUser.display_name)
            let response = await fetch(`https://taskmaster-io-api.herokuapp.com/users/${currentUser.user_id}/projects`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            let data = await response.json()
            setProjects(data)
            if (currentProject) {
                fetchTasks(currentProject)
            } else {
                fetchTasks(data[0])
                setCurrentProject(data[0])
            }

        } else {
            console.log('waiting for currentUser')
        }
    }
    // GET a project's tasks
    let fetchTasks = async (project) => {

        console.log(`Fetching tasks for Project :  ${project.title}`)
        try {
            let response = await fetch(`https://taskmaster-io-api.herokuapp.com/projects/${project.project_id}/tasks`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            let fetchData = await response.json()
            console.log(fetchData)
            setTasks(fetchData)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (currentProject) {
            fetchTasks(currentProject)
        }
    }, [currentProject])

    // DELETE function to pass to DeleteProject buttons
    let deleteProject = async () => {

        try {
            let response = await fetch(`https://taskmaster-io-api.herokuapp.com/projects/${currentProject.project_id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
            )
            let reply = await response.json()
            console.log(reply)
            fetchData()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Container fluid className='projectview'>
            <Modal show={showNewProject} onHide={()=>{setShowNewProject(false)}} centered>
                <NewProject
                    setCurrentProject={setCurrentProject}
                    setUpdate={setUpdate}
                    update={update}
                    show={setShowNewProject}
                                /> 
                </Modal>
            <Modal show={showUpdateProject} onHide={()=>{setShowUpdateProject(false)}} centered>
                <EditProjectModule
                                show={setShowUpdateProject}
                                project={currentProject}
                                setCurrentProject={setCurrentProject}
                                />
            </Modal>
            
                <Row className='py-1 px-5 text-light bg-dark rounded-left'>
                    <Col>
                        <h2 className='my-1 align-middle'>Projects </h2>
                    </Col>
                    <Col>
                        <Button variant='success' className='my-1 float-end'
                                onClick={() => { setShowNewProject(true) ; setShowUpdateProject(false)}}>
                                New Project
                            </Button>
                    </Col>
                
                </Row>
                
                <Row>
                    <ProjectCarousel
                        projects={projects}
                        viewClick={setCurrentProject}

                        currentProject={currentProject} />
                </Row>
           
           
            <Row className='mb-3 border-bottom py-1 px-5 '>
                <Col>
                    <h3>{currentProject? currentProject.title : null}</h3>
                </Col>
                <Col>
                   
                        <Button variant='danger' className='mx-2 float-end'
                            onClick={()=>{deleteProject()}}>
                            Delete
                        </Button>
                        <Button variant='warning' className='mx-2 float-end'
                            onClick={()=>{setShowUpdateProject(true) ; setShowNewProject(false)}}>
                            Edit
                        </Button>
                </Col>
                
                
            </Row>
                
            <Row className='border-bottom py-1 px-5 '> 
                <p>{currentProject ? currentProject.desc : null}</p>
            </Row>
            <Row>
                        
                        {showUpdateProject ? <Col>
                            
                        </Col>: null}
                    <Col>
                        { group[0] != undefined ? <GroupModule
                        project={currentProject}
                        /> : null}
                    </Col>
            </Row>
            <Row>
                <Container>
                <Row className='mb-3 py-1 px-5 text-light bg-dark rounded-left'>
                    <Col>
                    <h3 className='my-1'>Tasks</h3>
                    </Col>
                    <Col>
                        <Button variants='success' className='mx-2 my-1 float-end'
                                    onClick={() => { setShowNewTask(true) }}>
                                    New Task
                                </Button>
                    </Col>
                        
                    </Row>
                    <Row className='py-1 px-5'>
                        {showNewTask ? <NewTask
                            show={setShowNewTask} fetchTasks={fetchTasks} currentProject={currentProject}
                        /> : null}

                        <TaskList tasks={tasks} fetchTasks={fetchTasks} currentProject={currentProject} />
                    </Row>
                </Container>


            </Row>
        </Container>
    )
}