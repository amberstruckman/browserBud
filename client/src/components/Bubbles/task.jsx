import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
width: auto;
padding: 8px;
border-radius: 3px;
border: 1px solid white;
margin-bottom: 8px;
background-color: ${props => (props.isDragging? 'DarkSlateBlue':'RoyalBlue')}

display: flex;
`

const Handle = styled.div`
width: 20px;
height: 20px;
background-color: DarkSlateBlue;
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