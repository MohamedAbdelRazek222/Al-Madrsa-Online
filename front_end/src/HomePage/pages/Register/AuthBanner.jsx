import React from 'react'
import { NavLink } from 'react-bootstrap'

export default function AuthBanner() {
  return (
    <div>
      <section className="slideCourseBg blog-details-p">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className=" col-lg-12 text-center">
              <h1 className="text-white font-bold"> Authentaction </h1>
              <p className="text-white link-nav">
                <NavLink className="nav-link d-inline" href="#">
                Home <span className='font-bold fs-5'> .</span>
                </NavLink>
                <span> Authentaction </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
