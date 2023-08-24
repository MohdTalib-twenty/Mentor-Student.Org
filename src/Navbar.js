import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function Navbar() {
  const Navigate=useNavigate();
  const [auth, setAuth] = useState();
  useEffect(() => {
    var res = localStorage.getItem("User");
    if (res) {
      res = JSON.parse(localStorage.getItem("User"));
      setAuth(res);
    }
    //eslint-disable-next-line
  }, []);

  const handleLogout=()=>{
    localStorage.removeItem("User");
    Navigate("/")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand fs-3 fw-bold text-center" href="/">
            Mentor-Student.Org
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {auth ? (
                <>
                  <li className="nav-item mx-3">
                    <Link className="nav-link fw-bold fs-4 active" onClick={handleLogout} to="#">
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-3">
                    <Link className="nav-link fw-bold fs-4 active" to="/login">
                      LogIn
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
