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

  // State to handle panel sliding between sign up/login
  const [panelAnimation, setPanelAnimation] = useState<string>("container");

  // Function to handle sliding between sign up and login containers
  const handleSlide = () => {
    panelAnimation === "container"
      ? setPanelAnimation("container right-panel-active")
      : setPanelAnimation("container");
  };

  // Function to update the state when an email is inputed
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = event;
    setEmail(value);
  };

  // Function to update the state when an password is inputed
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = event;
    setPassword(value);
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

  // TODO: uncomment this when authentication API is done
  // const handleOnLogin = (
  //   event: React.MouseEvent<Element, MouseEvent>
  // ): void => {
  //   authenticate(context, { email, password })
  //     .then(setUser)
  //     .catch(console.log);
  // };
  // const handleOnSignUp = (
  //   event: React.MouseEvent<Element, MouseEvent>
  // ): void => {
  //   createUser(context, { email, username, password })
  //     .then(setUser)
  //     .catch(console.log);
  // };

  return (
    <div className="SignIn">
      <div className={panelAnimation} id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={handleOnSignUp}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              onChange={handleEmail}
              value={email}
              placeholder="Email"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
              value={password}
            />
            <a href="#">Forgot your password?</a>
            <button onClick={handleOnLogin}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p className="sentence">
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={handleSlide}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p className="sentence">
                Enter your personal details and start journey with us
              </p>
              <button className="ghost" id="signUp" onClick={handleSlide}>
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
