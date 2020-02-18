import React, { useState } from "react";
import Config, { ConfigType } from "./config";
import Login from "./pages/login";
import NavigationBar from "./pages/NavigationBar/index";
import { tryReAuthenticating } from "./util/requests/auth";
import { SystemUser_ } from "./util/models";
import GoogleApiKeyWrapper from "./components/hoc/googleApiKeyWrapper";

const App: React.FC = () => {
  const [config] = useState<ConfigType>(Config());
  const [user, setUser] = useState<SystemUser_>();

  const handleOnLogout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };

  if (!!user) {
    return (
      <GoogleApiKeyWrapper
        config={config}
        render={googleApiKey => (
          <NavigationBar
            config={config}
            user={user}
            googleApiKey={googleApiKey}
            handleOnLogout={handleOnLogout}
          />
        )}
      />
    );
  }

  tryReAuthenticating(config)
    .then(setUser)
    .catch(console.log);

  return <Login config={config} setUser={setUser} />;
};

export default App;
