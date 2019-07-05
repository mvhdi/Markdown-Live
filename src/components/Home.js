import React, { Component } from "react";
import db from "./firebaseConfig";
import { Link } from "react-router-dom";
import uuid from "uuid/v4";

class Home extends Component {
  state = {
    // collections of posts
    posts: []
  };
  render() {
    return (
      <div>
        <h1> Home </h1>
      </div>
    );
  }
}

export default Home;
