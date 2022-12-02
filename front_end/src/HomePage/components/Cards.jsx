import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";

export default function Cards({ cardCom }) {
    // console.log({cardCom});
  const { teacher,endDate, startDate, title, Image_url,price ,_id} = cardCom;
  return (
<div className="col-md-4 col-sm-6 py-2 my-5">
              <Card className="courseCard">
                <Card.Img variant="top" src={Image_url} />
                <Card.Body>
                  <Card.Title className="fw-bold">{title}</Card.Title>
                  <Card.Text>
                Teacher is {teacher?.name}
                </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">
                    Start: {startDate.split("T")[0]} . End: {endDate.split("T")[0]}
                  </Card.Subtitle>
             
                  <NavLink to={`course-details`} state={cardCom} style={{textDecoration:"none"}} className="inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5  hover:text-red-600 hover:border-red-600 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    Details
                  </NavLink>
                  <p className="coursePrice py-2 px-3 text-light">{price} $</p>
                </Card.Body>
              </Card>
            </div>
  );
}
