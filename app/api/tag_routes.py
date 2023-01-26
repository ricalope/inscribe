from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Tag
from app.forms import TagForm


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


@tag_routes.route('', methods=["POST"])
@login_required
def create_new_tag():
    form = TagForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_tag = Tag(
            user_id=current_user.get_id(),
            name=form.data['name'],
            note_id=form.data['note_id'],
            task_id=form.data['task_id']
        )

        db.session.add(new_tag)
        db.session.commit()
        return new_tag.to_dict()

    return { "errors": validation_errors_to_error_messages(form.errors) }, 401


@tag_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_tag_route(id):
    tag = Tag.query.get(id)

    if not tag:
        return { "errors": "Tag could not be found. Please try again." }

    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        tag.name = form.data['name']
        tag.task_id = form.data['task_id']
        tag.note_id = form.data['note_id']

        db.session.commit()
        return tag.to_dict()

    return { "errors": validation_errors_to_error_messages(form.errors) }, 401
