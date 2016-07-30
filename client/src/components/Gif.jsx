import React from 'react';

function Gif(props) {
  const url = props.gifUrl;

  return (
    <li>
      <img src={url} alt="gif" />
    </li>
  );
}

Gif.propTypes = {
  gifUrl: React.PropTypes.string,
};

export default Gif;
