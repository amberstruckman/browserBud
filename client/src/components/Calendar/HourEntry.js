import React, { Component } from "react";


class HourPlanner extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.hourEntry.displayHour}</td>
                <td>{this.props.hourEntry.events[0].title}</td>
            </tr>
        );       
    }
}

export default HourPlanner;