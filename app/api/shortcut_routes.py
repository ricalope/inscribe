from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload, selectinload
from app.models import db, Shortcut
from app.forms import ShortcutForm


shortcut_routes = Blueprint('shortcuts', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



@shortcut_routes.route('')
@login_required
def get_all_shortcuts():
    shortcuts = (
        Shortcut.query.filter_by(user_id=current_user.get_id())
        .options(selectinload(Shortcut.note), selectinload(Shortcut.task), selectinload(Shortcut.notebook))
        .all()
    )

    return jsonify([sc.to_dict() for sc in shortcuts])
