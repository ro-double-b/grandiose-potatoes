import React from 'react';

function Gif(props) {
  const url = props.gifUrl;

  return (
    <img src={url} alt="gif" className="gif" />
  );
}

Gif.propTypes = {
  gifUrl: React.PropTypes.string,
};

export default Gif;
