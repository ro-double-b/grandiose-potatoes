import React from 'react';
import { getUsers, getMessages, filterMessages } from '../util/profileUtil.js';
class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      allUsers: [],
      currentUser: 'hard-coded-user', // this.props.currentUser?
      allMessages: [],
      currentMessages: [],
      showLoading: true,
    }
  }

  componentDidMount() {
    // ASYNC, Y U DO THIS
    // first load users
    getUsers()
      .then((users) => {
        this.setState({
          allUsers: users,
        });
      }).then(() => {
        //once users has been loaded, load messages
        getMessages()
          .then((messages) => {
            //once messages have been loaded remove loading notification
            this.setState({
              allMessages: messages,
              showLoading: false,
            });
          });
      });
  }

  handleClick(e) {
    const otherUser = e.target.textContet;

    this.setState({
      currentMessages: filterMessages(this.state.allMessages, this.state.currentUser, otherUser),
    });
  }

  render () {
    return (
      <div className="container">
        <div className="sidebar">
          <p className="sidebar-entry">USERS</p>
          <p className="sidebar-entry" onClick={this.handleClick} >Ryan</p>
          <p className="sidebar-entry" onClick={this.handleClick} >Robb</p>
          <p className="sidebar-entry" onClick={this.handleClick} >John Cena</p>
        </div>
        
        <div className="main">
          <ul className="message-list">
            <li className="current-user">@greg: video, url: goodmorning</li>
            <li className="current-user">@greg: video, url: goodnight</li>
            <li className="other-user">@ryan: video, url: goodmorning</li>
          </ul>
        </div>
      </div>
    );
  }
};

export default Profile;