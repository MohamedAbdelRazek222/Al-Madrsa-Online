import React from "react";
import { NavLink } from "react-router-dom";

export default function TeacherCourses() {
  return (
    <div className="myCourses py-5 bg-light vh-100">
      <h2 className="text-center mb-5">Courses</h2>
     <div className="container">
     <div className="row">
        <div className="col-md-3">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Course 1</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <NavLink className="text-decoration-none">Classes</NavLink>
                </div>
                <div className="col-md-6">
                  <NavLink className="text-decoration-none">Students</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Course 2</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <NavLink className="text-decoration-none">Classes</NavLink>
                </div>
                <div className="col-md-6">
                  <NavLink className="text-decoration-none">Students</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Course 3</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <NavLink className="text-decoration-none">Classes</NavLink>
                </div>
                <div className="col-md-6">
                  <NavLink className="text-decoration-none">Students</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Course 4</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <NavLink className="text-decoration-none">Classes</NavLink>
                </div>
                <div className="col-md-6">
                  <NavLink className="text-decoration-none">Students</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
}
