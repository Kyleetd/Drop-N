from sqlalchemy.orm import Session

from . import models, schemas

def login(db: Session, email: str, password: str):
    return db.query(models.User).filter(models.User.email == email and models.User.hashed_password == password).first()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    user.hashed_password = user.hashed_password + "notreallyhashed"
    db_user = models.User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.id == user.id).first()
    if user.hash_password not in [None, ""]:
        db_user.hash_password = user.hash_password + "notreallyhashed"
    if user.first_name not in [None, ""]:
        db_user.first_name = user.first_name
    if user.last_name not in [None, ""]:
        db_user.last_name = user.last_name
    if user.email not in [None, ""]:
        db_user.email = user.email
    db.commit()
    db.refresh(db_user)
    return db_user

def create_league(db: Session, league: schemas.LeagueCreate):
    db_league = db.query(league.model_dump())