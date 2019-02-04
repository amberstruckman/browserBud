import Component from "react";

const eventTitleField = "event-title";
const eventStartField = "event-start";
const eventDurationField = "event-duration";
const eventDayField = "event-day";

class EventForm extends Component {

    constructor(props) {
        super(props);

        this.createEvent = this.createEvent.bind(this)
        this.submitEvent = this.submitEvent.bind(this);
    }

    createEvent (title, day, start, duration) {
        return {
            "title": title,
            "day": day, 
            "start": start,
            "duration": duration
        };
    }

    submitEvent(e) {
        e.preventDefault();
        e.stopPropagation();

        const newEvent = this.createEvent(this.titleField.value, this.dayField.value, this.startField.value, this.durationField.value);
        this.props.publishEvent(newEvent);

        return false;
    }

    render() {
        return (
            <form key="eventForm" onSubmit={this.submitEvent}>
                <p>
                    <input 
                        type="text" 
                        key={eventTitleField} 
                        name={eventTitleField} 
                        ref={(x) => this.titleField = x}
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

    // render() {
    //     return (
    //         <form key="eventForm" onSubmit={this.submitEvent}>
    //             <p>
    //                 <label for={eventTitleField}>Name</label>
    //                 <input name={eventTitleField} key={eventTitleField} type="text" />
    //             </p>
    //             <p>
    //                 <label for={eventTitleField}>Name</label>
    //                 <input name={eventTitleField} key={eventTitleField} type="text" />
    //             </p>
    //             <p>
    //                 <label for={eventTitleField}>Name</label>
    //                 <input name={eventTitleField} key={eventTitleField} type="text" />
    //             </p>
    //             <p>
    //                 <label for={eventTitleField}>Name</label>
    //                 <input name={eventTitleField} key={eventTitleField} type="text" />
    //             </p>
    //             <p>
    //                 <button type="submit">Save</button>
    //             </p>
    //         </form>
    //     );
    // }
}