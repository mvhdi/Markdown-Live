import React, { Component } from "react";
import db from "./firebaseConfig";
import { Link } from "react-router-dom";
import uuid from "uuid/v4";
var ls = require("local-storage");

class Home extends Component {
  state = {
    // collections of posts
    posts: [],
    title: "",
    author: "",
    auth: "",
    searchAuthor: ""
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
        posts.push({
          //   ...childSnapshot.val(),
          key: childSnapshot.val().token,
          author: childSnapshot.val().author,
          title: childSnapshot.val().title,
          body: childSnapshot.val().body
        });
      });
      // set our posts variable
      this.setState({ posts });
    });
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  info = event => {
    event.preventDefault();
    const newId = uuid();
    const url = newId + "-" + this.state.code;
    if (this.state.title === "") return;
    db.ref(`posts/${url}`)
      .set({
        title: this.state.title,
        body: "",
        author: this.state.author,
        code: this.state.code,
        token: newId
      })
      .then(res => {
        this.props.history.push(`/post/${url}`);
      })
      .catch(err => console.log(err));
  };
  setauth = event => {
    event.preventDefault();
    this.setState({ [this.state.auth]: this.state.auth });
    ls("mark-live-auth", this.state.auth);
    // console.log(this.state.url);
  };
  search = event => {
    event.preventDefault();
    this.setState({ [this.state.searchAuthor]: this.state.searchAuthor });
    ls("mark-live-searchAuthor", this.state.searchAuthor);
  };

  render() {
    console.log(this.state.posts);
    console.log(ls("mark-live-auth"));
    console.log(ls("mark-live-searchAuthor"));

    return (
      <div>
        <h1> Home </h1>
        <h1 className="mt-4 mb-4 text-center">Create or edit a post</h1>
        <form onSubmit={this.info}>
          <div className="input-group mb-3">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="title.."
              value={this.state.title}
              onChange={this.onChange}
            />
            <input
              type="text"
              name="author"
              className="form-control"
              placeholder="author.."
              value={this.state.author}
              onChange={this.onChange}
            />
            <input
              type="text"
              name="code"
              className="form-control"
              placeholder="code.."
              value={this.state.code}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <button className="btn btn-success" type="submit">
                Create
              </button>
            </div>
          </div>
        </form>
        <h1 className="mt-4 mb-4 text-center">Search for a post</h1>
        <form onSubmit={this.search}>
          <div className="input-group mb-3">
            <input
              type="text"
              name="searchAuthor"
              className="form-control"
              placeholder="author.."
              value={this.state.searchAuthor}
              onChange={this.onChange}
            />

            <div className="input-group-append">
              <button className="btn btn-success" type="submit">
                Set
              </button>
            </div>
          </div>
        </form>
        <h1 className="mt-4 mb-4 text-center">
          Enter password to unlock a post
        </h1>
        <form onSubmit={this.setauth}>
          <div className="input-group mb-3">
            <input
              type="text"
              name="auth"
              className="form-control"
              placeholder="passcode.."
              value={this.state.auth}
              onChange={this.onChange}
            />

            <div className="input-group-append">
              <button className="btn btn-success" type="submit">
                unlock
              </button>
            </div>
          </div>
        </form>
        <div className="text-center">
          {this.state.posts.map(function(post) {
            //console.log(post.author);
            if (post.author === ls("mark-live-searchAuthor")) {
              return (
                <div className="mt-4 mb-4" key={post.key}>
                  <Link
                    to={`/post/${post.key}-${ls("mark-live-auth")}`}
                    className="post-link"
                  >
                    <h2>
                      {post.title} by {post.author}{" "}
                    </h2>
                    <hr />
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default Home;
