import React from 'react';
import { createMessage } from '../util/profileUtil.js';

class Gif extends React.Component {
  constructor(props) {
    super(props);
    this.sendGif = this.sendGif.bind(this);
  }

  sendGif() {
    const info = {
      url: this.props.gifUrl,
      type: "gif",
      senderName: this.props.currentUser,
      receiverName: this.props.otherUser,
    };
    createMessage(info);
  }

  render() {
    return (
      <div>
        <img className="gif-item" onClick={this.sendGif} src={this.props.gifUrl} alt="gif" className="gif" />
      </div>
    );
  }
}

Gif.propTypes = {
  gifUrl: React.PropTypes.string,
  currentUser: React.PropTypes.string,
  otherUser: React.PropTypes.string,
};

export default Gif;
