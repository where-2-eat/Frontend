import React, { useState } from "react";
import { User } from "../../util/types";
import { ConfigType } from "../../config";
import "./Login.css";
import { authenticate, createUser } from "../../util/requests";

// TODO: Add this in a seperate type file
type LoginProps = {
  context: ConfigType;
  setUser: (user: User) => void;
};

export type Error = {
  message: string;
  type: "firstName" | "lastName" | "email" | "password" | "";
};

const Login: React.FC<LoginProps> = ({ context, setUser }) => {
  // State to handle user inputs
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<Error>({ message: "", type: "" });

  // State to handle panel sliding between sign up/login
  const [panelAnimation, setPanelAnimation] = useState<string>("container");

  // Function to handle sliding between sign up and login containers
  const handleSlide = () => {
    resetState();
    panelAnimation === "container"
      ? setPanelAnimation("container right-panel-active")
      : setPanelAnimation("container");
  };

  // Function to reset the state
  const resetState = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setError({ message: "", type: "" });
  };

  // Function to store user inputs in state
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    target: string
  ) => {
    switch (target) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        break;
      default:
    }
  };

  // For now we will use these functions which "authenticate" a dumby user for now
  const handleOnLogin = () => {
    // Fake Data
    setUser({
      email: "test user",
      firstName: "test firstName",
      lastName: "test lastName",
      password: "test password",
      signUpDate: "now",
      jwt: "jwt"
    });

    //TODO: uncomment this request
    // authenticate(context, { email, password })
    //   .then(setUser)
    //   .catch((error: Error) => {
    //     setError(error);
    //   });
  };

  const handleOnSignUp = () => {
    // Fake data
    setUser({
      email: "test user",
      firstName: "test firstName",
      lastName: "test lastName",
      password: "test password",
      signUpDate: "now",
      jwt: "jwt"
    });

    //TODO: uncomment this request
    // createUser(context, { firstName, lastName, email, password })
    //   .then(setUser)
    //   .catch((error: Error) => {
    //     setError(error);
    //   });
  };

  return (
    <div className="SignIn">
      <div className={panelAnimation} id="container">
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={handleOnSignUp}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <div className="user-inputs">
              <div className="wrapper">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={event => handleChange(event, "firstName")}
                  required
                />
                {error.type === "firstName" && (
                  <label className="error">{error.message}</label>
                )}
              </div>
              <div className="wrapper">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={event => handleChange(event, "lastName")}
                  required
                />
                {error.type === "lastName" && (
                  <label className="error">{error.message}</label>
                )}
              </div>
              <div className="wrapper">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={event => handleChange(event, "email")}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                />
                {error.type === "email" && (
                  <label className="error">{error.message}</label>
                )}
              </div>
              <div className="wrapper">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={event => handleChange(event, "password")}
                  required
                />
                {error.type === "password" && (
                  <label className="error">{error.message}</label>
                )}
              </div>
            </div>
            <input type="submit" className="button" value="Submit" />
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" onSubmit={handleOnLogin}>
            <h1>Sign in</h1>
            <span>or use your account</span>
            <div className="user-inputs">
              <div className="wrapper">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={event => handleChange(event, "email")}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                />
                {error.type === "email" && (
                  <label className="error">{error.message}</label>
                )}
              </div>
              <div className="wrapper">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={event => handleChange(event, "password")}
                  required
                />
                {error.type === "password" && (
                  <label className="error">{error.message}</label>
                )}
              </div>
            </div>
            <input type="submit" className="button" value="Submit" />
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p className="sentence">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="button ghost"
                id="signIn"
                onClick={handleSlide}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p className="sentence">
                Enter your personal details and start journey with us
              </p>
              <button
                className="button ghost"
                id="signUp"
                onClick={handleSlide}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;