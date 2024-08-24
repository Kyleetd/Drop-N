from datetime import date, datetime
from typing import Union, Annotated
from sqlalchemy.orm import Session

from fastapi import FastAPI, Depends, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer

from .db import crud, models, schemas
from .db.database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

from jwt import encode
import logging

logging.basicConfig(level=logging.INFO) 
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

SECRET_KEY = "potato"
ALGORITHM = "HS256"

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Endpoints for users

# # Verifies the authenticity of JWT token & extracts the user's id from the token payload
# def get_current_user(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=401,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         user_id: int = payload.get("sub")
#         if user_id is None:
#             raise credentials_exception
#         return user_id
#     except jwt.ExpiredSignatureError:
#         raise credentials_exception
#     except jwt.InvalidTokenError:
#         raise credentials_exception

# # ID of the authenticated user is then returned in the response 
# @app.get("/users/me")
# async def read_users_me(current_user_id: int = Depends(get_current_user)):
#     return {"current_user_id": current_user_id}
    
@app.post("/user")
async def login(credentials: schemas.UserCredentials, db: Session = Depends(get_db)):
    db_user = crud.login(db, email=credentials.email, password=credentials.password)
    if db_user:
        # Generate JWT token
        token_data = {"sub": db_user.email}
        token = encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
        return {
            "access_token": token,
            "token_type": "bearer",
            "id": db_user.id  
        }
    else:
        raise HTTPException(status_code=422, detail="Invalid login")

@app.post("/user/new")
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = crud.create_user(db, user)
    return new_user.id

@app.put("/user")
async def update_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    updated_user = crud.update_user(db, user)
    return updated_user

@app.get("/users")
async def get_users(db: Session = Depends(get_db)):
    users = crud.get_users(db)
    return users

@app.get("/user/email/{email}")
async def get_user_by_email(email: str, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email)
    return user

@app.get("/user/id/{id}")
async def get_user_by_id(id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, id)
    return user

# Endpoints for leagues
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
    purchases = crud.get_customer_purchases(db, customer_id, date)
    return purchases

@app.post("/purchase")
async def create_purchase(purchase: schemas.PurchaseCreate, db: Session = Depends(get_db)):
    new_purchase = crud.create_purchase(db, purchase)
    return new_purchase