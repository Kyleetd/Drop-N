from sqlalchemy.orm import Session

from . import models, schemas

# Users CRUD
def login(db: Session, email: str, password: str):
    return db.query(models.User).filter(models.User.email == email and models.User.password == password).first()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session):
    return db.query(models.User).all()

def create_user(db: Session, user: schemas.UserCreate):
    user.password = user.password + "notreallyhashed"
    db_user = models.User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.id == user.id).first()
    if user.password not in [None, ""]:
        db_user.password = user.password + "notreallyhashed"
    if user.first_name not in [None, ""]:
        db_user.first_name = user.first_name
    if user.last_name not in [None, ""]:
        db_user.last_name = user.last_name
    if user.email not in [None, ""]:
        db_user.email = user.email
    db.commit()
    db.refresh(db_user)
    return db_user

# Leagues CRUD
def create_league(db: Session, league: schemas.LeagueCreate):
    db_league = models.League(**league.model_dump())
    db.add(db_league)
    db.commit()
    db.refresh(db_league)
    return db_league

def get_leagues(db: Session):
    return db.query(models.League).all()

# Events CRUD
def create_event(db: Session, event: schemas.EventCreate):
    db_event = models.Event(**event.model_dump())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

def get_events(db: Session):
    return db.query(models.Event).all()

# Purchases CRUD
def create_purchase(db: Session, purchase: schemas.PurchaseCreate):
    db_purchase = models.League(**purchase.model_dump())
    db.add(db_purchase)
    db.commit()
    db.refresh(db_purchase)
    return db_purchase
    
def get_purchases(db: Session):
    return db.query(models.Purchase).all()