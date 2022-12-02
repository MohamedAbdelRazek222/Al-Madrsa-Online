import React from "react";
import { NavLink } from "react-bootstrap";

export default function CourseBanner({Title}) {

  return (
    <div>
      <section className="slideCourseBg blog-details-p">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className=" col-lg-12 text-center">
              <h1 className="text-white">{Title}</h1>
              <p className="text-white link-nav">
                <NavLink className="nav-link d-inline" href="#">
                  Courses .
                </NavLink>
                <span>{Title}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
