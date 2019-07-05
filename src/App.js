import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Post from "./components/Post";
function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/post/:postId" component={Post} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
