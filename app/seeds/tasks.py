from app.models import db, Task, environment, SCHEMA
from datetime import datetime


def seed_tasks():
    task_1 = Task(
        user_id=1,
        notebook_id=1,
        body="pick up milk",
        checked=False,
        task_date=datetime(2023, 2, 15, 14, 00, 00)
    )

    task_2 = Task(
        user_id=2,
        notebook_id=2,
        body="dont forget to get prescriptions",
        checked=False
    )

    task_3 = Task(
        user_id=3,
        body="dr's appointment on february 21st",
        checked=False,
        task_date=datetime(2023, 2, 20, 11, 30, 00)
    )

    db.session.add(task_1)
    db.session.add(task_2)
    db.session.add(task_3)
    db.session.commit()


def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")

    db.session.commit()
