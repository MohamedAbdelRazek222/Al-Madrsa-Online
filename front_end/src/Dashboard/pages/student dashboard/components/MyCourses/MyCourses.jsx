import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CourseDetails from "./CourseDetails";

export default function Courses() {
  const courses = [
    { id: 1, name: "course 1", instructor: "Ahmed", desc: "lorem ..." },
    { id: 2, name: "course 2", instructor: "Mohamed", desc: "lorem ..." },
    { id: 3, name: "course 3", instructor: "Omar", desc: "lorem ..." },
  ];

  // ============== View Course Detais ==============
  let [courseDetails, setCourseDetails] = useState();

  const viewDetails = (details) => {
    const course = courses.find((item) => item.id == details.id);
    setCourseDetails(course);
  }

  return (
    <div className="container">
      <h2 className="text-center text-light sectionTitle rounded col-6 m-auto p-2 my-5">Your Courses</h2>

      <Table striped="columns" className="my-5 text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {courses &&
            courses.map((course) => (
              <tr className="fs-5">
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.instructor}</td>
                <td>
                  <button className="btn btn-outline-primary" onClick={ () => viewDetails(course)}>View</button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {courseDetails && <CourseDetails details={courseDetails} />}
    </div>
  );
}
