import React, { useEffect, useState } from "react";
// import banner from "./../assets/register.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "../../../Dashboard/helpers/Crud";
import { createStudent } from "../../../Dashboard/store/reducer/StudentSlice";
import { createTeacher } from "../../../Dashboard/store/reducer/TeacherSlice";
import AuthBanner from "./AuthBanner";
import { Slide,Fade,direction  } from "react-awesome-reveal";
import 'animate.css';

export default function Auth() {

  const { StudentData } = useSelector(state => state.Studentcontx)
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    role: "student",
    name: null,
    email: null,
    password: null,
    phone: null,
    DOB: null,
    gender: null,
    level: null
  })

  const [formValuesLogin, setFormValuesLogin] = useState({
    email: null,
    password: null,
    role: null
  });
  
  // const {TeacherData}=useSelector(state=>state.Teachercontx)
  const dispatch = useDispatch()
  const { classData } = useSelector(state => state.classcontx)

  // const [mydata, setmydata] = useState({});
  const [err, setErr] = useState({ Name: "", Email: "", Task: "" });
  const [errLogin, setErrLogin] = useState({ email: null, password: null, role: null });

  // useEffect(()=>{
  // })
  const date = new Date();
  let day = date.getDate();
  console.log({ day })
  let month = date.getMonth() + 1;
  console.log({ month })

  let year = date.getFullYear();
  console.log({ year })

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
  console.log({ currentDate });

  const onChangeHandler = (e) => {

    console.log({ formValues })
    let nameVal = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/
    let emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    let phoneVal = /^01[0125][0-9]{8}$/gm

    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    if (e.target.value === "") {
      setErr({ ...err, [e.target.name]: `${e.target.name} is required` })
    }

    else if (e.target.name === "name" && !nameVal.test(e.target.value)) {
      setErr({ ...err, [e.target.name]: `${e.target.name} must be valid` })
    }

    else if (e.target.name === "email" && !emailVal.test(e.target.value)) {
      setErr({ ...err, [e.target.name]: `${e.target.name} must be valid` })
    }

    else if (e.target.name === "password" && e.target.value.length < 8) {
      setErr({ ...err, [e.target.name]: `${e.target.name} must be at least 8 characters` })
    }
    else if (e.target.name === "phone" && !phoneVal.test(e.target.value)) {
      setErr({ ...err, [e.target.name]: `${e.target.name} must be valid` })
    }
    else {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
      setErr({})
    }
  }

  const onChangeHandlerLogin = (e) => {
    
    console.log({ formValuesLogin })
    let emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

    setFormValuesLogin({ ...formValuesLogin, [e.target.name]: e.target.value })
    if (e.target.value === "") {
      setErrLogin({ ...errLogin, [e.target.name]: `${e.target.name} is required` })
    }
    else if (e.target.name === "email" && !emailVal.test(e.target.value)) {
      setErrLogin({ ...errLogin, [e.target.name]: `${e.target.name} must be valid` })
    }
    else if (e.target.name === "password" && e.target.value.length < 8) {
      setErrLogin({ ...errLogin, [e.target.name]: `${e.target.name} must be at least 8 characters` })
    }
    else {
      setErrLogin({})
    }
  }

  const [finalData, setFinalData] = useState([])
  let submitHandler = async (e) => {
    e.preventDefault()
    if (Object.values(formValues).includes(null)) {
      alert("Please, enter all form values")
      return;
    }

    if (Object.keys(err).length === 0) {
      dispatch(createStudent(formValues))
    //   navigate('/')
    }
  };

  let submitHandlerLogin = async (e) => {
    e.preventDefault()
    console.log(formValuesLogin)
    if (Object.values(formValuesLogin).includes(null)) {
      alert("Please, enter all form values")
      return;
    }

    if (Object.keys(errLogin).length === 0) {
      console.log("here")
      try {
        const {token} = await add("http://localhost:8000/auth/login", formValuesLogin);
        sessionStorage.setItem("token", token);
        navigate('/')
        console.log("we are logged in")
      } catch (exception) {
        console.log("exception happened during login: ", exception)
       setErrLogin("log in was unSuccessful")
      }
    } else {
      console.log("errors")
    }
  };


  const schoolClasses = ["1st Elementary level", "2nd Elementary level", "3rd Elementary level", "4th Elementary level", "5th Elementary level", "6th Elementary level", "1st Prepartory level", "2nd Prepartory level", "3rd Prepartory level", "1st Secondary level", "2nd Secondary level", "3rd Secondary level"]
  // const submitHandler=(e)=>{

  // e.preventDefault()
  // console.log(createTeacher(formValues))
  //     console.log("form.................",formValues)
  // dispatch(createTeacher(formValues))

  // }
  useEffect(() => {
    // dispatch(createStudent(formValues))
    console.log(StudentData);
  }, [])


  return (
    <>
      <AuthBanner></AuthBanner>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 flex  justify-center items-center">
            <img
              className="relative z-50"
              src="https://edmy-react.hibootstrap.com/images/register-img.png"
              alt=""
            />
            <div className="bg-red-400 imgBackground opacity-80"></div>
          </div>

          <div className="col-md-6 flex flex-col justify-center items-center ">
            <div className="TransformLeft">
              <h1 className="font-bold mb-5">Create Your account</h1>
            </div>

            <Tabs
              defaultActiveKey="profile"
              id="fill-tab-example"
              className="col-12 mb-3 tab-link"
              fill
            >
              {/* Tab1 */}
              <Tab className="col-12 font-bold " eventKey="home" title="Register">

                <Form className="col-12" onChange={(e) => onChangeHandler(e)} onSubmit={submitHandler}>
                  <Form.Group className="my-4" controlId="formName" >
                    <Form.Control type="text" placeholder="Enter Your Name" className="py-3" name="name" />
                    {err.name && <p className="text-danger"> {err.name}</p>}
                  </Form.Group>
                  <Form.Group className="my-4" controlId="formBasicEmail" >
                    <Form.Control type="email" placeholder="Enter Your Email" className="py-3" name="email" />
                    {err.email && <p className="text-danger"> {err.email}</p>}
                  </Form.Group>

                  <Form.Group className="my-4" controlId="formBasicPassword" >
                    <Form.Control type="password" placeholder="Enter Your Password" className="py-3" name="password" />
                    {err.password && <p className="text-danger"> {err.password}</p>}

                  </Form.Group>

                  <Form.Group className="my-4" controlId="formBasicPhone" >
                    <Form.Control type="text" placeholder="Enter Your Phone" className="py-3" name="phone" />
                    {err.phone && <p className="text-danger"> {err.phone}</p>}

                  </Form.Group>

                  <Form.Group className="my-4 flex gx-2" controlId="formBasicDobAndGender">
                    <input type="date" name="DOB" max={day} id="DOB" autoComplete="street-address" className="mt-1 mr-2  px-3
   
     py-1.5 w-100 h-10 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                    <select name="gender" className="form-select appearance-none
      
      w-100
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                      <option value="1" selected disabled>Enter Your Gender</option>
                      <option value="male" >Male</option>
                      <option value="female">Female</option>
                    </select>
                    <select name="level" class="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                      <option value="1" selected>Enter Your level</option>
                      {schoolClasses.map((theClass, index) => {
                        return (
                          <option value={theClass} >{theClass}</option>
                        )
                      })}
                    </select>
                  </Form.Group>


                  <Button variant="primary" type="submit" className="col-12 registerBtn text-light p-3 rounded hover:opacity-95 transtion myFormBtn">
                    Register Now
                  </Button>
                </Form>
              </Tab>
              {/* Tab2 **************************************************************/}
              <Tab className="col-12 font-bold " eventKey="profile" title="Login">
                <Form className="col-12" onChange={onChangeHandlerLogin} >
                  <Form.Group className="my-4" controlId="Email">
                    <Form.Control type="email" placeholder="Enter email" className="py-3" name="email"/>
                  </Form.Group>

                  <Form.Group className="my-4" controlId="Password">
                    <Form.Control type="password" placeholder="Password" className="py-3" name="password"/>
                  </Form.Group>
                  {
                    errLogin==="log in was unSuccessful" ? <div className="text-danger border-2 p-3 border-danger animate__animated animate__bounce animate__delay-.7s animate__repeat-3" > log in was unSuccessful</div> : null 
                  }
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="Student"
                        name="role"
                        type={type}
                        value="student"
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="Teacher"
                        name="role"
                        type={type}
                        value="teacher"
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="Admin "
                        name="role"
                        type={type}
                        value="admin"
                        id={`inline-${type}-3`}
                      />
                    </div>
                  ))}


                  <Button onClick={submitHandlerLogin} variant="primary"  className="col-12 registerBtn text-light p-3 rounded hover:opacity-95 transtion myFormBtn">
                    Login Now
                  </Button>
                </Form>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
