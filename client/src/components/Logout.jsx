import React from 'react';
const Router = require('react-router');

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'api/logout',
    })
    .done((path) => {
      Router.browserHistory.push(path);
    });
  }

  render() {
    return (
      <div className="col s8 offset-s2">
        <h3 className="header center ">Click below to log out of Vime.</h3>
        <form className="col s12 center" onSubmit={this.handleSubmit} >
          <button className="waves-effect center waves-light btn blue darken-1">Logout</button>
        </form>
      </div>
    );
  }
}
