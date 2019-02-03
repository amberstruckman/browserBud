import React, { Component } from "react";
import HourPlanner from "./HourEntry";

//     // const TableRow = ({hourEntry}) => (
// //     <tr>
// //       <td>{hourEntry.displayHour}</td>
// //       <td>{hourEntry.events[0].title}</td>
// //     </tr>
// //   )
  
//   const Table = (dayView) => (
//     <table>
//             <tr>
//                 <th colSpan="2">{dayView.currentDay} </th>
//             </tr>
//             { dayView.hourEntries.map((hour) =>
//                 <HourEntry hourEntry={hour} />
//             )}
//     </table>
//   )
  
// //   ReactDOM.render(
// //     <Table data={products} />, 
// //     document.getElementById("root")
// //   );
// export default Table;

// import React, { Component } from "react";
// import HourPlanner from "./HourPlanner";

// class DayPlanner extends Component {
//     render() {
//         return (
//             <table>
//                 <tr>
//                     <th colSpan="2">{this.props.dayView.currentDay} </th>
//                 </tr>
//                 {props.dayView.hourEntries.map(hourEntry => (
//                     <HourPlanner hourEntry={hourEntry} />
//                   ))}
//             </table>
//         );
//     }
// }
// export default DayPlanner;

// class HourPlanner extends React.Component {
//     render() {
//       var timeClass = "";
//       if (this.props.current) {
//         timeClass = "current";
//       }
//       if (this.props.past) {
//         timeClass="past";
//       }
      
//       return (
//         <tr className={timeClass}>
//           <td>{this.props.displayHour}</td>
//           <td>{this.props.events[0].title}</td>
//         </tr>
//       );
//     }
//   }
  
//   export default HourPlanner;


class DayPlanner extends Component {
    render() {
      var hours = this.props.hourEntries.map((hour) => 
    <HourPlanner {...hour} />                                         );
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
  