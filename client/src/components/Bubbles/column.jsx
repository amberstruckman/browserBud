import React from 'react';
import "./Bubbles.css"
import { Droppable, Draggable } from "react-beautiful-dnd"
import Task from './task'
import styled from 'styled-components'

const Container = styled.div`
width: 300px;
background-color: RoyalBlue;
margin: 8px;
border: 1px solid lightgrey;
border-radius: 8px;

display: flex;
flex-direction: column;
`

const Title = styled.h3`
padding:8px;
`

const TaskList = styled.div`
padding: 8px;
transition: background-color 0.4s ease;
background-color: ${props => (props.isDraggingOver ? 'DarkSlateBlue':'#669EF9')};
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