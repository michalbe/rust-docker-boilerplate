import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, withRouter } from "react-router-dom";

import { MainPage } from "./pages/MainPage/MainPage";

import styles from './app.css';

class AppRoot extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
      username: false
    };

    this.logMeIn = this.logMeIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logMeIn(username) {
    this.setState({
      isLogged: true,
      username
    });
  }

  logOut() {
    fetch('/api/logout', {
      credentials: "same-origin",
      method: 'POST'
    })
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        if (json.status === 200) {
          // XXX: This needs to be handled with router
          window.location = '/';
          this.setState({
            isLogged: false
          });
        }
      });
  }

  componentDidMount() {
    fetch('/api/status', {
      credentials: "same-origin"
    })
      .then((resp) => {
        return resp.json()
      })
      .then((json) => {
        if (json.status === 200) {
          this.setState({
            isLogged: true,
            username: json.userData.username
          });
        } else {
          if (window.location.hash.length > 2) {
            window.location = '/';
          }
          this.setState({
            isLogged: false
          });
        }
      })
  }

  render() {
    return <Router>
      <span>
        {
          this.state.isLogged
            ? <div>
                  Hello {this.state.username}
                  <button onClick={() => this.logOut()}>Logout</button>
            </div>
            : ''
        }
          <Route exact path="/" render={() => {
            return <MainPage
              isLogged={this.state.isLogged}
              logMeIn={this.logMeIn}
              logOut={this.logOut}
              username={this.state.username}
            ></MainPage>
          }} />
      </span>
    </Router>
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<AppRoot />, mountNode);
