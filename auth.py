from flask import Blueprint, request, jsonify # pyright: ignore[reportMissingImports]

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    return jsonify({'message': 'Login endpoint'}), 200

@auth_bp.route('/register', methods=['POST'])
def register():
    return jsonify({'message': 'Register endpoint'}), 200

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    return jsonify({'message': 'Forgot Password endpoint'}), 200

@auth_bp.route('/verify-email', methods=['POST'])
def verify_email():
    return jsonify({'message': 'Verify Email endpoint'}), 200

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    return jsonify({'message': 'Reset Password endpoint'}), 200

@auth_bp.route('/update-profile', methods=['POST'])
def update_profile():
    return jsonify({'message': 'Update Profile endpoint'}), 200
@auth_bp.route('/logout', methods=['POST'])
def logout():
    return jsonify({'message': 'Logout endpoint'}), 200
