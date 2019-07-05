import React, { Component } from "react";
import db from "./firebaseConfig";
import { Link } from "react-router-dom";
import uuid from "uuid/v4";

class Home extends Component {
  state = {
    // collections of posts
    posts: [],
    title: ""
  };
  componentDidMount() {
    // connect to firebase db in and pass the collection "/posts"
    // .on listens to changes in this db
    db.ref("/posts").on("value", snapshot => {
      // initialize posts array for all posts in our db
      let posts = [];
      // loop though the callback snapshot, and populate our posts array with data from db
      snapshot.forEach(childSnapshot => {
        // also extract the unique id for each post
        posts.push({ ...childSnapshot.val(), key: childSnapshot.key });
      });
      // set our posts variable
      this.setState({ posts });
    });
  }
  render() {
    console.log(this.state.posts);
    return (
      <div>
        <h1> Home </h1>
      </div>
    );
  }
}

export default Home;
