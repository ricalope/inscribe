from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import db, Note


note_routes = Blueprint('notes', __name__)


@note_routes.route('/')
@login_required
def get_all_notes():
    notes = Note.query.all()
    return jsonify([note.to_dict() for note in notes])
