from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Notebook


notebook_routes = Blueprint('notebooks', __name__)


@notebook_routes.route('')
@login_required
def get_all_notebooks():
    notebooks = Notebook.query.filter_by(user_id=current_user.get_id())
    return jsonify([notebook.to_dict() for notebook in notebooks])
