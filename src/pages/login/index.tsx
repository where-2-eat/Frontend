import React, { useState } from "react";
import "./Login.css";
import { SystemUser_ } from "../../util/models";
import { FormError } from "../../util/types";
import { authenticate, createUser } from "../../util/requests/auth";
import { ConfigType } from "../../config";

/** TODO remove this when backend implemented */
const dummyUser: SystemUser_ = {
  userId: "",
  firstName: "",
  lastName: "",
  jwt: "",
  loginInformation: {
    userName: ""
  },
  userPreferences: {
    foodRestriction: [],
    restaurantType: []
  }
};

type LoginFormError = "firstName" | "lastName" | "email" | "password" | "";
type LoginProps = {
  config: ConfigType;
  setUser: (user: SystemUser_) => void;
};

const Login: React.FC<LoginProps> = ({ config, setUser }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<FormError<LoginFormError>>({
    message: "",
    type: ""
  });

  const [panelAnimation, setPanelAnimation] = useState<string>("container");

  const handleSlide = () => {
    resetState();
    panelAnimation === "container"
      ? setPanelAnimation("container right-panel-active")
      : setPanelAnimation("container");
  };

  const resetState = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setError({ message: "", type: "" });
  };

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

  const handleOnLogin = () => {
    authenticate(config, { userName: email, password })
      .then(setUser)
      .catch((error: Error) => {
        console.log(error);
        setError({ message: error.message, type: "" });
      })

      /** TODO remove this when backend implemented */
      .finally(() => setUser(dummyUser));
  };

  const handleOnSignUp = () => {
    createUser(config, {
      firstName,
      lastName,
      loginInformation: { userName: email, password },
      /* TODO add foodRestriction & restaurantType */
      userPreferences: { foodRestriction: [], restaurantType: [] }
    })
      .then(setUser)
      .catch((error: Error) => {
        console.log(error);
        setError({ message: error.message, type: "" });
      })

      /** TODO remove this when backend implemented */
      .finally(() => setUser(dummyUser));
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
