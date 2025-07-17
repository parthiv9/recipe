import React from "react";
import Insta1 from "../../assets/img/bg-img/insta1.jpg";
import Insta2 from "../../assets/img/bg-img/insta2.jpg";
import Insta3 from "../../assets/img/bg-img/insta3.jpg";
import Insta4 from "../../assets/img/bg-img/insta4.jpg";
import Insta5 from "../../assets/img/bg-img/insta5.jpg";
import Insta6 from "../../assets/img/bg-img/insta6.jpg";
import Insta7 from "../../assets/img/bg-img/insta7.jpg";
import Logo from "../../assets/img/core-img/logo.png";

const Footer = () => {
  return (
    <>
      <div className="follow-us-instagram">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h5>Follow Us Instragram</h5>
            </div>
          </div>
        </div>

        <div className="insta-feeds d-flex flex-wrap">
          <div className="single-insta-feeds">
            <img src={Insta1} alt="" />
            <div className="insta-icon">
              <a href="#!">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div className="single-insta-feeds">
            <img src={Insta2} alt="" />
            <div className="insta-icon">
              <a href="#!">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div className="single-insta-feeds">
            <img src={Insta3} alt="" />
            <div className="insta-icon">
              <a href="#!">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div className="single-insta-feeds">
            <img src={Insta4} alt="" />
            <div className="insta-icon">
              <a href="#!">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div className="single-insta-feeds">
            <img src={Insta5} alt="" />
            <div className="insta-icon">
              <a href="#!">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div className="single-insta-feeds">
            <img src={Insta6} alt="" />
            <div className="insta-icon">
              <a href="#!">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div className="single-insta-feeds">
            <img src={Insta7} alt="" />
            <div className="insta-icon">
              <a href="#!">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer-area">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-12 h-100 d-flex flex-wrap align-items-center justify-content-between">
              <div className="footer-social-info text-right">
                <a href="#!">
                  <i className="fa fa-pinterest" aria-hidden="true"></i>
                </a>
                <a href="#!">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="#!">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="#!">
                  <i className="fa fa-dribbble" aria-hidden="true"></i>
                </a>
                <a href="#!">
                  <i className="fa fa-behance" aria-hidden="true"></i>
                </a>
                <a href="#!">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </div>
              <div className="footer-logo">
                <a href="/">
                  <img src={Logo} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
