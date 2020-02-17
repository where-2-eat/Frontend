import React from "react";
import { ConfigType } from "../../config";
import { User } from "../../util/types";
import './Home.css';
import { Link } from "react-router-dom";
type HomeProps = {
  context: ConfigType;
  user: User;
};

const Home: React.FC<HomeProps> = ({ context, user }) => {
  return (
    <div className="Home">
      <div className="wrapper">
        <div className="group-image image" />
        <Link to="/group"><div className="solo-image image"></div></Link>
      </div>
    </div>
  );
};

export default Home;
