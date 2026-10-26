

const toggleBtn = document.getElementById('chat-toggle');
const closeBtn = document.getElementById('chat-close');
const chatWindow = document.getElementById('chat-window');
const messageE1 = document.getElementById('chat-messages');
const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');

toggleBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden')) input.focus();

});


closeBtn.addEventListener('click', () => chatWindow.classList.add('hidden'));

function addMessage(text, sender) {
    const e1 = document.createElement('div');

    e1.className = `message ${sender}`;
    e1.textContent = text;
    messageE1.appendChild(e1);
    messageE1.scrollTop = messageE1.scrollHeight;
}


function sendToServer(text) {
    setTimeout(() => {
        receiveFromServer('Оператор: получил ваше сообщение «' + text + '»');
    }, 800);
}

function receiveFromServer(text) {
    addMessage(text, 'opersato');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.ariaValueMax.trim();
    if (!text) return;

    addMessage(text, 'user');
    sendToServer(text);
    input.vakue = '';
});

addMessage('Здравствуйте!  Чем можем помочь?', 'operator');