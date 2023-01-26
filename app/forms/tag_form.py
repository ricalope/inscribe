from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class TagForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    note_id = IntegerField("Note Id")
    task_id = IntegerField("Task Id")
