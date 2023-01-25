from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Tag


tag_routes = Blueprint('tags', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@tag_routes.route('')
@login_required
def get_all_tags():
    tags = Tag.query.filter_by(user_id=current_user.get_id())
    return jsonify([tag.to_dict() for tag in tags])
