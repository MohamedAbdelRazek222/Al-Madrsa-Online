import React from "react";
import Counter from "../../components/Counter";
import banner from "./../../assets/undraw_Online_learning_re_qw08.png";
import banner2 from "./../../assets/undraw_Teaching_re_g7e3.png";
import banner3 from "./../../assets/undraw_Professor_re_mj1s.png";
import OurTeam from "../../components/OurTeam";
import paper from "./../../assets/pg8888.png"
import breaks from "./../../assets/333pn.png";
import { Slide,Fade,direction  } from "react-awesome-reveal";
import 'animate.css';

// import banner4 from "./../../assets/undraw_Online_learning_re_qw08.png";

export default function About() {
    return (
        <>
            <Slide cascade>
            <section className="slideCourseBg blog-details-p">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className=" col-lg-12 text-center">
                        <h1 className="text-white">About Us</h1>
                        <p className="h2 text-white my-5"> Who we are and What we do..?</p>
                    </div>
                </div>
            </section>
            </Slide>
      <div className="breaksColors container flex justify-center">

<img className="breaksColorsImg " src={breaks} />
<img className="breaksColorsImg " src={breaks} />
<img className="breaksColorsImg " src={breaks} />
<img className="breaksColorsImg " src={breaks} />



      </div>
          <Slide cascade> 
            <div className="container-fluid">
                <div className="row my-5 pt-3 mb-3">
                    <div className="col-md-6 flex flex-col justify-center items-center ">
                        <div className="TransformLeft mb-5">
                            <h1 className="font-bold text-lower-left-about">
                            Keep In Touch <br /> At Any <span className="text-lower-right-about-one"> TIME </span> <br /> And Any <span className="text-lower-right-about-two"> WHERE  </span>
                           
 <br /> With all his <span className="text-lower-third-about"> competence </span>  </h1>
                        </div>

                        <div className="TransformLeftBox py-5">
                            <h1 className="mb-6">
                                Transform Your Life Through Online Education
                            </h1>
                            {/* <button className="TransformBtn btn btn-outline-danger px-4 py-2">
                                Courcess
                            </button> */}
                        </div>
                    </div>
                    <div className="col-md-6 flex  justify-center items-center">
                        <img className="relative z-50" src={banner} alt="" />
                        <div className="bg-red-400 imgBackground opacity-80"></div>
                    </div>
                </div>

                {/* <div className="row my-5 " >
                    <div className="col-md-6 flex  justify-center items-center">
                        <img className="relative z-50" src={banner2} alt="" />
                        <div className="bg-red-400 imgBackground opacity-80"></div>
                    </div>
                    <div className="col-md-6 flex flex-col justify-center items-center ">
                        <div className="TransformLeft mb-5">
                            <h1 className="font-bold">
                            We follow the latest scientific techniques
                            </h1>
                        </div>

                        <div className="TransformLeftBox py-5">
                            <h1 className="mb-6">
                                 Online Education Is So Easier Than Before 
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="row my-5">
                    <div className="col-md-6 flex flex-col justify-center items-center ">
                        <div className="TransformLeft mb-5">
                            <h1 className="font-bold">
                            We have the best scientific Staff in all disciplines

                            </h1>
                        </div>

                        <div className="TransformLeftBox py-5">
                            <h1 className="mb-6">
                            Online Education Makes Distance Does not Matter
                            </h1>
                           
                        </div>
                    </div>
                    <div className="col-md-6 flex  justify-center items-center">
                        <img className="relative z-50" src={banner3} alt="" />
                        <div className="bg-red-400 imgBackground opacity-80"></div>
                    </div>
                </div> */}

                <Counter></Counter>
                
                <section className="courseSection courseSectionOurTeam  mb-5 ">

<img className="col-12 flex justify-content-center items-center relative" src={paper} alt="" />
<div className="container-fluid corsesSection">
<div className="row">
<div className="flex justify-center items-center my-5 ">
<h1 className="relative text-center  ">
<span className="text-lower-left">OUR </span> <span className="text-lower-right">TEAM</span>
</h1>


</div>




</div>
</div>
</section>
<Slide cascade>
                <OurTeam />
     </Slide>
            </div>
          </Slide>
        </>
    );
}



                           