import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
width: auto;
padding: 8px;
border-radius: 3px;
border: 1px solid white;
margin-bottom: 8px;
background-color: ${props => (props.isDragging? 'palegreen':'paleturquoise')}
`

export default class Task extends React.Component {
    render() {
        return(


        <Draggable draggableId={this.props.task.id} index={this.props.index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    
                        {this.props.task.content}
                 

                </Container>
            )}
        </Draggable>
        )
    }
}