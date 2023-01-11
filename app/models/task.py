from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Task(db.Model):
    __tablename__ = "tasks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("notebooks.id")))
    body = db.Column(db.Text, nullable=False)
    checked = db.Column(db.Boolean, default=False)
    task_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)


    user = db.relationship("User", back_populates="task")
    notebook = db.relationship("Notebook", back_populates="task")


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
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
