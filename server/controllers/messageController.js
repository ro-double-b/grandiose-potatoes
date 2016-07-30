const db = require('../db/db.js');
const session = require('express-session');

function getUsers(req, res) {
  // console.log('Session: ', req.session);
  // console.log('User: ', req.session.user);
  db.User.findAll({
    where: {
      username: {
        $ne: req.session.user,
      },
    },
  })
  .then((users) => {
    res.send(users);
  });
}

function getMessages(req, res) {
  console.log('Getting messages...');
  db.Message.findAll({
    include: [
      { model: db.User, as: "Sender", attributes: ['username'] },
      { model: db.User, as: "Receiver", attributes: ['username'] },
    ],
  }).then((messages) => {
    res.send(messages);
  });
}

function createMessage(req, res) {
  // ?
  const type = req.body.type;
  const url = req.body.url;


  function getSender() {
    return db.User.findOne({
      attributes: ['id'],
      where: {
        username: [req.body.senderName],
      },
    });
  }
  function getReceiver() {
    return db.User.findOne({
      attributes: ['id'],
      where: {
        username: [req.body.receiverName],
      },
    });
  }

  Promise.all([getSender(), getReceiver()])
    .then((values) => {
      const SenderId = values[0].id;
      const ReceiverId = values[1].id;
      return db.Message.create({
        type,
        url,
        SenderId,
        ReceiverId,
      });
    })
    .catch(console.error.bind(console))
    .then(() => {
    // res.send({
    //   success: 'message created',
    // });
      res.send('success');
    });
}

// db.User.findOne({
//   attribute: ['id', 'username'],
//   where: {
//     username: ["Robb"],
//   },
// }).then((data) => {
//   console.log('Name :', data.username, ' ,ID: ', data.id);
// });

module.exports = {
  getUsers,
  getMessages,
  createMessage,
};
