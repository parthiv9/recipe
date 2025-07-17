import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ClassyNav = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const [menuOn, setMenuOn] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(null);
  const location = useLocation();

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 991);
  };

  const handleScroll = () => {
    setSticky(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSubmenu = (index) => {
    setDropdownActive(dropdownActive === index ? null : index);
  };

  return (
    <div
      className={`classy-nav-container light left ${
        isMobile ? "breakpoint-on" : "breakpoint-off"
      } ${sticky ? "classy-sticky" : ""}`}
    >
      <div className="classy-navbar">
        <button
          className={`classy-navbar-toggler ${menuOn ? "active" : ""}`}
          onClick={() => setMenuOn(!menuOn)}
        >
          <span className="navbarToggler">☰</span>
        </button>
        <div className={`classy-menu ${menuOn ? "menu-on" : ""}`}>
          <button className="classycloseIcon" onClick={() => setMenuOn(false)}>
            ×
          </button>
          <ul className="classynav">
            {React.Children.map(children, (child, index) => (
              <li
                className={
                  child.props.children ? "has-down cn-dropdown-item" : ""
                }
              >
                {child.props.link}
                {child.props.children && (
                  <>
                    <span
                      className="dd-trigger"
                      onClick={() => toggleSubmenu(index)}
                    ></span>
                    <ul
                      style={{
                        display: dropdownActive === index ? "block" : "none",
                      }}
                    >
                      {child.props.children}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassyNav;
