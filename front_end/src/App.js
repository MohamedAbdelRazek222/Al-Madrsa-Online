import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Sidebar, ThemeSettings } from "./Dashboard/components";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
  Line,
  Teachers,
} from "./Dashboard/pages";
import { useStateContext } from "./Dashboard/contetxts/ContextProvider";
import "./App.css";
import { useDispatch, useSelector } from 'react-redux';

import Parent from './Dashboard/pages/parent dashboard/Parent';
import ShowChildren from './Dashboard/pages/parent dashboard/ParentComponents/ShowChildren';
import EditParent from './Dashboard/pages/parent dashboard/ParentComponents/EditParent';
import CreateParent from './Dashboard/pages/parent dashboard/ParentComponents/CreateParent';
import ShowParent from './Dashboard/pages/parent dashboard/ParentComponents/ShowParent';
import ShowStudent from './Dashboard/pages/parent dashboard/ParentComponents/ShowStudent';
import AdminCreate from './Dashboard/pages/admin dashboard/AdminCreate';

// ========================== Home Page ===================
import TheNavbar from "./HomePage/components/TheNavbar";
import Footer from "./HomePage/components/Footer";
import Home from "./HomePage/pages/Home/Home";
import About from "./HomePage/pages/About/About";
import Contact from "./HomePage/pages/Contact/Contact";
import AllCourses from "./HomePage/pages/Courses/AllCourses";
import CourseDetails from "./HomePage/pages/Courses/CourseDetails"
import Auth from "./HomePage/pages/Register/Auth";
import AdminViewCourses from "./Dashboard/pages/admin dashboard/AdminViewCourses";
import AdminDashbord from './Dashboard/pages/admin dashboard/AdminDashbord';
import Attendance from './Dashboard/pages/student dashboard/components/Attendance/Attendance';
import StudentDashbord from './Dashboard/pages/StudentDashbord';
import TeacherAttendance from './Dashboard/pages/Teacher dashborad/TeacherAttendance';
import TeacherAttendanceReport from './Dashboard/pages/Teacher dashborad/TeacherAttendanceReport';
import Teacher from "./Dashboard/pages/Teacher dashborad/Teacher";
import TeacherStudents from './Dashboard/pages/Teacher dashborad/TeacherStudents';
import TeacherCourses from './Dashboard/pages/Teacher dashborad/TeacherCourses';
import TeacherMeetings from './Dashboard/pages/Teacher dashborad/TeacherMeetings';
import TeacherExams from './Dashboard/pages/Teacher dashborad/TeacherExams';
import Navigation from './Dashboard/pages/student dashboard/components/Navigation';
import Profile from './Dashboard/pages/student dashboard/components/Profile/Profile';
import Exams from './Dashboard/pages/student dashboard/components/Exams/Exams';
import Meetings from './Dashboard/pages/student dashboard/components/Meetings/Meetings';
import Matirals from './Dashboard/pages/student dashboard/components/Matirals/Matirals';
import Courses from './HomePage/pages/Home/Courses';
import MyCourses from "./HomePage/pages/Home/MCourses";
import Details from "./Dashboard/pages/admin dashboard/Details";
import AdminCourses from './Dashboard/pages/admin dashboard/AdminCourses';
import AdminTeacher from './Dashboard/pages/admin dashboard/AdminTeacher';
import CreateTeacherAttendance from "./Dashboard/pages/Teacher dashborad/CreateTeacherAttendance.jsx";
import ShowTeacher from './Dashboard/pages/Teacher dashborad/ShowTeacher';
import ViewTeacherAttendance from "./Dashboard/pages/Teacher dashborad/ViewTeacherAttendance";

function App() {
  // const { activeMenu } = useStateContext();
  const { StudentProfile } = useSelector(state => state.Studentcontx);
  const booksProps = useSelector(state => state.booksList);

  return (
    <div>
      <BrowserRouter>
        {/* <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                style={{ background: "blue", borderRadius: "50%" }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? "md:ml-72" : "flex-2"
              }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              <Routes>
               
                <Route path="/" element={<Ecommerce />} />
                <Route path="/CreateTeacher" element={<AdminCreate />} />

                
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees {...booksProps} />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/Parent" element={<Parent />}>
                  <Route path="/Parent/show" element={<ShowParent />} />
                  <Route path="/Parent/edit" element={<EditParent />} />
                  <Route path="/Parent/Create" element={<CreateParent />} />
                  <Route path="/Parent/child" element={<ShowChildren />} />
                  <Route path="/Parent/child/show" element={<ShowStudent />} />
                  <Route path="/Parent/child/edit" element={<ShowStudent />} />
                </Route>
                

                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>
          </div>
        </div> */}

        {/* =============== Home page ============== */}
        <TheNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/course-details" element={<CourseDetails />} />
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/auth" element={<Auth />} />
          <Route path="/AdminDashboard" element={<AdminDashbord/>}>
                <Route path="/AdminDashboard/" element={<StudentDashbord/>}/>
                <Route path="/AdminDashboard/teachers" element={<Teachers/>}/>
                <Route path="/AdminDashboard/courses" element={<AdminViewCourses/>}/>
                <Route path="/AdminDashboard/attendance" element={<TeacherAttendance/>}/>
                <Route path="/AdminDashboard/students" element={<StudentDashbord/>}/>
          </Route>
          <Route path="/teacher" element={<Teacher/>}>
          {/* <Route path="/teacher/" element={<Teacher/>}/>     */}
          <Route path="/teacher/students" element={<TeacherStudents/>}/>
                {/* <Route path="/teacher/courses" element={<TeacherCourses/>}/> */}
                <Route path="/teacher/meetings" element={<Calendar/>}/>
                <Route path="/teacher/CreateTeacherAttendance" element={<CreateTeacherAttendance/>}/>
                <Route path="/teacher/showTeacherAttendance" element={<TeacherAttendance/>}/>
                <Route path="/teacher/attendance" element={<TeacherAttendanceReport/>}/>
                <Route path="/teacher/exams" element={<TeacherExams/>}/>
          </Route>
            <Route path="/studentDetails/:id" element={<Details/>}/>
            <Route path="/Report/:id" element={<ViewTeacherAttendance/>}/>
            <Route path="/adminCourse/:id" element={<AdminCourses/>}/>
            <Route path="/teacherDetails/:id" element={<AdminTeacher/>}/>
          <Route path="/student" element={<Navigation/>}>
          <Route path="/student/" element={<Profile/>}/>
            <Route path="/student/profile" element={<Profile/>}/>
                <Route path="/student/calender" element={<Calendar/>}/>
                <Route path="/student/courses" element={<MyCourses/>}/>
                <Route path="/student/all-courses" element={<Courses/>}></Route>
                <Route  path="/student/all-courses/course-details" element={<CourseDetails/>}></Route>
                <Route path="/student/exams" element={<Exams/>}/>
                <Route path="/student/meetings" element={<Meetings/>}/>
                <Route path="/student/matirals" element={<Matirals/>}/>
                {/* <Route path="/student/attendance" element={<TeacherAttendance/>}/> */}
          </Route>
        </Routes>
       

        
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
