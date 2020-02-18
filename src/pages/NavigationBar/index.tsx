import React, { useState } from "react";
import "./NavigationBar.css";
import Home from "../home";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { ConfigType } from "../../config";
import Group from "../group";
import { SystemUser_ } from "../../util/models";
import { AppContext } from "../../util/types";

type NavProps = {
  config: ConfigType;
  user: SystemUser_;
  googleApiKey: string;
  handleOnLogout: () => void;
};

const NavigationBar: React.FC<NavProps> = ({
  config,
  user,
  googleApiKey,
  handleOnLogout
}) => {
  const [context, setContext] = useState<AppContext>({
    config,
    user,
    googleApiKey
  });
  if (!context.googleApiKey && !!googleApiKey)
    setContext({ ...context, googleApiKey });

  return (
    <Router>
      <div>
        <nav>
          <div className="nav-wrapper">
            <div className="nav-btn">
              <Link to="/">Home</Link>
            </div>
            <div className="nav-btn">
              <Link to="/about">About</Link>
            </div>
            <div className="nav-btn">
              <Link to="/account">Account</Link>
            </div>
            <div className="nav-btn" onClick={handleOnLogout}>
              <Link to="/">Logout</Link>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route path="/about" component={About} />
          <Route path="/account" component={Account} />
          <Route path="/group" component={() => <Group context={context} />} />
        </Switch>
      </div>
    </Router>
  );
};

function About() {
  return <h2>About</h2>;
}

function Account() {
  return <h2>Account</h2>;
}

export default NavigationBar;
