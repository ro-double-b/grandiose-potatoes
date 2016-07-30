import React from 'react';
const Router = require('react-router');

export default class Gif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gifName: "",
      gifs: []
    };
    this.handelGifChange = this.handelGifChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handelGifChange(event) {
    this.setState({
      gifName: event.target.value,
    });
    var test = this.state.gifName
    console.log(test)
    // test.forEach(function(letter, index) {
    //   if(letter === ' ') {
    //     test[index] = +
    //   }
    // })
    console.log(test)
  }

  handleSubmit(event) {
    event.preventDefault();
    // change spaces to +'s'
    // var search = this.state.gif 
    var serach = 'funny+cats'
    $.ajax({
      type: 'Get',
      url: `http://api.giphy.com/v1/gifs/search?q=funny+cats&api_key=dc6zaTOxFJmzC`,
    })
    .done((data) => {
      this.state.gifs = data
      console.log('this is the gifs', this.state.gifs)
    });
  }

  render() {
    return (
      <div className="col s8 offset-s2">
        <h2 className="header center blue-text blue-darken-1">Signup</h2>
        <br />
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit} >
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="text" className="validate" value={this.state.gifName} onChange={this.handelGifChange} />
                <label htmlFor="password">Gif</label>
              </div>
            </div>
            <button className="waves-effect waves-light btn blue darken-1">Search</button>
          </form>
          <p>Already a user? <a href="login">Login</a></p>
        </div>
      </div>
    );
  }
}