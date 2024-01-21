from datetime import date, datetime

from typing import Annotated

from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, dataclasses

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class UserBase(BaseModel):
    phone_number: int | None = None

class User(UserBase):
    id: int
    email: str
    first_name: str
    last_name: str

class UserCreate(UserBase):
    first_name: str
    last_name: str
    email: str
    password: str

class UserUpdate(UserBase):
    id: int
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    password: str | None = None




class LeagueBase(BaseModel):
    name: str

class LeagueCreate(LeagueBase):
    description: str | None = None
    membership_cost: float
    drop_in_cost: float
    president_id: int


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