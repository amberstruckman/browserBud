import React, { Component } from "react";
import HourEntry from "./HourEntry";

    // const TableRow = ({hourEntry}) => (
//     <tr>
//       <td>{hourEntry.displayHour}</td>
//       <td>{hourEntry.events[0].title}</td>
//     </tr>
//   )
  
  const Table = (dayView) => (
    <table>
            <tr>
                <th colSpan="2">{dayView.currentDay} </th>
            </tr>
            { dayView.hourEntries.map((hour) =>
                <HourEntry hourEntry={hour} />
            )}
    </table>
  )
  
//   ReactDOM.render(
//     <Table data={products} />, 
//     document.getElementById("root")
//   );
export default Table;