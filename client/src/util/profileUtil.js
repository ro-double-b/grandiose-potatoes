function getUsers() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: "http://localhost:3000/users",
      success: (data) => {
        console.log('Got user data from server')
        let users = [];
        for (let i = 0; i < data.length; i++) {
          users.push(data[i].username);
        } 
        resolve(data);
      },
      error: (err) => {
        console.log('Unable to retrieve users: ', err);
        reject('Unable to retrieve users:', err);
      },
    });
  });
};

function getMessages() {
  return new Promise ((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: "http://localhost:3000/messages",
      success: (data) => {
        console.log('Got messages data from server')
        resolve(data);
      },
      error: (err) => {
        console.log('Unable to retrieve messages: ', err);
        reject('Unable to retrieve messages:', err);
      }
    });
  });
};

function filterMessages(messages, otherUser) {
  let container = [];
  messages.forEach((message) => {
    if (message.Receiver.username === otherUser && message.Sender.username === this.state.currentUser) {
      container.push({
        url: message.url,
        type: message.type,
        createdAt: message.createdAt,
        username: this.state.currentUser
      });
    } else if (message.Receiver.username === this.state.currentUser && message.Sender.username === otherUser){
      container.push({
        url: message.url,
        type: message.type,
        createdAt: message.createdAt,
        username: otherUser
      })
    }
  });
  return container;
};

export {
  getUsers,
  getMessages,
  filterMessages,
};