from flask import Blueprint, request, jsonify # pyright: ignore[reportMissingImports]

media_bp = Blueprint('media', __name__)

@media_bp.route('/upload', methods=['POST'])
def upload_media():
    return jsonify({'message': 'Upload media'}), 200

@media_bp.route('/<int:media_id>', methods=['GET'])
def get_media(media_id):
    return jsonify({'message': f'Get media {media_id}'}), 200
