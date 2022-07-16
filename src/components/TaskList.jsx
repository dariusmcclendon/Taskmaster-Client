import React, {useState,useContext} from 'react'
import { Button, ButtonGroup, ButtonToolbar, Accordion, Row, Col, Placeholder, Badge} from 'react-bootstrap'
import {CurrentUser} from '../contexts/currentUser'
import EditTask from './EditTask'
export default function TaskList(props){
    // useContexts
    let {currentUser} = useContext(CurrentUser)
    // State variables
    let [showEdit,setShowEdit] = useState(null)

    // listItem storage variable
    let listItems = ''

    // function for accepting a task
    let acceptTask = async(id)=>{
        try { 
            let response = await fetch(`https://taskmaster-io-api.herokuapp.com/tasks/${id}`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({assigned : currentUser.user_id})
    
        })
        console.log('task has been reassigned')
        } catch (err) {

        }
    }
    let completeTask = async(id)=>{
        try {
            let response = await fetch(`https://taskmaster-io-api.herokuapp.com/tasks/${id}`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({complete : true})
            })
            props.fetchTasks(props.currentProject)
        } catch (err) {
            console.log(err)
        }
    }
    // function for task delete buttons
    let deleteTask = async(id)=>{
        try {
            let response = await fetch(`https://taskmaster-io-api.herokuapp.com/tasks/${id}`,{
                method: 'DELETE',
                headers: {'Content-Type':'application/json'}
            })
            let reply = await response.json()
            console.log(reply)
            props.fetchTasks(props.currentProject)
        } catch (err) {
            console.log(err)
        }
    }
    // Placeholder for list while loading
    function loadingList(){
        return (
            <Col>
            <h3>Loading...</h3>
            <Placeholder as={Accordion.Item} animation="glow">
                <Placeholder xs={8}/>
            </Placeholder>
            <Placeholder as={Accordion.Item} animation="glow">
                <Placeholder xs={8}/>
            </Placeholder>
            <Placeholder as={Accordion.Item} animation="glow">
                <Placeholder xs={8}/>
            </Placeholder>
            </Col>
        )
    }
    if(props.tasks){ //Check to see if a tasks property has been passed
        if(props.tasks[0] == undefined){ //Check to see if the task array is empty
            return (
                <h4>No tasks.</h4>
            )
        } else {
            listItems = props.tasks.map((task)=>{
                let taskDate = new Date(task.dueDate)
                let taskDueString = `${taskDate.getMonth()+1}/${taskDate.getDate()}/${taskDate.getFullYear()}`
                return (
                    <Accordion.Item  eventKey={task.task_id} >
                        <Accordion.Header>
                            <p className='m-0'>{task.title} | Due : {taskDueString} {task.complete ? <Badge bg='success' className='mt-1'>Complete</Badge> : <Badge bg='danger' className='mt-1'>Incomplete</Badge>}</p>
                            </Accordion.Header>
                        <Accordion.Body >
                            <Row className='mb-3'>
                                {task.desc}
                            </Row>
                            {showEdit == task.task_id ? 
                            <Row className='me-2'>
                                <EditTask task={task} show={setShowEdit} fetchTasks={props.fetchTasks} currentProject={props.currentProject}/>
                            </Row> : null}
                            <Row>
                                <ButtonToolbar className='justify-content-end'>
                                    <ButtonGroup className="me-2">
                                        {currentUser.user_id != task.assigned ? <Button onClick={()=>{acceptTask(task.task_id)}}>
                                            Accept
                                        </Button> : null }
                                        {currentUser.user_id == task.assigned && task.complete == false ? <Button onClick={()=>{completeTask(task.task_id)}}>
                                            Complete
                                        </Button> : null}
                                        {currentUser.user_id == task.creator ?
                                            <><Button variant='warning' onClick={()=>{setShowEdit(task.task_id)}}>Edit</Button>
                                            <Button variant='danger' onClick={()=>{deleteTask(task.task_id)}}>Delete</Button>  </> 
                                            : null }
                                                
                                    </ButtonGroup>
                                    
                                
                                </ButtonToolbar>
                            </Row>
                            
        
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })
        }
        
    } else {
        listItems = loadingList()
    }
    
    return (
        <Accordion defaultActiveKey='0'>
            {listItems}
        </Accordion>
    )
}