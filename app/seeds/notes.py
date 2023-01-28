from app.models import db, Note, Tag, environment, SCHEMA


def seed_notes():
    tag_4 = Tag(
        user_id=1,
        name="coding"
    )

    db.session.add(tag_4)
    db.session.commit()

    note_1 = Note(
        user_id=1,
        notebook_id=1,
        title="Pick up daughter from school",
        body="Wifey is going to be a little late getting off of work today so make sure you pick up daughter from school at 4pm",
    )

    note_2 = Note(
        user_id=2,
        notebook_id=2,
        title="Dont forget to submit the TPS reports you keep messing this up",
        body="Lumberg keeps bothering me about the TPS reports so you need to make sure those get submitted before every EOD"
    )

    note_3 = Note(
        user_id=2,
        notebook_id=3,
        title="Pick up your prescriptions",
        body="pick up family prescriptions from the pharmacy after work"
    )

    note_4 = Note(
        user_id=3,
        title="dont forget",
        body="dont forget to get more css done asap"
    )

    note_5 = Note(
        user_id=1,
        title="dont forget",
        body="dont forget to get more css done asap",
        tag=[tag_4]
    )

    db.session.add(note_1)
    db.session.add(note_2)
    db.session.add(note_3)
    db.session.add(note_4)
    db.session.add(note_5)
    db.session.commit()


def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notes")

    db.session.commit()
