import React from 'react';
import Gif from './Gif';
const Router = require('react-router');

export default class GifSeach extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchWords: "",
      gifs: [],
    };
    this.handelGifChange = this.handelGifChange.bind(this);
    this.handelGifSearch = this.handelGifSearch.bind(this);
  }

  handelGifChange(event) {
    this.setState({
      searchWords: event.target.value,
    });
  }

  handelGifSearch() {
    const search = this.state.searchWords;
    $.ajax({
      type: "GET",
      url: `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=dc6zaTOxFJmzC`,
    })
    .done((data) => {
      this.setState({
        gifs: data.data,
      });
    });
  }

  render() {
    return (
      <div className="col s8 offset-s2">
        <div className="gif-container">
          {
            this.state.gifs.map((gif) => (
              <Gif gifUrl={gif.images.fixed_height.url} />
            ))
          }
        </div>
        <h2 className="header center blue-text blue-darken-1">Search GIf</h2>
        <br />
        <div className="row">
          <div className="row">
            <div className="input-field col s12">
              <input id="gifSearch" type="text" onChange={this.handelGifChange} />
              <label htmlFor="gifSearch">Gif</label>
            </div>
          </div>
          <button className="waves-effect waves-light btn blue darken-1" onClick={this.handelGifSearch}>Search Gif</button>
        </div>
      </div>
    );
  }
}
