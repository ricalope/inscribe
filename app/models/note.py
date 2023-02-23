from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


note_tags = db.Table(
    'note_tags',
    db.Model.metadata,
    db.Column('note_id', db.Integer, db.ForeignKey(add_prefix_for_prod("notes.id"))),
    db.Column('tag_id', db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")))
)


if environment == "production":
    note_tags.schema = SCHEMA


class Note(db.Model):
    __tablename__ = "notes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("notebooks.id")))
    title = db.Column(db.Text, nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.Text, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.Text, nullable=False, default=datetime.utcnow)

    user = db.relationship("User", back_populates="note")
    notebook = db.relationship("Notebook", back_populates="note")
    tag = db.relationship("Tag", secondary=note_tags, back_populates="note")

    def set_updated_at(self):
        self.updated_at = datetime.utcnow()

    def __repr__(self):
        return f"user_id({self.user_id}) title({self.title}) body({self.body})"

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "notebook_id": self.notebook_id,
            "title": self.title,
            "body": self.body,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "tags": [t.to_dict() for t in self.tag],
            "tag_id": [t.id for t in self.tag]
        }
