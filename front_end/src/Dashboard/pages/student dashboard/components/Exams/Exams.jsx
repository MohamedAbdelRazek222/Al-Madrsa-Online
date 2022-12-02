import React from 'react';
import Table from "react-bootstrap/Table";

export default function Exams() {

  const exams = [
    { id: 1, name: "course 1", mark: 100, status: "pass" },
    { id: 2, name: "course 2", mark: 80, status: "pass" },
    { id: 3, name: "course 3", mark: 90, status: "faild" },
    { id: 4, name: "course 4", mark: 100, status: "pass" },
  ]

  return (
    <div className='container'>
    <h3 className="text-center text-light sectionTitle rounded col-6 m-auto p-2 my-5">Exams</h3>

    <Table striped="columns" className="my-5 text-center">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Total Mark</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {exams &&
            exams.map((exam) => (
              <tr className="fs-5">
                <td>{exam.name}</td>
                <td>{exam.mark}</td>
                <td className={exam.status == 'faild' && 'text-danger' || 'text-success fw-bold'}>{exam.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
  </div>
  )
}
