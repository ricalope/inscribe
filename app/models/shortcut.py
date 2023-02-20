from .db import db, environment, SCHEMA, add_prefix_for_prod


class Shortcut(db.Model):
    __tablename__ = "shortcuts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    note_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("notes.id")))
    task_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tasks.id")))
    notebook_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("notebooks.id")))

    user = db.relationship("User", back_populates="shortcut")
    note = db.relationship("Note", back_populates="shortcut")
    task = db.relationship("Task", back_populates="shortcut")
    notebook = db.relationship("Notebook", back_populates="shortcut")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "note_id": self.note_id,
            "task_id": self.task_id,
            "notebook_id": self.notebook_id,
            "notebooks": self.notebook.to_dict(),
            "notes": self.note.to_dict(),
            "tasks": self.task.to_dict()
        }
