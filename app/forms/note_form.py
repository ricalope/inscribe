from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class NoteForm(FlaskForm):
    notebook_id = IntegerField('NotebookId')
    title = StringField('Title')
    body = TextAreaField('Body')
    starred = BooleanField("Starred")
