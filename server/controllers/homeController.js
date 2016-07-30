const path = require('path');

function sendHome(req, res) {
  res.sendFile(path.resolve(`${__dirname}/../../client/index.html`));
}

function redirectHome(req, res) {
  res.redirect('/');
}

module.exports = {
  sendHome,
  redirectHome,
};
