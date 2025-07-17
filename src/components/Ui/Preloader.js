import React from "react";
import SaladImg from "../../assets/img/core-img/salad.png";

const Preloader = () => {
  return (
    <div id="preloader">
      <i className="circle-preloader"></i>
      <img src={SaladImg} alt="Loading" />
    </div>
  );
};

export default Preloader;
