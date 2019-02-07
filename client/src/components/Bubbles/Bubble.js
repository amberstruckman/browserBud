import React, { Component } from "react";
// import TodoApi from "../../utils/TodoApi";
import "./Bubbles.css"
// import BrowserApi from "../../utils/BrowserApi";
import Bubblesdata from './Bubblesdata'
import ReactDOM from 'react-dom';
import bubblesdata from "./Bubblesdata";
import Column from './column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BrowserApi from '../../utils/BrowserApi'

//adding more bubbles, columns

const Container = styled.div`
display: flex;
`


class Bubbles extends Component {

    browser = this.props.browser;
    
    state = bubblesdata;

    onDragStart = () => {
        //color when we are moving stuff
        document.body.style.color = 'grey';
    }

    // onDragUpdate = update => {
    //     const { destination} = update;
    //     const opacity = destination 
    //         ? destination.index / Object.keys(this.state.tasks).length: 0;
    //     document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
    // }


    //saving the position of the dragged items 
    onDragEnd = result => {
        //color in its normal form
        document.body.style.color = 'inherit'
        const {destination, source, draggableId, type} = result;

        if (!destination){
            return;
        }

        if (
            destination.droppableID === source.droppableId **
            destination.index === source.index
        ) {
            return;
        }


        //logic for reordering columns
        if (type === "column") {
            const newColumnOrder = Array.from(this.state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.state,
                columnOrder: newColumnOrder
            }
            this.setState(newState);
            return;
        }
        //looking at source of id. switching items from one column to another
        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        //if the beginning and ending columns for the items are the same
        if (start === finish){
            const newTaskIds = Array.from(start.taskIds);


            //from THAT index, we want to remove, replcae it with the new id (meaning swapping item with that id)
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }
    
    
            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                }
            }
    
            this.setState(newState)
            return;
        }
        

        //moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        }

        const finishTaskIds = Array.from(finish.taskIds);

        //splice is for inserting the new one into that place
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        }

        const newState ={
            ...this.state,
            columns: {
                ...this.state.columns, 
                [newStart.id] : newStart,
                [newFinish.id] : newFinish,
            }
        }
        this.setState(newState)
    }

    render() {

        // console.log(this.props.browser)
        // console.log("columnorder", this.state.columnOrder)
        // console.log("pages", this.props.browser.pages[0].columns[0])
        
        return (
            <DragDropContext 
            
            onDragStart={this.onDragStart}
            onDragUpdate={this.onDragUpdate}
            onDragEnd={this.onDragEnd}>
             {/* is not as important. this is for horizontal movements of the panels themselves */}
            <Droppable 
            droppableId="all-columns" 
            direction="horizontal" 
            type="column"
            >
                {provided => (
            <Container
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                {this.state.columnOrder.map((columnId, index) => {
                    const column = this.state.columns[columnId];
                    // console.log("columnid", column)
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                    return <Column key={column.id} column={column} tasks={tasks} index={index}/>
                })}

                {provided.placeholder}
            </Container>
              )}
           
            </Droppable>
            </DragDropContext>
        );
    }

}



// class Bubbles extends Component {

//     displayNew(){
//         console.log("HAHA")
//         console.log(" ㅇ러나어랑너란어ㅣ라ㅏㅓㅇ나렁니ㅓ라ㅣㅇㄴ",BrowserApi.getBrowser())
//     }
//     render(){

//         console.log(BrowserApi.getBrowser())

//         return(
//             <div className="newbubbles">
//                 <div id="bubbles">GAGAG</div>
//              {/* <BrowserApi entries={this.state.items}
//             delete={this.deleteItem}/> */}
//           </div>

//         )
//     }


// }

export default Bubbles;