import React from 'react';
import Gif from './MessageStreamItem';
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
      this.state.gifs = data.data;
      console.log(data);
    });
  }

  render() {
    return (
      <div className="col s8 offset-s2">
        <ul>
          {
            this.state.gifs.map((gif) => (
              <Gif gif={gif} />
            ))
          }
        </ul>
        <h2 className="header center blue-text blue-darken-1">Search GIf</h2>
        <br />
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit} >
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="text" className="validate" value={this.state.gifName} onChange={this.handelGifChange} />
                <label htmlFor="password">Gif</label>
              </div>
            </div>
            <button className="waves-effect waves-light btn blue darken-1">search Gif</button>
          </form>
          <p>Already a user? <a href="login">Login</a></p>
        </div>
      </div>
    );
  }
}
