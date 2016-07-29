import React from 'react';

function MessageStreamItem(props) {
  const className = props.message.username === props.currentUser ? 'user-me' : 'user-other';

  return (
    <li className={className}>
      <div className="card">
        <div className="card-image">
          <img src="http://materializecss.com/images/sample-1.jpg" alt="Video message" />
        </div>
      </div>
    </li>
  );
}

MessageStreamItem.propTypes = {
  currentUser: React.PropTypes.string,
  message: React.PropTypes.object,
};

export default MessageStreamItem;
