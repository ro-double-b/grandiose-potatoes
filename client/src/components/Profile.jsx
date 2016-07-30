import React from 'react';

import { getUsers, getMessages, filterMessages, createMessage } from '../util/profileUtil.js';

import MessageStream from './MessageStream';

////////////// MOCK DATA ////////////////////////
// const messages = [
//   {
//     url: 'http://materializecss.com/images/sample-1.jpg',
//     type: 'image',
//     createdAt: '2016-07-26',
//     username: 'Robb',
//   },
//   {
//     url: 'http://materializecss.com/images/sample-1.jpg',
//     type: 'image',
//     createdAt: '2016-07-27',
//     username: 'Greg',
//   },
//   {
//     url: 'http://materializecss.com/images/sample-1.jpg',
//     type: 'image',
//     createdAt: '2016-07-28',
//     username: 'Robb',
//   },
// ];
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

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // ASYNC, Y U DO THIS
    const info = {
      url: 'test',
      type: 'vid',
      senderName: 'ryan',
      receiverName: 'Robb',
    };
    // console.log('test hit');
    // first load users
    createMessage(info)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('POST error: ', err);
      });

    Promise.all([getUsers(), getMessages()])
      .then((values) => {
        this.setState({
          allUsers: values[0],
          allMessages: values[1],
          showLoading: false,
        });
      })
      .catch(console.error.bind(console));
    //   });
    // getUsers()
    //   .then((users) => {
    //     this.setState({
    //       allUsers: users,
    //     });
    //     console.log('USERS: ', users);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .then(() => {
    //     // once users has been loaded, load messages
    //     getMessages()
    //       .then((messages) => {
    //         // once messages have been loaded remove loading notification
    //         this.setState({
    //           allMessages: messages,
    //           showLoading: false,
    //         });
    //         console.log('MESSAGES: ', messages);
    //       });
    //   });
  }

  handleClick(e) {
    const otherUser = e.target.textContent;

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
              <li><a onClick={this.handleClick} className="collection-item light-blue-text">Ryan</a></li>
              <li><a onClick={this.handleClick} className="collection-item light-blue-text">Robb</a></li>
              <li><a onClick={this.handleClick} className="collection-item light-blue-text">John Cena</a></li>
            </ul>
          </div>


          <MessageStream currentUser={this.state.currentUser} messages={this.state.currentMessages} />
        </div>
      </div>
    );
  }
}

export default Profile;
