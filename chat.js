let currentBotId = null;

async function loadChatHistory(botId) {
    currentBotId = botId;
    
    try {
        const response = await fetch(`${API_BASE_URL}/chat/history/${botId}`);
        const chats = await response.json();
        
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = '';
        
        chats.reverse().forEach(chat => {
            addMessage(chat.user_message, 'user', chat.prompt_description);
            addMessage(chat.bot_response, 'bot', null, chat.external_links);
        });
    } catch (error) {
        console.error('Error loading chat history:', error);
    }
}

async function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (!message || !currentBotId) return;
    
    addMessage(message, 'user');
    input.value = '';
    
    try {
        const response = await fetch(`${API_BASE_URL}/chat/${currentBotId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            addMessage(data.response, 'bot', null, data.external_links);
        } else {
            addMessage('Error: ' + data.error, 'bot');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        addMessage('Error sending message', 'bot');
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    // Main message text
    const textElem = document.createElement('span');
    textElem.textContent = text;
    messageDiv.appendChild(textElem);
    // If prompt description exists, show it
    if (arguments.length > 2 && arguments[2]) {
        const promptDescElem = document.createElement('div');
        promptDescElem.className = 'prompt-description';
        promptDescElem.textContent = `Prompt: ${arguments[2]}`;
        messageDiv.appendChild(promptDescElem);
    }
    // If external links exist, show them
    if (arguments.length > 3 && arguments[3] && Array.isArray(arguments[3]) && arguments[3].length > 0) {
        const linksElem = document.createElement('div');
        linksElem.className = 'external-links';
        linksElem.innerHTML = 'Resources: ' + arguments[3].map(link => `<a href="${link}" target="_blank">${link}</a>`).join(', ');
        messageDiv.appendChild(linksElem);
    }
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
document.getElementById('send-button')?.addEventListener('click', sendMessage);
// Allow sending message with Enter key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }  
});
// Allow sending message with Enter key in input field
document.getElementById('input-field')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
// Allow sending message with Enter key in message input field      
document.getElementById('message-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey){
        e.preventDefault();
        sendMessage();
    }
});
async function createBot() {
    const name = document.getElementById('bot-name').value.trim();
    const description = document.getElementById('bot-description').value.trim();        
    const capabilities = Array.from(document.querySelectorAll('.capabilities input:checked')).map(cb => cb.value);
    if (!name || !description || capabilities.length === 0) {
        alert('Please fill in all fields and select at least one capability.');
        return;
        }
};

    const formData = {
        name,
        description,
        capabilities: Array.from(document.querySelectorAll('.capabilities input:checked')).map(cb => cb.value)
    };                                                                                                              
    const response = await fetch('/create-bot', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
        },


        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Bot created successfully:', data);
        alert('Bot created successfully!');
    } else {

        const errorData = await response.json();
        console.error('Error creating bot:', errorData);
        alert('Error creating bot: ' + errorData.error);
    }

    document.getElementById('bot-name').value = '';
    document.getElementById('bot-description').value = '';
    document.querySelectorAll('.capabilities input:checked').forEach(cb => cb.checked = false);     
    hideBotCreator();
    loadUserBots();

    const botsContainer = document.getElementById('my-bots');
    if (!botsContainer) {
        createBotsContainer();
    } else {
        botsContainer.innerHTML = '<h3>My Bots</h3>';
    }           
    return botsContainer;

function createBotCard(bot) {
    const card = document.createElement('div');
    card.className = 'bot-card';
    card.innerHTML = `
        <h4>${bot.name}</h4>
        <p>${bot.description}</p>
        <button onclick="loadChatHistory(${bot.id})">Chat</button>
    `;
    return card;
}

function hideBotCreator() {
    document.getElementById('bot-creator').style.display = 'none';
}
    card.innerHTML += `
        <button onclick="loadChatHistory(${bot.id})">Chat</button>
    `;
    return card;




function showBotCreator() {
    document.getElementById('bot-creator').style.display = 'block';
}
    card.innerHTML += `
        <button onclick="loadChatHistory(${bot.id})">Chat</button>
    `;
    return card;
















document.getElementById('message-input')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
