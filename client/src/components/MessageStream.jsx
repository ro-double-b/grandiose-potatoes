import React from 'react';
import ReactDOM from 'react-dom';

import MessageStreamItem from './MessageStreamItem';
import InlineRecorder from './InlineRecorder';

class MessageStream extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      atScrollBottom: true,
    };

    setTimeout(() => {
      const thisNode = ReactDOM.findDOMNode(this);
      thisNode.scrollTop = thisNode.scrollHeight;
    }, 1);
  }

  componentWillUpdate() {
    // Before update, store whether the user is already at the bottom
    const thisNode = ReactDOM.findDOMNode(this);
    this.setState({
      atScrollBottom: thisNode.scrollTop + thisNode.offsetHeight === thisNode.scrollHeight,
    });
  }

  componentDidUpdate() {
    // If the user was already at the bottom, scroll to the bottom
    if (this.state.atScrollBottom) {
      const thisNode = ReactDOM.findDOMNode(this);
      thisNode.scrollTop = thisNode.scrollHeight;
    }
  }

  render() {
    return (
      <ul className="message-stream">
        {
          this.props.messages.map(message => (
            <MessageStreamItem currentUser={this.props.currentUser} message={message} key={message.createdAt} />
          ))
        }
        <InlineRecorder />
      </ul>
    );
  }
}

MessageStream.propTypes = {
  currentUser: React.PropTypes.string,
  messages: React.PropTypes.array,
};

export default MessageStream;
