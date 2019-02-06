import React, { Component } from "react";

const eventTitleField = "event-title";
const eventStartField = "event-start";
const eventDurationField = "event-duration";
const eventDayField = "event-day";

class EventForm extends Component {

    constructor(props) {
        super(props);
        this.createEvent = this.createEvent.bind(this)
        this.submit = this.submit.bind(this);
    }

    createEvent (title, day, start, duration) {
        return {
            "title": title,
            "day": day, 
            "start": parseInt(start),
            "duration": parseInt(duration)
        };
    }

    submit(e) {
        e.preventDefault();
        e.stopPropagation();

        const newEvent = this.createEvent(this.titleField.value, this.dayField.value, this.startField.value, this.durationField.value);
        this.props.publish(newEvent);
    }

    render() {
        return (
            <form key="eventForm" onSubmit={this.submit}>
                <p>
                    <input 
                        type="text" 
                        key={eventTitleField} 
                        name={eventTitleField} 
                        ref={(x) => this.titleField = x}
                        defaultValue={this.props.title}
                        />
                    <input 
                        type="hidden" 
                        key={eventDayField} 
                        name={eventDayField} 
                        ref={(x) => this.dayField = x}
                        value={this.props.day}
                        />
                    <input 
                        type="hidden" 
                        key={eventStartField} 
                        name={eventStartField} 
                        ref={(x) => this.startField = x}
                        value={this.props.start}
                        />
                    <input 
                        type="hidden" 
                        key={eventDurationField} 
                        name={eventDurationField} 
                        ref={(x) => this.durationField = x}
                        value={this.props.duration || 60}
                        />
                    <button type="submit">Save</button>
              </p>
            </form>  
        );
    }
}

export default EventForm;