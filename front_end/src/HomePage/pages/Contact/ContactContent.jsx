import React from "react";

export default function ContactContent() {
  return (
    <div>
      <div className=" z-depth-1">
        {/* Section: Content */}
        <section className=" myContact">
          <div className="rgba-black-strong rounded p-5">
            {/*  Section heading  */}
            {/* <h3 className="text-center fw-bold text-white mt-3 mb-5">
              Contact Us
            </h3> */}

            <form className="mx-md-5 py-5" action="">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="card">
                    <div className="card-body px-4">
                      {/* Name  */}
                      <div className="md-form md-outline my-5">
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Your Name"
                        />
                      </div>
                      {/* Email */}
                      <div className="md-form md-outline my-5">
                        <input
                          type="text"
                          id="email"
                          className="form-control"
                          placeholder="Your Email Address"
                        />
                      </div>
                      {/* Message */}
                      <div className="md-form md-outline my-5">
                        <textarea
                          id="message"
                          className="md-textarea form-control"
                          rows="3"
                          placeholder="Your Message"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary contact-btn btn-block"
                      >
                        Submit inquiry
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-5 fs-5 mt-md-4 mb-4 text-white">
                  <h5 className="fw-bold">Address</h5>
                  <p className="mb-0">1632 Main Street</p>
                  <p className="mb-0">New York, 94126</p>
                  <p className="mb-4 pb-2">United States</p>

                  <h5 className="fw-bold">Phone</h5>
                  <p className="mb-4 pb-2">+ 01 234 567 89</p>

                  <h5 className="fw-bold">Email</h5>
                  <p>info@gmail.com</p>
                </div>
              </div>
            </form>
          </div>
        </section>
        {/* Section: Content */}
      </div>
    </div>
  );
}
