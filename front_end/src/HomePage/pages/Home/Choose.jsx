import React from "react";
import emdy1 from "../../assets/edmy1.png";
import emdy2 from "../../assets/edmy2.png";
import emdy3 from "../../assets/edmy3.png";
import emdy4 from "../../assets/edmy4.png";
import breaks2 from './../../assets/pg9.png'
import { Slide,Fade,direction  } from "react-awesome-reveal";
import 'animate.css';
export default function Choose() {
  return (
    <>
         
    <div className="primary-color ChooseSection my-5 py-5">
    <div className="breaksColorsFooter conatiner-fluid mb-5 justify-center flex breaksColorsFooterChoose ">

<img className="breaksBooksImg " src={breaks2} />
<img className="breaksBooksImg " src={breaks2} />
<img className="breaksBooksImg " src={breaks2} />


      </div>
      <Slide casecade>
      <div className="container choose">
        <div className="row mb-5">
          <h1 className="text-center my-5 font-bold">
            Why You Should <span className="text-lower-third-about"> Choose </span> Our Site
          </h1>

          <div className="emdyCard p-3 text-center  col-sm-3">

            <img className="homeCourseImg" src={emdy1} alt="" />
            <h3>Engaging Content</h3>
            <p>
            Videos, Web pages, Presentations, Documents - watch on any device!
            </p>
          </div>
          <div className="emdyCard p-3 text-center  col-sm-3">
            <img className="homeCourseImg" src={emdy2} alt="" />
            <h3>Metrics</h3>
            <p>
            Measure participation, feedback and see revenue reports.
            </p>
          </div>
          <div className=" emdyCard p-3 text-center  col-sm-3">
            <img className="homeCourseImg" src={emdy3} alt="" />
            <h3>Quizzes and Reviews</h3>
            <p>
            Check how well people are learning and what they think of the content.
            </p>
          </div>
          <div className="emdyCard p-3 text-center  col-sm-3">
            <img className="homeCourseImg" src={emdy4} alt="" />
            <h3>Certifications</h3>
            <p>
            Score advanced tests and see how many attempts lead to success.
            </p>
          </div>
        </div>
      </div>
      </Slide>
    </div>
    
    </> );
}
