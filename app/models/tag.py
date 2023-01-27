from .db import db, environment, SCHEMA, add_prefix_for_prod


class Tag(db.Model):
    __tablename__ = "tags"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.Text, nullable=False)
    note_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("notes.id")))
    task_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tasks.id")))

    user = db.relationship("User", back_populates="tag")
    note = db.relationship("Note", back_populates="tag")
    task = db.relationship("Task", back_populates="tag")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "note_id": self.note_id,
            "task_id": self.task_id
        }
