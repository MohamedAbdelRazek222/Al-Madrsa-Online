import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/logoE.png";
export default function Footer() {
    return (
        <>
            <section className="footerSection primary-color py-5 bg-light text-muted">
                <div className="container">
                    <div className="row">
                        <div className="col col-md-3 text-center mb-4 flex-column justify-content-center text-md-start">
                            <img className="h-30 " src={logo} alt="logoE" />
                            <p className="lead mt-5 fs-4">
                                Improve Your Online Learning Experience Better
                                Instantly
                            </p>
                        </div>
                        <div className="col col-md-3 text-center mb-4">
                            <h3 className="lead fw-bold">Quik Link</h3>
                            <Link
                                className="text-decoration-none d-block text-reset fw-noemal fs-6 my-3"
                                href=""
                            >
                                Cources
                            </Link>
                            <Link
                                className="text-decoration-none d-block text-reset fw-noemal fs-6 my-3"
                                href=""
                            >
                                About Us
                            </Link>
                            <Link
                                className="text-decoration-none d-block text-reset fw-noemal fs-6 my-3"
                                href=""
                            >
                                Contact Us
                            </Link>
                        </div>
                        <div className="col col-md-3 text-center mb-4">
                            <h3 className="lead fw-bold">Help Center</h3>
                            <Link
                                className="text-decoration-none d-block text-reset fw-noemal fs-6 my-3"
                                href=""
                            >
                                Support
                            </Link>
                            <Link
                                className="text-decoration-none d-block text-reset fw-noemal fs-6 my-3"
                                href=""
                            >
                                Get Help
                            </Link>
                            <Link
                                className="text-decoration-none d-block text-reset fw-noemal fs-6 my-3"
                                href=""
                            >
                                Privacy
                            </Link>
                        </div>
                        <div className="col col-md-3 text-center mb-4">
                            <h3 className="lead fw-bold">Contact Info</h3>
                            <p>Call Us:111-25520-2044-5444-111</p>
                            <p>
                                Address +7011 Vermont Ave ,Los Angeles CA 90044
                            </p>
                            <p>Mail Us :hello@online.com</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
