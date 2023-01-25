from app.models import db, Tag, environment, SCHEMA


def seed_tags():
    tag_1 = Tag(
        user_id=1,
        name="to-do",
        task_id=1,
        note_id=1
    )

    tag_2 = Tag(
        user_id=2,
        name="honey-do",
        note_id=2
    )

    tag_3 = Tag(
        user_id=3,
        name="current",
        task_id=3
    )

    db.session.add(tag_1)
    db.session.add(tag_2)
    db.session.add(tag_3)
    db.session.commit()


def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")

    db.session.commit()
