import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../assets/img/core-img/logo.png";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Receipies",
    path: "/all-recipes",
  },
  {
    label: "Saved",
    path: "/saved",
  },
  {
    label: "Contact",
    path: "/contact-us",
  },
  {
    label: "About us",
    path: "/about",
  }
];

const renderDropdown = (
  items,
  activeDropdown,
  setActiveDropdown,
  parentIndex = ""
) => {
  return (
    <ul className="dropdown">
      {items.map((item, i) => {
        const index = parentIndex === "" ? i : `${parentIndex}-${i}`;
        const hasSubDropdown = item.dropdown && item.dropdown.length > 0;
        return (
          <li key={index} className={hasSubDropdown ? "has-down" : ""}>
            {hasSubDropdown ? (
              <>
                <button
                  className="nav-btn"
                  onClick={() =>
                    setActiveDropdown((prev) => (prev === index ? null : index))
                  }
                >
                  {item.label}
                  <span className="dd-trigger"></span>
                </button>
                <ul
                  className="dropdown"
                  style={{
                    display: activeDropdown === index ? "block" : "none",
                  }}
                >
                  {renderDropdown(
                    item.dropdown,
                    activeDropdown,
                    setActiveDropdown,
                    index
                  )}
                </ul>
              </>
            ) : (
              <Link to={item.path || "#!"}>{item.label}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSticky, setSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sticky Nav on Scroll
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`header-area classy-nav-container ${isMobile ? "breakpoint-on" : "breakpoint-off"
          } ${isSticky ? "classy-sticky" : ""}`}
      >
        {/* Navbar */}
        <div className="delicious-main-menu">
          <div className="classy-nav-container breakpoint-off">
            <div className="container">
              <nav
                className="classy-navbar justify-content-between"
                id="deliciousNav"
              >
                {/* Logo */}
                <Link className="nav-brand" to="/">
                  <img src={Logo} alt="Logo" />
                </Link>

                {/* Mobile Toggle */}
                <div className="classy-navbar-toggler" onClick={toggleMenu}>
                  <span className={`navbarToggler ${menuOpen ? "active" : ""}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>

                {/* Main Menu */}
                <div className={`classy-menu ${menuOpen ? "menu-on" : ""}`}>
                  {/* Close Button */}
                  <div
                    className="classycloseIcon"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="cross-wrap">
                      <span className="top"></span>
                      <span className="bottom"></span>
                    </div>
                  </div>

                  <div className="classynav">
                    <ul>
                      {navItems.map((item, index) => {
                        const isActive =
                          item.path && location.pathname === item.path
                            ? "active"
                            : "";

                        if (item.dropdown) {
                          const isOpen = activeDropdown === index;
                          return (
                            <li
                              key={index}
                              className={`cn-dropdown-item has-down ${isOpen ? "active" : ""
                                }`}
                            >
                              <button
                                className="nav-btn"
                                onClick={() =>
                                  setActiveDropdown((prev) =>
                                    prev === index ? null : index
                                  )
                                }
                              >
                                {item.label}
                                <span className="dd-trigger"></span>
                              </button>
                              <ul
                                className="dropdown"
                                style={{ display: isOpen ? "block" : "none" }}
                              >
                                {renderDropdown(
                                  item.dropdown,
                                  activeDropdown,
                                  setActiveDropdown,
                                  String(index)
                                )}
                              </ul>
                            </li>
                          );
                        } else if (item.megamenu) {
                          return (
                            <li key={index} className="megamenu-item">
                              <a href="#!">{item.label}</a>
                              <div className="megamenu">
                                <ul className="single-mega cn-col-4">
                                  <li className="title">Category</li>
                                  <li>
                                    <Link to="/">Home</Link>
                                  </li>
                                  <li>
                                    <Link to="/about">About Us</Link>
                                  </li>
                                  <li>
                                    <Link to="/blog-post">Blog Post</Link>
                                  </li>
                                  <li>
                                    <Link to="/receipe-post">Receipe Post</Link>
                                  </li>
                                  <li>
                                    <Link to="/contact">Contact</Link>
                                  </li>
                                  <li>
                                    <Link to="/elements">Elements</Link>
                                  </li>
                                </ul>
                                <ul className="single-mega cn-col-4">
                                  <li className="title">Category</li>
                                  <li>
                                    <Link to="/">Home</Link>
                                  </li>
                                  <li>
                                    <Link to="/about">About Us</Link>
                                  </li>
                                  <li>
                                    <Link to="/blog-post">Blog Post</Link>
                                  </li>
                                  <li>
                                    <Link to="/receipe-post">Receipe Post</Link>
                                  </li>
                                  <li>
                                    <Link to="/contact">Contact</Link>
                                  </li>
                                  <li>
                                    <Link to="/elements">Elements</Link>
                                  </li>
                                </ul>
                                <ul className="single-mega cn-col-4">
                                  <li className="title">Category</li>
                                  <li>
                                    <Link to="/">Home</Link>
                                  </li>
                                  <li>
                                    <Link to="/about">About Us</Link>
                                  </li>
                                  <li>
                                    <Link to="/blog-post">Blog Post</Link>
                                  </li>
                                  <li>
                                    <Link to="/receipe-post">Receipe Post</Link>
                                  </li>
                                  <li>
                                    <Link to="/contact">Contact</Link>
                                  </li>
                                  <li>
                                    <Link to="/elements">Elements</Link>
                                  </li>
                                </ul>
                                <div className="single-mega cn-col-4">
                                  <div className="receipe-slider owl-carousel">
                                    <a href="#!">
                                      <img src="/img/bg-img/bg1.jpg" alt="" />
                                    </a>
                                    <a href="#!">
                                      <img src="/img/bg-img/bg6.jpg" alt="" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        } else {
                          return (
                            <li key={index} className={isActive}>
                              <Link to={item.path}>{item.label}</Link>
                            </li>
                          );
                        }
                      })}
                    </ul>
                    <div className="user-btn ms-3">
                      {user ? (
                        <button onClick={handleLogout} className="btn btn-sm btn-outline-danger rounded-pill">
                          <i className="fa fa-sign-out me-1"></i> Logout
                        </button>
                      ) : (
                        <Link to="/login" className="btn btn-sm btn-outline-dark rounded-pill">
                          <i className="fa fa-user me-1"></i> Login
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
