import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="Home">
      <div className="wrapper">
        <div className="group-image image" />
        <Link to="/group">
          <div className="solo-image image" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
