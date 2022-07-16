import React, {useState, useEffect} from 'react'
import {Card,Placeholder,ListGroup, Button, Container} from 'react-bootstrap'

export default function GroupModule(props){
    let [group,setGroup] = useState()
    let list = null
    if(group){
         list = group.map((user)=>{
            return (
                <ListGroup.Item><Container>{user.username} <Button variant="danger">Remove</Button></Container></ListGroup.Item>
            )
        })
    }
    if(props.project !== null && props.project !== undefined ){
        
        return (
           <Card>
                <Card.Title>Group</Card.Title>
                <ListGroup variant="flush">
                    {list}
                </ListGroup>
           </Card> 
        )
    }
}