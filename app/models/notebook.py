from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Notebook(db.Model):
    __tablename__ = 'notebooks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User", back_populates="notebook")
    note = db.relationship("Note", back_populates="notebook", cascade="all, delete-orphan")

    def __repr__(self):
        return f"user_id({self.user_id}) title({self.title})"


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "notes": [n.to_dict() for n in self.note],
            "user_email": self.user.email,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
