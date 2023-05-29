import React from "react";
import Header from "../Header/Header";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userInfoContext } from "../../App";

const Login = () => {
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmitForm = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmitData = () => {
    // if both email and password are present
    if (formData.email && formData.password) {
      // const hashedPassword = await bcrypt.hash(formData.password, 10);
      // console.log(hashPassword);

      // tried bcrypt hashing at first so that before sending to backend the password is hashed,
      // but the password was not matching on reactjs and django in bcrypt
      // at last send the raw password! and hashed it in the django
      // will have to research on it how to match hash password both in reactjs and django
      const userLogin = {
        email: formData.email,
        password: formData.password,
      };
      let statusCode;
      //matching user info
      fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      })
        .then(async (res) => {
          statusCode = await res.status;
          return res.json();
        })
        .then((data) => {
          if (statusCode == 200) {
            localStorage.setItem("email", formData.email);
            setUserInfo(formData.email);
            navigate("/");
          } else {
            setErrorMsg(data);
          }
        })
        .catch((e) => console.log(e));
      // console.log(hashedPassword);
      // const new_user_registration = {
      //   user: formData.name,
      //   email: formData.email,
      //   password: hashedPassword,
      // };
      // console.log(new_user_registration);
    } else {
      setErrorMsg("Please provide all info");
    }
  };
  return (
    <div>
      <p className="text-center-design">Login</p>
      <Form onSubmit={handleSubmitForm}>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          onChange={handleChange}
        >
          <Form.Label>Email </Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formPassword"
          onChange={handleChange}
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
          />
        </Form.Group>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <Button variant="primary" type="submit" onClick={handleSubmitData}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
