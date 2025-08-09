# FlexiAI - Complete AI Chatbot Generator

## 🚀 Overview
FlexiAI is a comprehensive web application that generates AI chatbots with multimedia capabilities including video/photo generation, web search, voice chat, and more.

## 📋 Features
- ✅ AI chatbot generation with unique URLs
- ✅ Multimedia generation (videos, photos)
- ✅ Web search capabilities
- ✅ Voice chat functionality
- ✅ Voice chat functionality
- ✅ Real-time chat with WebSocket support
- ✅ Responsive web interface

## 🛠️ Tech Stack
- **Backend**: Python (Flask), PostgreSQL
- **Frontend**: HTML5, CSS3, JavaScript
- **Real-time**: WebSocket
- **AI Services**: OpenAI API, Whisper, Stable Diffusion

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- PostgreSQL
- Node.js (for development)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/flexiai.git
cd flexiai
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. **Database Setup**
```bash
createdb flexiai
python app.py
```

4. **Frontend Setup**
```bash
cd frontend
# No build process needed - pure HTML/CSS/JS
```

5. **Environment Variables**
Create `.env` file in backend directory:
```env
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@localhost/flexiai
```

### Running the Application

1. **Start Backend**
```bash
cd backend
python app.py
```

2. **Access Application**
Open browser to: `http://localhost:5000`

## 📖 Usage Guide

### Creating a Bot
1. Click "Create Your First Bot"
2. Fill in bot details and prompts
3. Select capabilities (text, image, video generation, etc.)
4. Submit and get unique bot URL

### Chatting with Bots
1. Visit your bot's unique URL
2. Type messages in the chat interface
3. Get AI responses with multimedia support

### Voice Chat
1. Click the microphone icon in chat
2. Speak your message
3. Get voice responses

## 🔧 API Endpoints

- `POST /api/bots/create` - Create new bot
- `POST /api/chat/:bot_id` - Chat with bot
- `POST /api/generate-media` - Generate images/videos
- `POST /api/search` - External search
- `POST /api/voice` - Voice processing

## 🎯 Next Steps

1. **Deploy to production** (AWS, Heroku, etc.)
2. **Add more AI capabilities** (music generation, code generation)
3. **Implement user authentication**
4. **Add analytics dashboard**
5. **Create mobile app**

## 📞 Support
For issues or questions, please open an issue on GitHub or contact support@flexiai.app
