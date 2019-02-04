import React, { Component } from "react";
// import TodoApi from "../../utils/TodoApi";
import "./Bubbles.css"
// import BrowserApi from "../../utils/BrowserApi";
import Bubblesdata from './Bubblesdata'
import ReactDOM from 'react-dom';
import bubblesdata from "./Bubblesdata";
import Column from './column'
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';



class Bubbles extends Component {
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
        const {destination, source, draggableId} = result;

        if (!destination){
            return;
        }

        if (
            destination.droppableID === source.droppableId **
            destination.index === source.index
        ) {
            return;
        }

        const column = this.state.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);


        //from THAT index, we want to remove, replcae it with the new id (meaning swapping item with that id)
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
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
    }

    render() {

        return (
            <DragDropContext 
            
            onDragStart={this.onDragStart}
            onDragUpdate={this.onDragUpdate}
            onDragEnd={this.onDragEnd}>

                {this.state.columnOrder.map((columnId) => {
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                    return <Column key={column.id} column={column} tasks={tasks} />
                })}

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