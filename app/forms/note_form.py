from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField


class NoteForm(FlaskForm):
    notebook_id = IntegerField('NotebookId')
    title = StringField('Title')
    body = TextAreaField('Body')
