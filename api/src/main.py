from datetime import date, datetime
from typing import Union, Annotated
from sqlalchemy.orm import Session

from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer

from .db import crud, models, schemas
from .db.database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],     
    allow_headers=["*"],   
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

models.Base.metadata.create_all(bind=engine)

# TODO Authentication
# getter for authentication process
# @app.get("/user/")
# async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
#     return {"token": token}

# @app.get("/users/me")
# async def read_users_me(current_user: Annotated[schemas.User, Depends(schemas.get_current_user)]):
#     return current_user


## Log user in
@app.post("/user")
async def login(email: str, password: str, db: Session = Depends(get_db)):
    user = crud.login(db, email, password)
    return user

## Create new user
@app.post("/user/new")
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = crud.create_user(db, user)
    return new_user

## Update user
@app.put("/user")
async def update_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    updated_user = crud.update_user(db, user)
    return update_user

## Get All Users
@app.get("/users")
async def get_users(db: Session = Depends(get_db)):
    users = crud.get_users(db)
    return users

## Get User by email
@app.get("/user/email/{email}")
async def get_user_by_email(email: str, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email)
    return user

## Get User by id
@app.get("/user/id/{id}")
async def get_user_by_id(id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, id)
    return user


# endpoints for leagues
@app.get("/leagues")
async def get_leagues(db: Session = Depends(get_db)):
    leagues = crud.get_leagues(db)
    return leagues

@app.get("/league/{id}")
async def get_league_by_id(id: int, db: Session = Depends(get_db)):
    league = crud.get_league_by_id(db, id)
    return league

@app.get("/leagues/{key_word}")
async def get_leagues_by_key_word(key_word: str, db: Session = Depends(get_db)):
    leagues = crud.get_leagues_by_key_word(db, key_word)
    return leagues

@app.post("/leagues")
async def create_league(league: schemas.LeagueCreate, db: Session = Depends(get_db)):
    new_league = crud.create_league(db, league)
    return new_league

@app.put("/leagues")
async def update_league(league: schemas.LeagueUpdate, db: Session = Depends(get_db)):
    updated_league = crud.update_league(db, league)
    return updated_league

# Endpoints for events
@app.get("/events")
async def get_all_events(db: Session = Depends(get_db)):
    events = crud.get_all_events(db)
    return events

@app.get("/future_league_events/{datetime}/{league_id}")
async def get_future_league_events(datetime: datetime, league_id: int, db: Session = Depends(get_db)):
    events = crud.get_all_league_events(db, datetime, league_id)
    return events

@app.post("/event")
async def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    new_event = crud.create_event(db, event)
    return new_event

@app.put("/event")
async def update_event(event: schemas.EventUpdate, db: Session = Depends(get_db)):
    updated_event = crud.update_event(db, event)
    return updated_event

@app.delete("/event/{id}")
async def delete_event(id: int, db: Session = Depends(get_db)):
    delete_event = crud.update_event(db, id)
    return "Event with id " + id + " was successfully deleted"

# Endpoints for purchases
@app.get("/purchases")
async def get_purchases(db: Session = Depends(get_db)):
    purchases = crud.get_purchases(db)
    return purchases

@app.get("/purchases/{customer_id}/{date}")
async def get_purchases(customer_id: int, date: date, db: Session = Depends(get_db)):
    purchases = crud.get_customer_pruchases(db, customer_id, date)
    return purchases

@app.post("/purchase")
async def create_pruchase(pruchase: schemas.PurchaseCreate, db: Session = Depends(get_db)):
    new_pruchase = crud.create_purchase(db, pruchase)
    return new_pruchase

# @app.put("/pruchase")
# async def update_pruchase(pruchase: schemas.PurchaseUpdate, db: Session = Depends(get_db)):
#     updated_pruchase = crud.update_event(db, pruchase)
#     return updated_pruchase