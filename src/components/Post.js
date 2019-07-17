import React, { Component } from "react";
import { Link } from "react-router-dom";
import db from "./firebaseConfig";
import ReactMarkdown from "react-markdown";
import { Button} from 'react-bootstrap';

var displayVal = false;

class Post extends Component {
  constructor(props) {
    super(props);

    this.titleRef = React.createRef();
    this.bodyRef = React.createRef();
    this.postFBRef = db.ref(`posts/${this.props.match.params.postId}`);

    this.state = {
      mdBody: ""
    };
  }

  componentDidMount() {
    db.ref("/posts").on("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        var x = this.props.match.params.postId;
        var y = childSnapshot.val().token + "-" + childSnapshot.val().code;
        if (x === y) {
          // console.log("true");
          displayVal = true;
          this.postFBRef.on("value", snapshot => {
            this.titleRef.current &&
              (this.titleRef.current.value = snapshot.val().title);
            this.bodyRef.current &&
              (this.bodyRef.current.value = snapshot.val().body);
            this.setState({
              mdBody: snapshot.val().body
            });
          });
        } else {
          // console.log("false");
        }
      });
    });
  }
  onChange = () => {
    this.postFBRef

      .update({
        title: this.titleRef.current.value,
        body: this.bodyRef.current.value
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    if (displayVal) {
      return (
// ----------------------------
        <React.Fragment>
          <div className="row">
            <div className="col-md-4 mb-3 mt-3">
              <Button  variant="outline-primary" href="/">Home </Button>
            </div>
            </div>
            <div className="row">
            <div className="col-md-4 mb-3">
              <input
                className="post-title-input"
                ref={this.titleRef}
                type="text"
                placeholder="Title"
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col col-sm-6">
              <textarea
                className="form-control"
                placeholder="Post body.."
                ref={this.bodyRef}
                type="text"
                onChange={this.onChange}
                rows={30}
              />
            </div>
            <div className="col col-sm-6">
              <ReactMarkdown
                source={this.state.mdBody}
                className="markdown-preview"
              />
            </div>
         </div> 
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="col-md-4 mb-3 mt-3">
              <Button  variant="outline-primary" href="/">Home </Button>
            </div>
          <h1> Wrong passcode </h1>
        </React.Fragment>
      );
    }
  }
}
export default Post;
