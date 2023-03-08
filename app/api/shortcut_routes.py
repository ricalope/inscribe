from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Note, Task, Notebook
from app.forms import NoteForm, TaskForm, NotebookForm
from sqlalchemy import and_


shortcut_routes = Blueprint('shortcuts', __name__)


@shortcut_routes.route('')
@login_required
def get_all_shortcuts():
    notes = Note.query.filter(and_(Note.starred == True, Note.user_id == current_user.get_id())).all()
    tasks = Task.query.filter(and_(Task.starred == True, Task.user_id == current_user.get_id())).all()
    notebooks = Notebook.query.filter(and_(Notebook.starred == True, Notebook.user_id == current_user.get_id())).all()

    results = { "notes": [], "tasks": [], "notebooks": [] }

    for note in notes:
        note_dict = note.to_dict()
        results["notes"].append(note_dict)
    for task in tasks:
        task_dict = task.to_dict()
        results["tasks"].append(task_dict)
    for nb in notebooks:
        nb_dict = nb.to_dict()
        results["notebooks"].append(nb_dict)

    return jsonify(results)


@shortcut_routes.route('/notes/<int:id>', methods=["PUT"])
@login_required
def add_note_shortcut(id):
    note = Note.query.get(id)
    form = NoteForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        note.starred = form.data['starred']
        db.session.commit()
        return note.to_dict()
