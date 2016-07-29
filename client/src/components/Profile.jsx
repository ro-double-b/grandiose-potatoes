import React from 'react';

import { getUsers, getMessages, filterMessages } from '../util/profileUtil.js';

import MessageStream from './MessageStream';

////////////// MOCK DATA ////////////////////////
const messages = [
  {
    url: 'http://materializecss.com/images/sample-1.jpg',
    type: 'image',
    createdAt: '2016-07-26',
    username: 'Robb',
  },
  {
    url: 'http://materializecss.com/images/sample-1.jpg',
    type: 'image',
    createdAt: '2016-07-27',
    username: 'Greg',
  },
  {
    url: 'http://materializecss.com/images/sample-1.jpg',
    type: 'image',
    createdAt: '2016-07-28',
    username: 'Robb',
  },
];
////////////// MOCK DATA ////////////////////////

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allUsers: [],
      currentUser: 'Greg', // this.props.currentUser?
      allMessages: [],
      currentMessages: [],
      showLoading: true,
    };
  }

  // componentDidMount() {
  //   // ASYNC, Y U DO THIS
  //   // first load users
  //   getUsers()
  //     .then((users) => {
  //       this.setState({
  //         allUsers: users,
  //       });
  //     }).then(() => {
  //       //once users has been loaded, load messages
  //       getMessages()
  //         .then((messages) => {
  //           //once messages have been loaded remove loading notification
  //           this.setState({
  //             allMessages: messages,
  //             showLoading: false,
  //           });
  //         });
  //     });
  // }

  handleClick(e) {
    const otherUser = e.target.textContet;

    this.setState({
      currentMessages: filterMessages(this.state.allMessages, this.state.currentUser, otherUser),
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <h3>Messages</h3>
        </div>
        <div className="row message-box">
          <div className="col s3">
            <ul className="collection">
              <li><a className="collection-item light-blue-text">Ryan</a></li>
              <li><a className="collection-item light-blue-text">Robb</a></li>
              <li><a className="collection-item light-blue-text">John Cena</a></li>
            </ul>
          </div>
          
          <div className="col s9 main">
            <MessageStream currentUser={this.state.currentUser} messages={messages} />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
