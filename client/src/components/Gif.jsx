import React from 'react';

function Gif(props) {
  const url = props.gif.url;

  return (
    <li>
      <img src={url} alt="Video message" />
    </li>
  );
}

Gif.propTypes = {
  gif: React.PropTypes.string,
};

export default Gif;
