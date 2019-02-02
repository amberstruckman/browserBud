import React, { Component } from "react";
import moment from "moment"; 
// import Table from "./CalendarHourTable";

 
class Calendar extends Component {

    constructor(props) {
        super(props);
    
        this.createDayView = this.createDayView.bind(this);
      }
    
  
    createEvent (title ) {
      return {
          "title": title 
          //duration
          //start
          //end
        };
    }

    createHourEntry (hour, currentHour, ...events) {
        return {
            "hour": hour, //numeric hour
            "displayHour": hour.toString(), //might be useful separate the way you want to display hour from the numeric hour
            "current": hour === currentHour,
            "events": events
        };
    }

    createDayView(currentHour) {//would this work better as a 12-hour hour or a 24-hour hour?
        //given the current hour, build an array of hours to display
        //Version 1: the array should contain an hour entry for each hour of the day
        
        let hourEntries = [];

        for (let index = 1; index <= 24; index++) {
            let event = this.createEvent("EventTitle"+ index);
            let hourEntry= this.createHourEntry(index, currentHour, event);
            hourEntries.push(hourEntry);           
        }
        
        let currentDay = moment().format('dddd, MMMM Do YYYY');
        let dayViewObj = {
            "currentHour": currentHour,
            "hourEntries": hourEntries,
            "currentDay": currentDay
        };

        return dayViewObj;

        //Version 2: the function should take in a number for future hours to generate and a number for past hours to generate and generate those hours instead of the whole day
    }

    renderHourRow(hourEntry) {
        return (
            <tr>
                <td>{hourEntry.displayHour}</td>
                <td>{hourEntry.events[0].title}</td>
            </tr>
        )
    }

    renderCalendarTable(dayView) {
        var hourRows = dayView.hourEntries.map(this.renderHourRow);
        return (
            <table>
                <tr>
                    <th colSpan="2">{dayView.currentDay} </th>
                </tr>
                {hourRows}
            </table>
        )   
    } 
    
 
  render() {
    var now = moment();
    var date = now.format('dddd MMMM Do YYYY, h:mm:ss a');
    var hour = now.hour();
    var todayObj = {
       "display": date,
        "dayOfWeek": moment().format('dddd'),
        "dayOfMonth": moment().format('Do'),
        "month":  moment().format('MMMM'),
        "year":  moment().format('YYYY'),
        
    };
    let dayViewObj = this.createDayView(hour);
    let dayViewCalendar = dayViewObj = this.renderCalendarTable;

    return (
        <div>
            {dayViewCalendar}
            {/* <p>{todayObj.display}</p>
            <p>{hour}</p>
            <p>{dayViewObj.currentDay}</p> */}
        </div>
     
    );
  }
};
 
export default Calendar;