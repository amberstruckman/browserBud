import React, { Component } from "react";
import { isArray } from "util";

const newEvent = "new-event";
class HourPlanner extends Component {
    constructor(props) {
      super(props);

      this.newEvent = this.newEvent.bind(this);
    }

    newEvent(e) {
      this.props.openNewEvent({
        title: undefined,
        day: this.props.day,
        start: this.props.hour,
        displayStart: this.props.displayHour,
        duration: 60
      });
    }


    render() {
      let timeClass = "";
      if (this.props.current) {
        timeClass = "current";
      }
      if (this.props.past) {
        timeClass="past";
      }
      let events = "";
      if (this.props.events && isArray(this.props.events)) {
        events = this.props.events
            .map(event => event.title)
            .join("<br/>")
      }

      
      return (
        <tr className={timeClass}>
          <td>{this.props.displayHour}</td>
          <td>{events  }</td>
          <td><button key={newEvent} title="Add something" value={newEvent} onClick={this.newEvent}>+</button></td>
        </tr>
      );
    }
  }
  
  export default HourPlanner;