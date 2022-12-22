from app.models import db, Notebook, environment, SCHEMA


def seed_notebooks():
    notebook_1 = Notebook(
        user_id=1,
        title="Notebook 1"
    )

    notebook_2 = Notebook(
        user_id=2,
        title="Shopping Notes"
    )

    notebook_3 = Notebook(
        user_id=3,
        title="Checklist"
    )

    db.session.add(notebook_1)
    db.session.add(notebook_2)
    db.session.add(notebook_3)
    db.session.commit()


def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notebooks")

    db.session.commit()
