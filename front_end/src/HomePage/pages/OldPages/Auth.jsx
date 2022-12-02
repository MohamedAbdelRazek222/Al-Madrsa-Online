import React from "react";
// import banner from "./../assets/register.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AuthBanner from "./AuthBanner";

export default function Auth() {
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
               
              <Form className="col-12">
              <Form.Group className="my-4" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter firt Name" className="py-3"/>
              </Form.Group>

              <Form.Group className="my-4" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter last Name" className="py-3"/>
              </Form.Group>

              <Form.Group className="my-4" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" className="py-3"/>
              </Form.Group>

              <Form.Group className="my-4" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" className="py-3"/>
              </Form.Group>              
    
              <Button variant="primary" type="submit" className="col-12 registerBtn text-light p-3 rounded hover:opacity-95 transtion myFormBtn">
                Register Now
              </Button>
            </Form>
              </Tab>
               {/* Tab2 */}
              <Tab className="col-12 font-bold " eventKey="profile" title="Login">
              <Form className="col-12">
              <Form.Group className="my-4" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" className="py-3"/>
              </Form.Group>

              <Form.Group className="my-4" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" className="py-3"/>
              </Form.Group>              

              <Button variant="primary" type="submit" className="col-12 registerBtn text-light p-3 rounded hover:opacity-95 transtion myFormBtn">
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
