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
    allow_origins=["http://localhost:3001"],
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