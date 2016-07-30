const db = require('../db/db.js');
const session = require('express-session');

function getUsers(req, res) {
  const currentUser = req.session.user;

  db.User.findAll({
    attributes: ["username"],
    where: {
      username: {
        $ne: currentUser,
      },
    },
  })
  .then((users) => {
    res.send(users);
  });
}

function getCurrentUser(req, res) {
  const currentUser = req.session.user;

  db.User.findOne({
    attributes: ['username'],
    where: {
      username: [currentUser],
    },
  })
  .then((user) => {
    res.send(user);
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
      res.send('success');
    });
}

module.exports = {
  getUsers,
  getCurrentUser,
  getMessages,
  createMessage,
};
