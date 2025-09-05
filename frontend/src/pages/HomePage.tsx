import React from "react";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <nav>
        <a href="/users">View Users</a>
        <br />
        <a href="/posts">View Posts</a>
      </nav>
    </div>
  );
};

export default HomePage;
