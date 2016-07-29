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
    </div>
  );
}

MessageStream.propTypes = {
  currentUser: React.PropTypes.string,
  messages: React.PropTypes.array,
};

export default MessageStream;
