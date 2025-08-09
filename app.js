const API_BASE_URL = 'http://localhost:5000/api';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadUserBots();
});

function showBotCreator() {
    document.getElementById('bot-creator').style.display = 'block';
    document.getElementById('hero').style.display = 'none';
}

function hideBotCreator() {
    document.getElementById('bot-creator').style.display = 'none';
    document.getElementById('hero').style.display = 'flex';
}

async function createBot(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('bot-name').value,
        description: document.getElementById('bot-description').value,
        prompts: JSON.parse(document.getElementById('bot-prompts').value),
        capabilities: Array.from(document.querySelectorAll('.capabilities input:checked')).map(cb => cb.value)
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/bots/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert(`Bot created successfully! URL: ${data.bot_url}`);
            hideBotCreator();
            loadUserBots();
        } else {
            alert('Error creating bot: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating bot');
    }
}

async function loadUserBots() {
    try {
        const response = await fetch(`${API_BASE_URL}/bots/user`);
        const bots = await response.json();
        
        const botsContainer = document.getElementById('my-bots') || createBotsContainer();
        botsContainer.innerHTML = '<h3>My Bots</h3>';
        
        bots.forEach(bot => {
            const botCard = createBotCard(bot);
            botsContainer.appendChild(botCard);
        });
    } catch (error) {
        console.error('Error loading bots:', error);
    }
}

function createBotsContainer() {
    const container = document.createElement('section');
    container.id = 'my-bots';
    container.className = 'my-bots';
    document.querySelector('main').appendChild(container);
    return container;
}

function createBotCard(bot) {
    const card = document.createElement('div');
    card.className = 'bot-card';
    card.innerHTML = `
        <h4>${bot.name}</h4>
        <p>${bot.description}</p>
        <p>URL: <a href="${bot.unique_url}" target="_blank">${bot.unique_url}</a></p>
        <button onclick="openChat('${bot.id}', '${bot.name}')">Chat</button>
        <button onclick="shareBot('${bot.unique_url}')">Share</button>
    `;
    return card;
}

function openChat(botId, botName) {
    document.getElementById('chat-bot-name').textContent = botName;
    document.getElementById('chat-interface').style.display = 'flex';
    loadChatHistory(botId);
}

function closeChat() {
    document.getElementById('chat-interface').style.display = 'none';
}

function shareBot(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('Bot URL copied to clipboard!');
    });
}

document.getElementById('bot-form')?.addEventListener('submit', createBot);
