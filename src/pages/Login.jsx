import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, userLogOut } from "../store/slices/userinfo.slice";
import "./styles/Login.css"

const Login = () => {
  const { register, handleSubmit, reset } = useForm();

  const { token, 
    user: {firstName, lastName} 
  } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();

  const submit = (data) => {
    dispatch(loginUser(data));
    reset({
      email: "",
      password: "",
    })
  };

  const handleLogOut = () => {
    dispatch(userLogOut())
  }

  return (
    <main className="login">
      {token ? (
        <section className="login_logged_container">
          <i className="login_logged_icon bx bxs-user-circle"></i>
          <h3 className="login_logged_name">{firstName} {lastName}</h3>
          <button className="loggin_logged_btn" onClick={handleLogOut}>Log Out</button>
        </section>
      ) : (

        <form className="login_form_container" onSubmit={handleSubmit(submit)}>
          <h3 className="login_form_title">Welcome! Enter your email and password to continue</h3>

          <div className="login_form_containerTest">
            <h4 className="login_form_titleTest">Test data</h4>
            <div className="login_form_emailTest"><i className="bx bx-envelope">john@gmail.com</i></div>
            <div className="login_form_passwordTest"><i className="bx bx-lock-alt"> john1234</i></div>
          </div>{" "}
          
          <div className="login_form_divInfo">
            <label className="login_form_label" htmlFor="">Email</label>
            <input className="login_fomr_input" type="text" {...register("email")} />
          </div>
          
          <div className="login_form_divInfo">
            <label className="login_form_label" htmlFor="">Password</label>
            <input className="login_fomr_input" type="password" {...register("password")} />
          </div>

          <button className="login_form_btn">Login</button>

          <p className="login_form_footerText">Dont have an account? <span>Sign Up</span></p>
        </form>
      )}
    </main>
  );
};

export default Login;
