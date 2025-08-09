from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # pyright: ignore[reportMissingModuleSource]
from flask_socketio import SocketIO # pyright: ignore[reportMissingModuleSource]
from flask_sqlalchemy import SQLAlchemy # pyright: ignore[reportMissingImports]
import os
from dotenv import load_dotenv # pyright: ignore[reportMissingImports]

load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///flexiai.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
CORS(app)
db = SQLAlchemy(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Import models (must be after db initialization)
from models.bot import Bot
from models.chat import Chat

# Import and register blueprints
from routes.auth import auth_bp
from routes.bot import bot_bp
from routes.chat import chat_bp
from routes.media import media_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(bot_bp, url_prefix='/api/bots')
app.register_blueprint(chat_bp, url_prefix='/api/chat')
app.register_blueprint(media_bp, url_prefix='/api/media')

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400

@app.route('/')
def index():
    return jsonify({
        'message': 'FlexiAI API is running',
        'version': '1.0.0',
        'endpoints': {
            'auth': '/api/auth',
            'bots': '/api/bots',
            'chat': '/api/chat',
            'media': '/api/media'
        }
    })

@app.route('/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'database': 'connected'
    })

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
