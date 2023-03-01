from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Note
from app.forms import NoteForm


note_routes = Blueprint('notes', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@note_routes.route('')
@login_required
def get_all_notes():
    notes = Note.query.filter_by(user_id=current_user.get_id())
    return jsonify([note.to_dict() for note in notes])


@note_routes.route('', methods=["POST"])
@login_required
def post_new_note():
    form = NoteForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_note = Note(
            user_id=current_user.get_id(),
            notebook_id=form.data['notebook_id'],
            title=form.data['title'],
            body=form.data['body'],
            starred=form.data['starred']
        )
        db.session.add(new_note)
        db.session.commit()
        return new_note.to_dict()

    return { "errors": validation_errors_to_error_messages(form.errors) }, 401


@note_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_note_by_id(id):
    note = Note.query.get(id)
    form = NoteForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        note.title = form.data['title']
        note.body = form.data['body']
        note.starred = form.data['starred']
        note.set_updated_at()
        db.session.commit()
        return note.to_dict()

    return { "errors": validation_errors_to_error_messages(form.errors) }, 401


@note_routes.route('/<int:id>')
@login_required
def get_note_by_id(id):
    note = Note.query.get(id)
    return note.to_dict()


@note_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_note_by_id(id):
    note = Note.query.get(id)
    db.session.delete(note)
    db.session.commit()
    return { "message": "successfully deleted" }
