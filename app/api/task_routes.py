from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Task
from app.forms import TaskForm, CheckForm


task_routes = Blueprint('tasks', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@task_routes.route('')
@login_required
def get_all_tasks():
    tasks = Task.query.filter_by(user_id=current_user.get_id())
    return jsonify([task.to_dict() for task in tasks])


@task_routes.route('', methods=["POST"])
@login_required
def create_new_task():
    form = TaskForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_task = Task(
            user_id=current_user.get_id(),
            notebook_id=form.data['notebook_id'],
            body=form.data['body'],
            task_date=form.task_date.data
        )
        db.session.add(new_task)
        db.session.commit()
        return new_task.to_dict()

    return { "errors": validation_errors_to_error_messages(form.errors) }, 401


@task_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_task_route(id):
    form = TaskForm()

    task = Task.query.get(id)
    if not task:
        return { "errors": "Task could not be found. Please try again." }

    form['csrf_token'].data = request.cookies['csrf_token']
    print('<<<form>>>', form.data)

    if form.validate_on_submit():
        task.notebook_id = form.data['notebook_id']
        task.checked = form.data['checked']
        task.body = form.data['body']
        task.task_date = form.task_date.data
        db.session.commit()
        return task.to_dict()

    return { "errors": validation_errors_to_error_messages(form.errors) }, 401


@task_routes.route('/<int:id>')
@login_required
def get_one_task(id):
    one_task = Task.query.get(id)
    if not one_task:
        return { "errors": "Task could not be found. Please try again." }
    return one_task.to_dict()
