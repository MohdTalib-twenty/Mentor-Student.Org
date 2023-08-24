import React, { useState } from "react";
import { NavLink ,json,useNavigate} from "react-router-dom";
import {BiSolidLogInCircle} from 'react-icons/bi'
import {toast} from 'react-toastify'
import "./screens.css";
export default function LogIn() {
  const navigate=useNavigate();
  const [name,setName]=useState("")
  const [email,setEmail]=useState('U');
  const handleSubmit = async () => {
    var res = await fetch("http://localhost:7000/login", {
      method: "post",
      body: JSON.stringify({name,email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    res = await res.json();
    if(res.success){
        toast.success(res.message);
        localStorage.setItem("User",JSON.stringify(res.user));
        localStorage.setItem("token", JSON.stringify(res.token));
        navigate('/');
    }else{
        toast.warning(res.message)
    }
  };
  return (
    <>
      <div className="login" style={{ backgroundColor: "#55b994" }}>
        
        <section className="login">
          <div className="container  mt-5">
            <div
              className="row d-flex justify-content-center align-items-center "
              style={{ marginTop: "200px" }}
            >
             
              <div className="  col-6 ">
                <div
                  className="card shadow-2-strong"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <h3 className="mt-3"><span className="fw-bold mx-2"><BiSolidLogInCircle/></span>LOG IN</h3>
                    <hr className="mx-auto  w-25"></hr>
                    <div className="form-outline mt-4 mb-4">
                      <input
                        type="email"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                      />
                    </div>
                    {/* Checkbox */}
                    <button
                      className="btn bg-success text-white btn-lg btn-block"
                      type="submit"
                     onClick={handleSubmit}
                    >
                      Login
                    </button>
                    <p className="mt-4 fw-bold fs-5">
                      Don't have an Account? <a href="/signup">SignUp</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
       
        <div className="copyright_main ">
          <div className="container mt-4">
            <p className="copy_text text-center fw-bold text-white">
              © Mini Twitter.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
