import React, { Component } from "react";
import moment from "moment"; 
import DayPlanner from "./DayPlanner";
import "./DayCalendar.css";

// class Calendar extends Component {

//     constructor(props) {
//         super(props);
    
//         this.createDayView = this.createTasks.bind(this);
//       }
//     }
  
//     createEvent (title ) {
//       return {
//           "title": title 
//           //duration
//           //start
//           //end
//         };
//     }

//     createHourEntry (hour, currentHour, ...events) {
//         return {
//             "hour": hour, //numeric hour
//             "displayHour": hour.toString(), //might be useful separate the way you want to display hour from the numeric hour
//             "current": hour === currentHour,
//             "events": events
//         };
//     }

//     createDayView(currentHour) {//would this work better as a 12-hour hour or a 24-hour hour?
//         //given the current hour, build an array of hours to display
//         //Version 1: the array should contain an hour entry for each hour of the day
        
//         let hourEntries = [];

//         for (let index = 1; index <= 24; index++) {
//             let event = this.createEvent("EventTitle"+ index);
//             let hourEntry= this.createHourEntry(index, currentHour, event);
//             hourEntries.push(hourEntry);           
//         }
        
//         let currentDay = moment().format('dddd, MMMM Do YYYY');
//         let dayViewObj = {
//             "currentHour": currentHour,
//             "hourEntries": hourEntries,
//             "currentDay": currentDay
//         };

//         return dayViewObj;
//     };
// export default Calendar;

// class CalendarA extends React.Component { 
  
//     render() {
  
//       var dayViewObj = {
//               "currentHour": 12,
//               "hourEntries": [
//                 {
//                   "hour": 13, //numeric hour
//                   "displayHour": "1:00 PM", //might be useful separate the way you want to display hour from the numeric hour
//                   "current": false,
//                   "events": [
//                     {
//                       title: "1 o'clock stuff"
//                     }
//                   ]
//                 }
//               ],
//               "currentDay": "Feb 2, 2019"
//           };
      
//       return (
//           <div>
//               Calendar {dayViewObj.currentDay}
//             <table>
//               <thead>
//                 <tr>
//                   <th colSpan="2">{dayViewObj.currentDay}</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                     <td>{dayViewObj.hourEntries[0].displayHour}</td>
//                     <td>{dayViewObj.hourEntries[0].events}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
       
//       );
//     }
//   }
   
  
//   function createEvent (title ) {
//         return {
//             "title": title 
//             //duration
//             //start
//             //end
//           };
//       }
  
//   function createHourEntry (hour, currentHour, ...events) {
//           return {
//               "hour": hour, //numeric hour
//               "displayHour": hour.toString(), //might be useful separate the way you want to display hour from the numeric hour
//               "current": hour === currentHour,
//               "past": hour < currentHour,
//               "events": events
//           };
//       }
  
//    function createDayView(currentHour) {//would this work better as a 12-hour hour or a 24-hour hour?
//           //given the current hour, build an array of hours to display
//           //Version 1: the array should contain an hour entry for each hour of the day
          
//           var hourEntries = [];
  
//           for (let index = 1; index <= 24; index++) {
//               var event = this.createEvent("EventTitle"+ index);
//               var hourEntry= this.createHourEntry(index, currentHour, event);
//               hourEntries.push(hourEntry);           
//           }
          
//           let currentDay = "Saturday, February 2, 2019"//moment().format('dddd, MMMM Do YYYY');
//           let dayViewObj = {
//               "currentHour": currentHour,
//               "hourEntries": hourEntries,
//               "currentDay": currentDay
//           };
  
//           return dayViewObj;
  
//           //Version 2: the function should take in a number for future hours to generate and a number for past hours to generate and generate those hours instead of the whole day
//       }

//       export default CalendarA;

class DayCalendar extends Component { 
  constructor(props) {
    super(props);

    const thisIsTheMoment = moment();
    const dayKey = thisIsTheMoment.format("YYYY-MM-DD");
    const days = {};
    days[dayKey] = this.createDay(thisIsTheMoment);
    this.state = {
      days: days,
      todayOffset: 0,
      selectedDayKey: dayKey
    };
    
  }
  
    createEvent (title ) {
        return {
            "title": title 
            //duration
            //start
            //end
          };
      }
  
    createHour (hour, currentHour, ...events) {
          return {
              "hour": hour, //numeric hour
              "displayHour": hour.toString(), //might be useful separate the way you want to display hour from the numeric hour
              "current": hour === currentHour,
              "past": hour < currentHour,
              "events": events
          };
      }
  
    createDay(momentToCreate) {//would this work better as a 12-hour hour or a 24-hour hour?
          //given the current hour, build an array of hours to display
          //Version 1: the array should contain an hour entry for each hour of the day
          const day = momentToCreate || moment();
          const currentHour = day.hour();
          var hourEntries = [];
  
          for (let index = 1; index <= 24; index++) {
              var event = this.createEvent("EventTitle"+ index);
              var hourEntry= this.createHour(index, currentHour, event);
              hourEntries.push(hourEntry);           
          }
          
          let displayDay = day.format("dddd, MMMM do, YYYY");
          let dayViewObj = {
              "currentHour": currentHour,
              "hourEntries": hourEntries,
              "currentDay": displayDay
          };
  
          return dayViewObj;
  
          //Version 2: the function should take in a number for future hours to generate and a number for past hours to generate and generate those hours instead of the whole day
      }
    
    changeDay(e) {

    }
    
    render() {

      var selectedDay = this.state.days[this.state.selectedDayKey];
      //alert(JSON.strignify(dayViewObj));
      return (
          <div>
              <h3>Day Calendar for {selectedDay.currentDay}</h3>
              {/* <p>
                <button key="prev">&lt;</button>
                <button key="next">&gt;</button>
              </p> */}
              <DayPlanner {...selectedDay} />
          </div>     
      );
    }
  }
  
  export default DayCalendar;