import React from 'react';
import "./Bubbles.css"
import { Droppable, Draggable } from "react-beautiful-dnd"
import Task from './task'
import styled from 'styled-components'

const Container = styled.div`
width: 300px;
background-color: RoyalBlue;
margin: 8px;
border-radius: 8px;

display: flex;
flex-direction: column;
box-shadow: 3px 3px 2px gray;
`

const Title = styled.h3`
padding:8px;
margin-top:8px;
color: white;
`

const TaskList = styled.div`
padding: 8px;
border-bottom-left-radius: 8px;
border-bottom-right-radius: 8px;
transition: background-color 0.3s ease;
background-color: ${props => (props.isDraggingOver ? '#669EF9':'white')};
flex-grow: 1;
min-height:100px;
`


//This is what is displayig the title on the page
export default class Column extends React.Component {
    render() {

        return (
            <Draggable
            draggableId={this.props.column.id}
            //position of droppable contents?
            index={this.props.index}>
            {(provided)=> (
            <Container
            {...provided.draggableProps}
            ref={provided.innerRef}>

          
                    <Title {...provided.dragHandleProps}>{this.props.column.title}</Title>
                    <Droppable droppableId={this.props.column.id} type="task">

                        {(provided, snapshot) => (
                            <TaskList 
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                            >
                                {this.props.tasks.map((task, index) => (<Task key={task.id} task={task} index={index} /> 
                            ))}
                            {provided.placeholder}
                            </TaskList>
                            
                        )}
                    </Droppable>
                    </Container>

)}
                    </Draggable>
        )
    }
}