import React from 'react';

import MessageStreamItem from './MessageStreamItem';

function MessageStream(props) {
  return (
    <div className="col s9 main">
      <ul className="collection message-stream">
        {
          props.messages.map(message => (
            <MessageStreamItem currentUser={props.currentUser} message={message} />
          ))
        }
      </ul>
      <div className="fixed-action-btn">
        <a className="btn-floating btn-large blue">
          <i className="large material-icons">send</i>
        </a>
        <ul>
          <li><a className="btn-floating blue"><i className="material-icons">gif</i></a></li>
          <li><a className="btn-floating blue"><i className="material-icons">videocam</i></a></li>
        </ul>
      </div>
    </div>
  );
}

MessageStream.propTypes = {
  currentUser: React.PropTypes.string,
  messages: React.PropTypes.array,
};

export default MessageStream;
