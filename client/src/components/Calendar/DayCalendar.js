import React, { Component } from "react";
import moment from "moment"; 
import DayPlanner from "./DayPlanner";
import "./DayCalendar.css";

const previousDayKey = "prev-day";
const nextDayKey = "next-day";
const nextMonthKey = "next-month";
const prevMonthKey = "prev-month";
const todayKey = "today";
const dayKeyFormat = "YYYY-MM-DD";

class DayCalendar extends Component { 
  constructor(props) {
    super(props);

    const thisIsTheMoment = moment();
    const dayKey = thisIsTheMoment.format(dayKeyFormat);
    const days = {};
    days[dayKey] = this.createDay(thisIsTheMoment);
    this.state = {
      now: thisIsTheMoment,
      days: days,
      todayKey: dayKey,
      selectedDayKey: dayKey
    };

    this.changeDay = this.changeDay.bind(this);
    this.updateSelectedDay = this.updateSelectedDay.bind(this);
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
          
          let dayViewObj = {
              "currentHour": currentHour,
              "hourEntries": hourEntries,
              "currentDay": day.format("dddd, MMMM Do, YYYY"),
              "moment": day
          };
  
          return dayViewObj;
  
          //Version 2: the function should take in a number for future hours to generate and a number for past hours to generate and generate those hours instead of the whole day
      }
    
    changeDay(e) {
      let changeType = e.target.value;
      console.log(changeType);
     
      let selectedMoment = this.state.days[this.state.selectedDayKey].moment;

      switch (changeType) {
          case nextDayKey:
              selectedMoment.add(1, 'days');
              break;
          case nextMonthKey:
              selectedMoment.add(1, 'month');
              break;
          case previousDayKey:
              selectedMoment.add(-1, 'days');
              break;
          case prevMonthKey:
              selectedMoment.add(-1, 'month');
              break;
          case todayKey:
              if (this.state.todayKey === this.state.selectedDayKey) {
                return;
              }
              selectedMoment = this.state.now;
              break;
          default:
              console.log("mystery change");
              break;
      }

      this.updateSelectedDay(selectedMoment);
    }

    updateSelectedDay(selectedMoment) {
      const selectedMomentKey = selectedMoment.format(dayKeyFormat); 
      const newState = {
        selectedDayKey: selectedMomentKey
      };
      
      if (!this.state.days.hasOwnProperty(selectedMomentKey)) {
        const newDay = this.createDay(selectedMoment);
        const updatedDays = this.state.days;
        updatedDays[selectedMomentKey] = newDay;
        newState.days = updatedDays;          
      }

      this.setState((prevState) => newState);
    }
    
    render() {

      var selectedDay = this.state.days[this.state.selectedDayKey];
      //alert(JSON.strignify(dayViewObj));
      return (
          <div>
              <h3>Day Calendar for {selectedDay.currentDay}</h3>
              <p>
                <button title="Go back a month" key={prevMonthKey} onClick={this.changeDay} value={prevMonthKey}>&lt;&lt;</button>
                <button title="Go back a day" key={previousDayKey} onClick={this.changeDay} value={previousDayKey}>&lt;</button>
                <button title="Return to today" key={todayKey} onClick={this.changeDay} value={todayKey}>Today</button>
                <button title="Go forward a day" key={nextDayKey} onClick={this.changeDay} value={nextDayKey}>&gt;</button>
                <button title="Go forward a month" key={nextMonthKey} onClick={this.changeDay} value={nextMonthKey}>&gt;&gt;</button>
              </p>
              <DayPlanner {...selectedDay} />
          </div>     
      );
    }
  }
  
  export default DayCalendar;