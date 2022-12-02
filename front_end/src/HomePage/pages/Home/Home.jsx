import React, { useEffect } from "react";
import banner from "./../../assets/banner-img-1.png";
import breaks from "./../../assets/333pn.png";
import breaks2 from './../../assets/pg9.png'
import join from "./../../assets/pg5.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import jwt_decode from "jwt-decode";
import Video from "./Video";
import Courses from "./Courses";
import Transform from "./Transform";
import Students from "./Students ";
import BecomeAnInstructor from "./BecomeAnInstructor";
import Choose from "./Choose";
import { useSelector, useDispatch } from 'react-redux';
import { getAllTeachers } from "../../../Dashboard/store/reducer/TeacherSlice";
import { getAllStudents } from "../../../Dashboard/store/reducer/StudentSlice";
import { getAllclass } from "../../../Dashboard/store/reducer/classSlice";
import { useNavigate } from 'react-router-dom';
import { setTeacherProfileAfterLggIn } from './../../../Dashboard/store/reducer/TeacherSlice';
import { setStudentProfileAfterLggIn } from './../../../Dashboard/store/reducer/StudentSlice';
import { Slide,Fade,direction  } from "react-awesome-reveal";


export default function Home() {
    const token= sessionStorage.getItem("token")
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
        
        var authorize = ()=>{
            if (token){
                const decoded = jwt_decode(token);
                const {id,role}=decoded
            if (role==="teacher") {
                dispatch(getAllTeachers())
            dispatch(setTeacherProfileAfterLggIn(id))
            navigate("/teacher")
        }else if(role==="student"){
            navigate("/student")    
        }else if(role==="admin") {
                navigate("/AdminDashboard")
                dispatch(getAllTeachers())
                dispatch(getAllStudents())
                dispatch(getAllclass())
                navigate("/AdminDashboard")
            }
        }
    }
    useEffect(()=>{
        authorize()

    },[])
    return (
        <>
          <section className="homeSection">
              <Slide cascade>
            <div className="container   ">
              <div className="row items-center ">
    
                <div className="col-md-7 flex justify-center items-center  ">
                  <img
                    className="homeImg rounded-full relative z-50"
                    src={banner}
                    alt=""
                  />
                  <div className="imgBackgroundHome absolute opacity-70"></div>
                </div>
    
                <div className="col-md-5 flex justify-center items-center flex-col">
                  <h1 className="font-bold  homeH animate__animated animate__bounce animate__delay-.7s animate__repeat-3 ">
                    Improve Your Online Learning Experience <br /> Better Instantly{" "}
                  </h1>
                  <p className="text-light font-bold">
                    We have <span className="text-yellow-200"> 40k+ </span> Online
                    courses & <span className="text-yellow-200"> 500k+ </span>{" "}
                    Online registered student. Find your desired Courses from them.
                  </p>
              
                </div>
              </div>
              
            </div>
            </Slide>
    
          </section>
    
          <animate__rubberBand> 
    
          <div className="breaksColors conatiner-fluid flex justify-center">
    
    
    <img alt="...."  className="breaksColorsImg " src={breaks} />
    <img  alt="...." className="breaksColorsImg " src={breaks} />
    <img  alt="...." className="breaksColorsImg " src={breaks} />
    <img  alt="...." className="breaksColorsImg " src={breaks} />
    
    
    
          </div>
    </animate__rubberBand>
    <Slide  cascade  >
          <div className="JoinUs ';
    "  >
    {/* <div className="container JoinUss">
    <div className="row">
    
    <div className="col-lg-5 flex flex-column align-center justify-center JoinUsSecOne ">
        <div className="JoinUsSecOneWords p-4">
    
    <h1 >WELCOME IN YOUR WEbSITE</h1>
    <p className="lead">Online learning has shown significant growth over the last decade, as the internet and education combine to provide people with the opportunity to gain new skills. </p>
        </div>
    </div>
    <div className="col-lg-7 flex justify-center items-center  ">
                  <img
                    className="homeImg homeImgForJoin col-12  rounded-full relative z-50"
                    src={join}
                    alt=""
                  />
                  <div className="imgBackgroundHome absolute opacity-70 imgBackgroundHomeForJoin">
                    
                  </div>
                </div>
    </div>
    
    
    </div> */}
    
    <div className="flex justify-center laptopSection">
        {/* <div className="flex items-center justify-center rightStrockWord">
            <h1>WELCOME TO</h1>
        </div> */}
    <div className="col-lg-7 flex justify-center items-center laptopSectionConntent  ">
                  <img
                    className="homeImg homeImgForJoin col-12 w-65 rounded-full relative z-50 hover:mb-3 transition  laptopSectionConntentImg"
                    src={join}
                    alt=""
                  />
                  <div className="imgBackgroundHome absolute opacity-70 imgBackgroundHomeForJoin">
                  <h1 className="rightWelcome z-50"><span className="rightWelcomeFirstSpan">WELCOME</span>   <br /> <span className="rightWelcomeSecondSpan"> IN </span></h1>
    
                  </div>
                  <div className="imgBackgroundHome absolute opacity-70 imgBackgroundHomeForJoin">
                  <h1 className="leftWelcome z-50">YOUR <span className="rightWelcomeSecondSpanTwo">WEBSITE</span> </h1>
    
                  </div>
                </div>
    
                {/* <div className="flex items-center justify-center leftStrockWord">
            <h1>xcascdsc</h1>
        </div> */}
    </div>
    
          </div>
          </Slide>
          <Courses />
          <Transform />
          {/* <Video /> */}
          <Students />
          <Choose />
          {/* <BecomeAnInstructor /> */}
        </>
      );
    }