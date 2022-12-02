import React from "react";
import banner from "./../../assets/testimonial-1.png";
import { Slide,Fade,direction  } from "react-awesome-reveal";
import 'animate.css';

export default function Students() {
  return (
    <>
    <Slide casecade >
    <div className="TransformSection ">
      <div className="container">
        <div className="row">
          <div className="col-md-6 flex  justify-center items-center">
            <img className="relative z-50" src={banner} alt="" />
            <div className="bg-red-400 imgBackground opacity-80"></div>
          </div>

          <div className="col-md-6 flex flex-col justify-center items-center ">
            <div className="TransformLeft">
              <h1 className="font-bold">
                Our <span className="text-lower-right-about-two"> Students </span> Are Our Strength. See What They Say About Us{" "}
              </h1>
            </div>

            <div className="TransformLeftBox">
              <h1 className="mb-6">
                Transform Your Life Through Online Education
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Slide>
    </>
  );
}
