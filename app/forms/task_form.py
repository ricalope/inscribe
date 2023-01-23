from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, BooleanField, DateTimeField
from wtforms.validators import DataRequired


class TaskForm(FlaskForm):
    notebook_id = IntegerField("Notebook Id")
    checked = BooleanField("Checked")
    body = StringField("Body", validators=[DataRequired()])
    task_date = DateTimeField("Task Date", format='%Y-%m-%d %H:%M')


class CheckForm(FlaskForm):
    notebook_id = IntegerField("Notebook Id")
    checked = BooleanField("Checked")
