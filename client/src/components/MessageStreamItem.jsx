import React from 'react';

import VideoButton from 'VideoButton';

function MessageStreamItem(props) {
  const className = props.message.username === props.currentUser ? 'user-me' : 'user-other';
  // "http://materializecss.com/images/sample-1.jpg"
  // <img src="http://materializecss.com/images/sample-1.jpg" alt="Video message" />
  console.log(props.message);

  return (
    <li className={className}>
      <div className="card">
        <div className="card-image">
          <p>url: {props.message.url}, type: {props.message.type}</p>
        </div>
      </div>
      <div className="fixed-action-btn horizontal" style={ {right: "150px"} }  >
        <a className="btn-floating btn-large red">
          <i className="large material-icons">videocam</i>
        </a>
        <ul>
          <li><a className="btn-floating red">POST</a></li>
          <li><a className="btn-floating red"><i className="material-icons">replay</i></a></li>
          <li><a className="btn-floating red"><i className="material-icons">stop</i></a></li>
          <li><a className="btn-floating red"><i className="material-icons">album</i></a></li>
        </ul>
      </div>
    </li>
  );
}

MessageStreamItem.propTypes = {
  currentUser: React.PropTypes.string,
  message: React.PropTypes.object,
};

export default MessageStreamItem;
