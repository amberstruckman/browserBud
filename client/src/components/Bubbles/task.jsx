import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import "./Bubbles.css"

const Container = styled.div`
width: auto;
padding: 8px;
box-shadow: 1px 1px 1px gray;
border-radius: 3px;
border: 2px solid RoyalBlue;
margin-bottom: 8px;
background-color: ${props => (props.isDragging? 'RoyalBlue':'white')}

display: flex;
`

const Handle = styled.div`
width: 20px;
height: 20px;
background-color: RoyalBlue;
border-radius: 4px;
margin-right: 8px;
`

export default class Task extends React.Component {
    render() {
        return(


        <Draggable draggableId={this.props.task.id} index={this.props.index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                  
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >

                <Handle   {...provided.dragHandleProps}/>
                    
                        <a href={this.props.task.link}>{this.props.task.content}</a>
                        
                 

                </Container>
            )}
        </Draggable>
        )
    }
}