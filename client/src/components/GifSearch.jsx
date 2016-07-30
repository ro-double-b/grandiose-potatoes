import React from 'react';
import Gif from './Gif';
const Router = require('react-router');

export default class GifSeach extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: [],
    };
    this.handelGifChange = this.handelGifChange.bind(this);
  }

  handelGifChange(event) {
    const search = event.target.value.replace(' ', '+');
    $.ajax({
      type: "GET",
      url: `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=dc6zaTOxFJmzC`,
    })
    .done((data) => {
      this.setState({
        gifs: data.data,
      });
      console.log(this.state.gifs);
    });
  }

  render() {
    return (
      <div className="col s8 offset-s2">
        <ul className="col s8 offset-s2">
          {
            this.state.gifs.map((gif) => (
              <Gif gifUrl={gif.images.fixed_height.url} />
            ))
          }
        </ul>
        <h2 className="header center blue-text blue-darken-1">Search GIf</h2>
        <br />
        <div className="row">
          <div className="row">
            <div className="input-field col s12">
              <input id="gifSearch" type="text" onChange={this.handelGifChange} />
              <label htmlFor="gifSearch">Gif</label>
            </div>
          </div>
          <button className="waves-effect waves-light btn blue darken-1">Search Gif</button>
        </div>
      </div>
    );
  }
}
