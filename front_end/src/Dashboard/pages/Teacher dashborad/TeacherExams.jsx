import React from "react";
import { Table } from "react-bootstrap";

export default function TeacherExams() {
  return (
    <div className="Exams p-5 bg-light vh-100">
     <h2 className="text-center mb-5">Exams</h2>
      <div className="container">
      <div>
         <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
    </div>
      </div>
      
    </div>
   
  );
}
