import React from "react";

export default function CourseDetails(props) {
  const { details } = props;
  const { name, instructor, desc } = details;

  return (
    <div className="container">
      <div className="col-9 m-auto border py-4 px-3 rounded">
        <h2 className="text-center">{name}</h2>
        <h4><span className="text-primary">Instructor: </span>{instructor}</h4>
        <p className="lead"><span className="text-primary fw-bold">Description: </span>{desc}</p>
      </div>
    </div>
  );
}
