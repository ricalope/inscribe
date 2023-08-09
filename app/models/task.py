from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

task_tags = db.Table(
    "task_tags",
    db.Model.metadata,
    db.Column("task_id", db.Integer, db.ForeignKey(add_prefix_for_prod("tasks.id"))),
    db.Column("tag_id", db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")))
)

if environment == "production":
    task_tags.schema = SCHEMA


class Task(db.Model):
    __tablename__ = "tasks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    notebook_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("notebooks.id"))
    )
    body = db.Column(db.Text, nullable=False)
    checked = db.Column(db.Boolean, default=False)
    task_date = db.Column(db.DateTime)
    starred = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="task")
    notebook = db.relationship("Notebook", back_populates="task")
    tag = db.relationship("Tag", secondary=task_tags, back_populates="task")

    def set_updated_at(self):
        self.updated_at = datetime.utcnotw()

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "notebook_id": self.notebook_id,
            "body": self.body,
            "checked": self.checked,
            "task_date": self.task_date,
            "starred": self.starred,
            "tags": [t.to_dict() for t in self.tag if self.tag],
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
