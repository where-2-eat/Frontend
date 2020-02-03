import React, { useState } from "react";
import { User, LoginOrSignUp } from "../../util/types";
import { ConfigType } from "../../config";
import { authenticate } from "../../util/requests";

type LoginProps = {
  context: ConfigType;
  setUser: (user: User) => void;
  setLoginOrSignUp: (page: LoginOrSignUp) => void;
};

const Login: React.FC<LoginProps> = ({
  context,
  setUser,
  setLoginOrSignUp
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = event;
    setEmail(value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = event;
    setPassword(value);
  };

  const handleOnLogin = (
    event: React.MouseEvent<Element, MouseEvent>
  ): void => {
    authenticate(context, { email, password })
      .then(setUser)
      .catch(console.log);
  };

  return (
    <div>
      <div>
        <input
          name="email"
          placeholder="john@mail.com"
          type="text"
          onChange={handleEmail}
          value={email}
        />
        <input
          name="password"
          placeholder="mypassword"
          type="password"
          onChange={handlePassword}
          value={password}
        />

        <button onClick={handleOnLogin}>Login</button>
      </div>

      <div>
        <button onClick={() => setLoginOrSignUp("signup")}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
