from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class ShortcutForm(FlaskForm):
    user_id = IntegerField("User Id", validators=[DataRequired()])
    note_id = IntegerField("Note Id")
    task_id = IntegerField("Task Id")
    notebook_id = IntegerField("Notebook Id")
