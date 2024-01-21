from typing import Union, Annotated
from sqlalchemy.orm import Session

from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer

from .db import crud, models, schemas
from .db.database import SessionLocal, engine

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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
async def login(user: schemas.User, db: Session = Depends(get_db)):
    user = crud.create_user(user)
    return user

##