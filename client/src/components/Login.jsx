import React from 'react';
const Router = require('react-router');
import SkyLight from 'react-skylight'

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      modalOpen: false
    };
    this.handelUsernameChange = this.handelUsernameChange.bind(this);
    this.handelPasswordChange = this.handelPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.test = this.test.bind(this);
  }

  handelUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handelPasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  test(data) {
    // if(data === 'error') {
    this.refs.simpleDialog.show()
    // }
  }

  handleSubmit(event) {
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'api/login',
      data: {
        username: this.state.username, password: this.state.username,
      },
    }).done(function(path){
      if (path !== 'error') {
      Router.browserHistory.push(path);
      }
    }).done(this.test())
  }

  render() {
    return (
      <div className="col s8 offset-s2">
        <h2 className="header center blue-text blue-darken-1">Login</h2>
        <br />
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input id="last_name" type="text" className="validate" value={this.state.username} onChange={this.handelUsernameChange} />
                <label htmlFor="last_name">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" value={this.state.password} onChange={this.handelPasswordChange} />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button className="waves-effect waves-light btn blue darken-1">Login</button>
            <button onClick={this.test}>Open Modal</button>
            <p>Not a user? <a href="signup">SignUp</a></p>
          </form>
        </div>
        <SkyLight hideOnOverlayClicked ref="simpleDialog" title="Error">
          There was an error Logging you in, Please try again
        </SkyLight>
      </div>
    );
  }
};