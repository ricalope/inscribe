from app.models import db, Shortcut, environment, SCHEMA


def seed_shortcuts():
    sc_1 = Shortcut(
        user_id=1,
        note_id=1,
        task_id=1,
        notebook_id=1
    )

    db.session.add(sc_1)
    db.session.commit()


def undo_shortcuts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shortcuts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notebooks")

    db.session.commit()
