import React, { useState } from "react";
import Config, { ConfigType } from "./config";
import { User } from "./util/types";
import Login from "./pages/login";
import NavigationBar from './pages/NavigationBar/index';
import { tryReAuthenticating } from "./util/requests";

const App: React.FC = () => {
  const [context] = useState<ConfigType>(Config());
  const [user, setUser] = useState<User>();

  const handleOnLogout = () => {
    setUser(undefined);
    localStorage.removeItem("token");
  };

  if (user) {
    return (
      <NavigationBar user={user} context={context} handleOnLogout={handleOnLogout} />
    );
  }

  tryReAuthenticating(context)
    .then(setUser)
    .catch(console.log);

      return (
        <Login
          context={context}
          setUser={setUser}
        />
      );
};

export default App;
