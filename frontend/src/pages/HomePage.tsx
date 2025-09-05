import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <nav>
        <Link to="/users">View Users</Link>
        <br />
        <Link to="/posts">View Posts</Link>
      </nav>
    </div>
  );
};

export default HomePage;
