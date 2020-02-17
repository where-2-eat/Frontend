import React, { useState } from "react";
import { User } from "../../util/types";
import { ConfigType } from "../../config";
import './Login.css';
// import { authenticate } from "../../util/requests";

// TODO: Add this in a seperate type file
type LoginProps = {
  context: ConfigType;
  setUser: (user: User) => void;
};

const Login: React.FC<LoginProps> = ({ context, setUser }) => {
  // State to handle user inputs
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

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
    setUser({
      email: "test user",
      username: "test username",
      signUpDate: "now",
      jwt: "jwt"
    });
  };

  const handleOnSignUp = () => {
    setUser({
      email: "test user",
      username: "test username",
      signUpDate: "now",
      jwt: "jwt"
    });
  };


  return (
    <div className="SignIn">
      <div className={panelAnimation} id="container">
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={handleOnSignUp}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <div className="user-inputs">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={event => handleChange(event, "firstName")}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={event => handleChange(event, "lastName")}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={event => handleChange(event, "email")}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={event => handleChange(event, "password")}
                required
              />
            </div>
            <input type="submit" className="button" value="Submit" />
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" onSubmit={handleOnLogin}>
            <h1>Sign in</h1>
            <span>or use your account</span>
            <div className="user-inputs">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={event => handleChange(event, "email")}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={event => handleChange(event, "password")}
                required
              />
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
              <button className="button ghost" id="signIn" onClick={handleSlide}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p className="sentence">
                Enter your personal details and start journey with us
              </p>
              <button className="button ghost" id="signUp" onClick={handleSlide}>
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
