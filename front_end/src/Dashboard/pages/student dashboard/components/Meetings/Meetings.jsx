import React from "react";
import Table from "react-bootstrap/Table";

export default function Meetings() {
  const meetings = [
    { id: 1, name: "course 1", instructor: "Ahmed" },
    { id: 2, name: "course 2", instructor: "Mohamed" },
    { id: 3, name: "course 3", instructor: "Ali" },
    { id: 4, name: "course 4", instructor: "Omar" },
  ];

  return (
    <div className="container">
      <h3 className="text-center text-light sectionTitle rounded col-6 m-auto p-2 my-5">
        Incoming Meetings
      </h3>

      <Table striped="columns" className="my-5 text-center">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Meet</th>
          </tr>
        </thead>
        <tbody>
          {meetings &&
            meetings.map((meeting) => (
              <tr className="fs-5">
                <td>{meeting.name}</td>
                <td>{meeting.instructor}</td>
                <a href="#"><i class='bx bxl-zoom bx-md text-primary'></i></a>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
