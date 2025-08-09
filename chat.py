from flask import Blueprint, jsonify # type: ignore

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/<int:bot_id>', methods=['POST'])
def send_message(bot_id):
    return jsonify({'message': f'Send message to bot {bot_id}'}), 200

@chat_bp.route('/history/<int:bot_id>', methods=['GET'])
def get_chat_history(bot_id):
    return jsonify({'message': f'Get chat history for bot {bot_id}'}), 200
