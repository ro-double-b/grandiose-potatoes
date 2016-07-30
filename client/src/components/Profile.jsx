import React from 'react';

import { getUsers, getMessages, filterMessages, createMessage } from '../util/profileUtil.js';

import User from './User';

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
    // /////////////////////////////////
    //    POST REQUEST DATA FORMAT    //
    //                                //
    //     info = {                   //
    //       url: url,                //
    //       type: type,              //
    //       senderName: sender,      //
    //       receiverName: receiver,  //
    //     };                         //
    //                                //
    // /////////////////////////////////

    Promise.all([getUsers(), getMessages()])
      .then((values) => {
        console.log(values[0].map(user => user.username));
        this.setState({
          allUsers: values[0].map(user => user.username),
          allMessages: values[1],
          showLoading: false,
        });
      })
      .catch(console.error.bind(console));
  }

  handleClick(e) {
    const otherUser = e.target.textContent;
    console.log(e.target.textContent);

    this.setState({
      currentMessages: filterMessages(this.state.allMessages, this.state.currentUser, otherUser),
    });
  }

  // <li><a onClick={this.handleClick} className="collection-item light-blue-text">Ryan</a></li>
  // <li><a onClick={this.handleClick} className="collection-item light-blue-text">Robb</a></li>
  // <li><a onClick={this.handleClick} className="collection-item light-blue-text">John Cena</a></li>
  // handleClick={this.handleClick}
  render() {
    return (
      <div>
        <div className="row">
          <h3>Messages</h3>
        </div>
        <div className="row message-box">
          <div className="col s3">
            <ul className="collection">
              {this.state.allUsers.map(user => (
                <User otherUserName={user} />
                )
              )}
            </ul>
          </div>


          <MessageStream currentUser={this.state.currentUser} messages={this.state.currentMessages} />
        </div>
      </div>
    );
  }
}

export default Profile;
