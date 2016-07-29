import React from 'react';

import MessageStream from './MessageStream';

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


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Greg',
    };
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

          <MessageStream currentUser={this.state.currentUser} messages={messages} />
        </div>
      </div>
    );
  }
}

export default Profile;
