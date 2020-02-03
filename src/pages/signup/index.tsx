import React, { useState } from "react";
import { User, LoginOrSignUp } from "../../util/types";
import { createUser } from "../../util/requests";
import { ConfigType } from "../../config";

type SignUpProps = {
  context: ConfigType;
  setUser: (user: User) => void;
  setLoginOrSignUp: (page: LoginOrSignUp) => void;
};

const SignUp: React.FC<SignUpProps> = ({
  context,
  setUser,
  setLoginOrSignUp
}) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = event;
    setEmail(value);
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = event;
    setUsername(value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = event;
    setPassword(value);
  };

  const handleOnSignUp = (
    event: React.MouseEvent<Element, MouseEvent>
  ): void => {
    createUser(context, { email, username, password })
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
          name="username"
          placeholder="John Smith"
          type="text"
          onChange={handleUsername}
          value={username}
        />
        <input
          name="password"
          placeholder="mypassword"
          type="password"
          onChange={handlePassword}
          value={password}
        />

        <button onClick={handleOnSignUp}>Sign Up</button>
      </div>

      <div>
        <button onClick={() => setLoginOrSignUp("login")}>To Login</button>
      </div>
    </div>
  );
};

export default SignUp;
