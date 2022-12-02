import React from "react";
import { useDispatch } from "react-redux";
import {
    createTeacher,
    editTeacher,
    getAllTeachers,
    setTeacherProfile,
} from "../../store/reducer/TeacherSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { getAllclass } from "../../store/reducer/classSlice";

export default function AdminCreate() {
    const navigate = useNavigate();
    const { TeacherData, isAdmin, isUpdated } = useSelector(
        (state) => state.Teachercontx
    );

    const dispatch = useDispatch();
    const { classData } = useSelector((state) => state.classcontx);
    console.log(classData);
    const [data, setData] = useState({});
    const [err, setErr] = useState({});
    const param = useParams();
    const { id } = param;
    useEffect(() => {
        dispatch(getAllTeachers());
        dispatch(getAllclass());
    }, []);
    const TeacherProfile = TeacherData.filter((teacher) => teacher._id === id);

    // -------------------------------------
    const [formValues, setFormValues] = useState(TeacherProfile[0]);

    // handleChange---------------------------------------------

    const handleChange = (e) => {
       const  nameVal=/(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/
       const  emailVal=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
       const  phoneVal=/^01[0125][0-9]{8}$/gm
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        if (e.target.value === "" ) {
            setErr({ ...err, [e.target.name]: `${e.target.name} is required` });
        } else if (e.target.name === "name" && nameVal.test(e.target.value))  {
             
            setErr({
                ...err,
                [e.target.name]: `${e.target.name} is Not Valid`,
            });
        } else if (e.target.name === "email" && emailVal.test(e.target.value) ) {
            setErr({
                ...err,
                [e.target.name]: `${e.target.name} is Not Valid`,
            });
        } else if (e.target.name === "password" && e.target.value.length <8 ) {
            setErr({
                ...err,
                [e.target.name]: `${e.target.name} must be more than 8 letters`,
            });
        } else if (e.target.name === "phone" && phoneVal.test(e.target.value) ) {
            setErr({
                ...err,
                [e.target.name]: `${e.target.name} phone Is In valid `,
            });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
            // setErr({ [e.target.name]: "" });
        }
        console.log("handleChange-------------------------------",formValues);
        console.log("err....",err);
    };
    // save---------------------------------------------
    const save = (e) => {
        e.preventDefault();
        if(Object.keys(err).length === 0){

            console.log("idddddddddddddddddddd",id,"formVlaesssssssss",formValues)
            dispatch(editTeacher({id,data:formValues}));
            console.log("Asxas");
            navigate("/teacherDashboard");
        }
        console.log("not deleted")
    };

    return (
        <>
            <div className="mt-10 sm:mt-0 justify-center">
                <div className="md:grid-8 md:grid-cols-3 md:gap-6 mx-20">
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <h1 className="font-black my-3 text-center">
                            Teacher Profile
                        </h1>
                        <Form
                            className="col-12"
                            onChange={(e) => handleChange(e)}
                        >
                            {console.log(TeacherProfile)}
                            <Form.Group
                                className="my-4"
                                controlId="formBasicName"
                            >
                                <Form.Control
                                    type="text"
                                    defaultValue={TeacherProfile[0]?.name}
                                    placeholder="Enter Your Name"
                                    className="py-3"
                                    name="name"
                                />
                                <p className="text-red-400">{err.name}</p>
                            </Form.Group>
                            <Form.Group
                                className="my-4"
                                controlId="formBasicEmail"
                            >
                                <Form.Control
                                    type="email"
                                    defaultValue={TeacherProfile[0]?.email}
                                    placeholder="Enter Your Email"
                                    className="py-3"
                                    name="email"
                                />
                                <p className="text-red-400">{err.email}</p>
                            </Form.Group>

                            <Form.Group
                                className="my-4"
                                controlId="formBasicPassword"
                            >
                                <Form.Control
                                    type="password"
                                    defaultValue={TeacherProfile[0]?.password}
                                    placeholder="Enter Your Password"
                                    className="py-3"
                                    name="password"
                                />
                                <p className="text-red-400">{err.password}</p>
                            </Form.Group>

                            <Form.Group
                                className="my-4"
                                controlId="formBasicPhone"
                            >
                                <Form.Control
                                    type="text"
                                    defaultValue={TeacherProfile[0]?.phone}
                                    placeholder="Enter Your Phone"
                                    className="py-3"
                                    name="phone"
                                />
                                <p className="text-red-400">{err.phone}</p>
                            </Form.Group>

                            <Form.Group
                                className="my-4 flex gx-2"
                                controlId="formBasicDobAndGender"
                            >
                                <label className="my-4">birth date</label>
                                <input
                                    type="date"
                                    name="DOB"
                                    id="DOB"
                                    defaultValue={
                                        TeacherProfile[0]?.DOB?.split("T")[0]
                                    }
                                    autoComplete="street-address"
                                    className="mt-1 mr-2  w-100 h-10 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {console.log(
                                    TeacherProfile[0]?.DOB?.split("T")[0]
                                )}
                                <p className="text-red-400">{err.DOB}</p>

                                <label className="my-4">
                                    Enter Your Gender
                                </label>
                                <select
                                    name="gender"
                                    defaultValue={TeacherProfile[0]?.gender}
                                    className="form-select appearance-non w-100 px-3 py-1.5 text-base font normal text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    aria-label="Default select example"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <p className="text-red-400">{err.gender}</p>
                            </Form.Group>
                            <Form.Group
                                className="my-4"
                                controlId="formBasicPassword"
                            >
                                <select
                                    name="subject"
                                    className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
            rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    aria-label="Default select example"
                                >
                                    <option 
                                        key={TeacherProfile[0]?.subjects}
                                        value={TeacherProfile[0]?.subjects}
                                        selected
                                    >
                                        {/* {TeacherProfile[0]?.subject.title} */}
                                    </option>
                                    {/* {classData.map((course) => {
                                        if (
                                            course?._id !==
                                            // TeacherProfile[0]?.subject._id
                                        ) {
                                            return (
                                                <option
                                                    key={course._id}
                                                    value={course._id}
                                                >
                                                    {course.title}
                                                </option>
                                            );
                                        }
                                    })} */}
                                </select>
                                <p className="text-red-400">{err.subject}</p>
                            </Form.Group>
                            <Button
                                onClick={(e) => save(e)}
                                variant="primary"
                                type="submit"
                                className="col-5 mr-2 registerBtn text-light p-3 rounded hover:opacity-95 transtion myFormBtn"
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => navigate("/teacherDashboard")}
                                variant="primary"
                                type="submit"
                                className="col-5 registerBtn text-light p-3 rounded hover:opacity-95 transtion myFormBtn"
                            >
                                Back
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}
