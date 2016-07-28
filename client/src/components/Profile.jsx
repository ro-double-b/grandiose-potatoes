import React from 'react';

class Profile extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			allUsers: [],
			currentUser: 'hard-coded-user', // this.props.currentUser?
			allMessages: [],
			currentMessages: [],
			showLoading: true
		}
	}

	// componentDidMount() {
	// 	getMessages
	// }

	// handleClick(e) {
	// 	const otherUser = e.target.textContet;

	// 	this.setState({
	// 		currentMessages: this.filterMessages(this.state.allMessages, otherUser);
	// 	});
	// }

	render () {
		return (
			<div className="container">
	      <div className="sidebar">
	      	<p className="sidebar-entry">USERS</p>
	      	<p className="sidebar-entry" onClick={this.handleClick} >Ryan</p>
	      	<p className="sidebar-entry" onClick={this.handleClick} >Robb</p>
	      	<p className="sidebar-entry" onClick={this.handleClick} >John Cena</p>
	      </div>
	      
	      <div className="main">
	        <ul className="message-list">
	        	<li className="current-user">@greg: video, url: goodmorning</li>
	        	<li className="current-user">@greg: video, url: goodnight</li>
	        	<li className="other-user">@ryan: video, url: goodmorning</li>
	        </ul>
	      </div>
	    </div>
		);
	}
};

export default Profile;