import React, { Component } from "react";
import moment from "moment"; 
import DayPlanner from "./DayPlanner";
import "./DayCalendar.css";
// import HourEntry from "./HourEntry";
import EventForm from "./EventForm";

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
            selectedDayKey: dayKey,
            event: {
              publish: this.saveEvent,
              seed: null
            }
        };

        this.changeDay = this.changeDay.bind(this);
        this.updateSelectedDay = this.updateSelectedDay.bind(this);
        this.openEventForm = this.openEventForm.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
    }

    openEventForm(seed) {
      this.setState({
        event: {
          publish: this.saveEvent,
          seed: seed
        }
      })
    }

    saveEvent(newEvent) {
      //create event from form
      console.log("published new event" + JSON.stringify(newEvent));
      //save it to db
      //put it in local state
      //clear the form
      this.setState((prevState) => {
          const days = prevState.days;
          const hours = days[newEvent.day].hourEntries;
          let added = false;
          days[newEvent.day].hourEntries = hours.map((entry, index) => {
            if (!added && entry.hour == newEvent.start) {
              added = true;
              entry.events.push(newEvent)
            }
            return entry;
          });
          //handle case where added event is not in the current range
          return {
            days: days,
            event: {
              publish: this.saveEvent,
              seed: null
            }
          }
      });
    }

    asDisplayableHour(hour) {
      let from12 = hour % 12;

      return `${from12 === 0 ? 12 : from12}:00 ${from12 === hour ? "AM" : "PM"}`;
    }

    createEvent (title, day, start, duration ) {
        return {
            "title": title,
            "day": day, 
            "start": start,
            "duration": duration
        };
    }
  
    createHour (day, hour, currentHour, ...events) {
          return {
              "day": day,
              "hour": hour, //numeric hour
              "displayHour": this.asDisplayableHour(hour), //might be useful separate the way you want to display hour from the numeric hour
              "current": hour === currentHour,
              "past": hour < currentHour,
              "events": events || []
          };
      }
  
    createDay(momentToCreate) {
          const currentHour = momentToCreate.hour();
          const dayKey = momentToCreate.format(dayKeyFormat);
          var hourEntries = [];
  
          for (let index = currentHour - 1; index < currentHour + 6; index++) {
              //var event = this.createEvent("EventTitle"+ index);
              var hourEntry= this.createHour(dayKey, index, currentHour);
              hourEntries.push(hourEntry);           
          }
          
          let dayViewObj = {
              "hourEntries": hourEntries,
              "currentDay": momentToCreate.format("dddd, MMMM Do, YYYY"),
              "moment": momentToCreate
          };
  
          return dayViewObj;
  
          //Version 2: the function should take in a number for future hours to generate and a number for past hours to generate and generate those hours instead of the whole day
      }
    
    changeDay(e) {
      let changeType = e.target.value;
      console.log(changeType);
     
      let selectedMoment = moment(this.state.days[this.state.selectedDayKey].moment.toDate());

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

      let selectedDay = this.state.days[this.state.selectedDayKey];
      let eventForm = this.state.event.seed ?
        (<EventForm publish={this.state.event.publish} {...this.state.event.seed} />) 
        : "";
      //alert(JSON.strignify(dayViewObj));
      return (
          <div>
              <p>
                <button title="Go back a month" key={prevMonthKey} onClick={this.changeDay} value={prevMonthKey}>&lt;&lt;</button>
                <button title="Go back a day" key={previousDayKey} onClick={this.changeDay} value={previousDayKey}>&lt;</button>
                <button title="Return to today" key={todayKey} onClick={this.changeDay} value={todayKey}>Today</button>
                <button title="Go forward a day" key={nextDayKey} onClick={this.changeDay} value={nextDayKey}>&gt;</button>
                <button title="Go forward a month" key={nextMonthKey} onClick={this.changeDay} value={nextMonthKey}>&gt;&gt;</button>
              </p>
              <DayPlanner openNewEvent={this.openEventForm} {...selectedDay} />
              {eventForm}
          </div>     
      );
    }
  }
  
  export default DayCalendar;