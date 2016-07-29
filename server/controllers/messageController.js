const db = require('../db/db.js');

function getMessages(req, res) {
	console.log('Getting messages...');
	db.Message.findAll({
		include: [
			{model: db.User, as: "Sender", attributes: ['username']},
			{model: db.User, as: "Receiver", attributes: ['username']}
		]
	}).then(function(messages){
			res.send(messages);
	});
};

function createMessage(req, res) {
	// ?
	const { type, url, SenderId, ReceiverId } = req.body.info;
	db.Message.create({
		type, 
		url,
		SenderId,
		ReceiverId,
	}).then(() => {
		res.send({
			success: 'message created',
			url: url
		})
	});
}