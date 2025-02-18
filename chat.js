const CLIENT_ID = 'kxQK5qQQfAPZbfcE';
const username = localStorage.getItem("name");

const drone = new ScaleDrone(CLIENT_ID, {
  data: {
    name: username,
    color: getRandomColor(),
  },
});

let members = [];

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  const room = drone.subscribe('observable-room');
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
    logToDiscord(`${username} has joined the chat`);
  });

  room.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  room.on('member_join', member => {
    members.push(member);
    updateMembersDOM();
    logToDiscord(`${member.clientData.name} joined the chat.`);
  });

  room.on('member_leave', ({ id }) => {
    const leftMember = members.find(member => member.id === id);
    members = members.filter(member => member.id !== id);
    updateMembersDOM();
    logToDiscord(`${leftMember.clientData.name} left the chat.`);
  });

  room.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
      logToDiscord(`${member.clientData.name}: ${text}`);
    } else {
    }
  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});

function getRandomName() {
  const adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", " proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    "_" +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', event => {
  event.preventDefault();
  const value = DOM.input.value;
  if (value.trim() !== '') {
    DOM.input.value = '';
    drone.publish({
      room: 'observable-room',
      message: value,
      historyCount: 50
    });
  }
});

function createMemberElement(member) {
  const { name, color } = member.clientData;
  const el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;
  return el;
}

function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} users in room:`;
  DOM.membersList.innerHTML = '';
  members.forEach(member => {
    DOM.membersList.appendChild(createMemberElement(member));
  });
}

function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));

  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
}

function logToDiscord(message) {
  const webhookURL = 'https://discord.com/api/webhooks/1196646057434681434/wF4zm_vyeLy6Bf_t6G-2yAKZ6T4F4hvbnxZ0JZy7vk3KLouBHcWxXHsm3WTpS8kvRPJv';

  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: message }),
  })
  .catch(error => console.error('Error logging to Discord:', error));
}
