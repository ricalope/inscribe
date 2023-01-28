from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Notebook
from app.forms import NotebookForm


notebook_routes = Blueprint('notebooks', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@notebook_routes.route('')
@login_required
def get_all_notebooks():
    notebooks = Notebook.query.filter_by(user_id=current_user.get_id())
    return jsonify([notebook.to_dict() for notebook in notebooks])


@notebook_routes.route('', methods=["POST"])
@login_required
def post_new_notebook():
    form = NotebookForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_notebook = Notebook(
            user_id=current_user.get_id(),
            title=form.data['title']
        )
        db.session.add(new_notebook)
        db.session.commit()
        return new_notebook.to_dict()

    return { "errors": validation_errors_to_error_messages(form.errors) }, 401


@notebook_routes.route('/<int:id>')
@login_required
def get_one_notebook(id):
    notebook = Notebook.query.get(id)

    if not notebook:
        return { "errors": "Notebook could not be found" }, 404

    return notebook.to_dict()


@notebook_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_notebook_by_id(id):
    notebook = Notebook.query.get(id)
    if not notebook:
        return { "message": "Notebook could not be found" }, 404
    db.session.delete(notebook)
    db.session.commit()
    return { "message": "successfully deleted" }


@notebook_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_notebook_by_id(id):
    notebook = Notebook.query.get(id)
    if not notebook:
        return { "message": "Notebook could not be found" }, 404
    form = NotebookForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        notebook.title = form.data['title']
        notebook.set_updated_at()
        db.session.commit()
        return notebook.to_dict()

    return { "errors": validation_errors_to_error_messages(form.errors) }, 401
