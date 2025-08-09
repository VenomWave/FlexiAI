from flask import Blueprint, request, jsonify # pyright: ignore[reportMissingImports]

bot_bp = Blueprint('bot', __name__)

@bot_bp.route('/', methods=['GET'])
def get_bots():
    return jsonify({'message': 'Get all bots'}), 200

@bot_bp.route('/', methods=['POST'])
def create_bot():
    return jsonify({'message': 'Create bot'}), 201

@bot_bp.route('/<int:bot_id>', methods=['GET'])
def get_bot(bot_id):
    return jsonify({'message': f'Get bot {bot_id}'}), 200

@bot_bp.route('/<int:bot_id>', methods=['PUT'])
def update_bot(bot_id):
    return jsonify({'message': f'Update bot {bot_id}'}), 200
    socketio.run(app, debug=True, host='    0.0.0', port=5000)          
    


@bot_bp.route('/<int:bot_id>', methods=['DELETE'])
def delete_bot(bot_id):
    return jsonify({'message': f'Delete bot {bot_id}'}), 204
