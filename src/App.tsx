import React, { useState } from "react";
import Config, { ConfigType } from "./config";
import { User, LoginOrSignUp } from "./util/types";
import Login from "./pages/login";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import { tryReAuthenticating } from "./util/requests";

/** TODO
 *
 * *** Current Sprint
 * - Logout
 *    - Button itself ( onClick={handleLogout} )
 * - Search bar with autocomplete
 *    - Google Places API setup
 *    - Move map to search result
 * - Search Nearby Places
 *    - Button itself
 *    - Server API request
 *    - Places Info Window upon clicking on a marker
 *
 * *** Next Sprint
 * - Create group story (next sprint)
 *
 * *** Backlog
 * - Geolocator button (in case you moved your map, to bring you back)
 */

const App: React.FC = () => {
  const [context] = useState<ConfigType>(Config());
  const [user, setUser] = useState<User>();
  const [loginOrSingUp, setLoginOrSignUp] = useState<LoginOrSignUp>("login");

  const handleOnLogout = () => {
    setUser(undefined);
    localStorage.removeItem("token");
  };

  if (user) {
    return (
      <Home user={user} context={context} handleOnLogout={handleOnLogout} />
    );
  }

  tryReAuthenticating(context)
    .then(setUser)
    .catch(console.log);

  switch (loginOrSingUp) {
    case "login":
      return (
        <Login
          context={context}
          setUser={setUser}
          setLoginOrSignUp={setLoginOrSignUp}
        />
      );
    case "signup":
      return (
        <SignUp
          context={context}
          setUser={setUser}
          setLoginOrSignUp={setLoginOrSignUp}
        />
      );
  }
};

export default App;
