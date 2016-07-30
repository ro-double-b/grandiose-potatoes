import React from 'react';
import Gif from './Gif';
// const Router = require('react-router');

function GifSearch(props) {
  return (
    <div className="gif-container">
      {
        props.gifs.map((gif) => (
          <Gif gifUrl={gif.images.fixed_height.url} currentUser={props.currentUser} otherUser={props.otherUser} />
        ))
      }
    </div>
  );
}

export default GifSearch;

GifSearch.propTypes = {
  gifs: React.PropTypes.array,
  currentUser: React.PropTypes.string,
  otherUser: React.PropTypes.string,
};
