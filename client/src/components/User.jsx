import React from 'react';

function User(props) {
  // onClick={props.handleClick}
  return (
    <li><a className="collection-item light-blue-text">{props.otherUserName}</a></li>
  );
}

User.propTypes = {
  otherUserName: React.PropTypes.string,
  // handleClick: React.PropTypes.func,
};

export default User;
