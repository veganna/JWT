import React, { useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPost } from "../../config/api";
import "./index.css";

const RegisterPage = () => {
  //this is the body request
  const [body, setBody] = useState({
    "email": null,
    "first_name": null,
    "last_name": null,
    "role": null,
    "user_city": null,
    "password": null,
  })

  //this is the password confirmation
  const [confirmPassword, setConfirmPassword] = useState(null);

  //this is the API call user create user function
  const registerUser = async (e) => {
    e.preventDefault()

    //if any of the fields are empty, show error toasr
    if (!body["email"] || !body["password"] || !body["first_name"] || !body["last_name"] || !body["user_city"] || !body["role"]) {
      toast.error("Please fill in all fields!")
      return;
    } 

    //if password and confirm password are not the same return error message
    if (body["password"] !== confirmPassword) {
      toast.error("Passwords do not match!")
      return;
    }

    //if password is less than 8 characters, return error message
    if (body["password"].length < 8) {
      toast.error("Password must be at least 8 characters long!")
      return;
    }

    try{
      //call the api to create the user
      const response = await fetchPost("/register/", body)

      //check the response status 200 : success, 400 : user exists, 500 : server error
      //if success, show success toast and redirect to login page
      if (response.status === 200) {
        //stop per 3 seconds
        toast.success("User created successfully! We will redirect you to the login page soon.")
        setTimeout(() => {
          window.location.href = "/login"
        }, 5000)
        return;
      }
      //if user exists, show error toast
      if (response.status === 400) {
        toast.error("User already exists!")
        return;
      }
      //if server error, show error toast
      toast.error("Something went wrong, please try again later!")
      
    }catch(error){
      //if error, show error toast
      console.error(error)
      toast.error("Registration failed, please try again later!")
      return;
    }
  }

  return (
    <div className="container">
      <div>
        <h1>Registration Form</h1>
      </div>

      <form className="form" onSubmit={(e) => registerUser(e)}>
        <div className={"inputField"}>
          <label htmlFor="email">
            Email:{" "}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={body["email"]}
            onChange={(e) => setBody({...body, email: e.target.value})}
          />
        </div>

        <div className={"inputField"}>
          <label htmlFor="first_name">
            First Name:{" "}
          </label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              value={body["first_name"]}
              onChange={(e) => setBody({...body, first_name: e.target.value})}
            />
        </div>
 
        <div className={"inputField"}>
          <label htmlFor="last_name">
            Last Name:{" "}
          </label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              value={body["last_name"]}
              onChange={(e) => setBody({...body, last_name: e.target.value})}
            />
        </div>

        <div className={"inputField"}>
          <label htmlFor="city">
            Closest City:{" "}
          </label>
            <select id="city" name="user_city" value={body["user_city"]} onChange={(e) => setBody({...body, user_city: e.target.value})}>
              <option value="">Choose Your Closest City</option>
              <option value="Boston">Boston</option>
              <option value="Sacramento">Sacramento</option>
              <option value="London">London</option>
              <option value="Beijing">Beijing</option>
              <option value="Lima">Lima</option>
            </select>
        </div>
 
        <div className={"inputField"}>
          <label htmlFor="password">
            Password:{" "}
          </label>
            <input
              id="password"
              type="password"
              name="password"
              value={body["password"]}
              onChange={(e) => setBody({...body, password: e.target.value})}
            />
        </div>

        <div className={"inputField"}>
          <label htmlFor="confirm_password">
            Confirm Password:{" "}
          </label>
            <input
              id = "confirm_password"
              type="password"
              name="password2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </div>

        <div className={"inputField"}>
          <label htmlFor="role">
            Role:{" "}
          </label>
            <select id="role" onChange={(e) => setBody({...body, role: e.target.value})} value={body["role"]} name="role">
              <option value="">Choose Your Role</option>
              <option value="THERAPIST">Therapist</option>
              <option value="CLIENT">Client</option>
            </select>
        </div>
        <button type="submit">Register!</button>
      </form>
      <ToastContainer />

    </div>
  );
};

export default RegisterPage;
