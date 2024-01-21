from datetime import date, datetime

from typing import Annotated

from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, dataclasses

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class UserBase(BaseModel):
    email: str
    first_name: str
    last_name: str

class User(UserBase):
    id: int

class UserCreate(UserBase):
    hashed_password: str

class LeagueBase(BaseModel):
    name: str

class League(LeagueBase):
    description: str | None = None
    id: int

class UserUpdate(BaseModel):
    id: int
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    hashed_password: str | None = None



# def fake_decode_token(token):
#     return User(
#         username=token + "fakedecoded", email="john@example.com", full_name="John Doe"
#     )


# async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
#     user = fake_decode_token(token)
#     return user


# @app.get("/users/me")
# async def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):
#     return current_user