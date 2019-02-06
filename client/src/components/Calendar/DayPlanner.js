import React, { Component } from "react";
import HourPlanner from "./HourEntry";

class DayPlanner extends Component {
    render() {
      var hours = this.props.hourEntries.map((hour) => 
    <HourPlanner  openNewEvent={this.props.openNewEvent} {...hour} />                                         );
      return (
        <table className="day-calendar">
            <tr>
              <th colSpan="2">{this.props.currentDay}</th>
            </tr>
            {hours}
        </table>
      );
    }
  }

export default DayPlanner;
  