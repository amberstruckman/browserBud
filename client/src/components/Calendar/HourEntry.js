import React, { Component } from "react";


class HourPlanner extends Component {
    render() {
      var timeClass = "";
      if (this.props.current) {
        timeClass = "current";
      }
      if (this.props.past) {
        timeClass="past";
      }
      
      return (
        <tr className={timeClass}>
          <td>{this.props.displayHour}</td>
          <td>{this.props.events[0].title}</td>
        </tr>
      );
    }
  }
  
  export default HourPlanner;