import React from "react";
import banner from "./../../assets/teaching-img.png";

export default function BecomeAnInstructor() {
  return (
    <div className="TransformSection my-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 flex flex-col justify-center items-center ">
            <div className="TransformLeft">
              <h1 className="font-bold">
                Become An Instructor Today And Start Teaching{" "}
              </h1>
              <p className="secondary-color fw-bold">
                Instructors from around the world teach millions of students on
                Edmy. We provide the tools and skills to teach what you love.
                And you can also achieve your goal with us.
              </p>
            </div>

            <div className="TransformLeftBox">
              <h1 className="mb-6">
                Transform Your Life Through Online Education
              </h1>
              <button className="TransformBtn btn btn-outline-danger px-4 py-2">
                {" "}
                Become An Instructor
              </button>
            </div>
          </div>
          <div className="col-md-6 flex  justify-center items-center">
            <img className="relative z-50" src={banner} alt="" />
            <div className="bg-red-400 imgBackground opacity-80"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
