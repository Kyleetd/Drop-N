from datetime import date, datetime

from typing import Annotated

from fastapi import Depends, FastAPI
# from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, dataclasses

app = FastAPI()

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

class UserCredentials(BaseModel):
    email: str
    password: str

# League Schemas
class LeagueBase(BaseModel):
    description: str | None = None

class LeagueCreate(LeagueBase):
    name: str
    membership_cost: float
    drop_in_cost: float
    president_id: int

class League(LeagueCreate):
    id: int

class LeagueUpdate(LeagueBase):
    id: int
    name: str | None = None
    membership_cost: float | None = None
    drop_in_cost: float | None = None
    president_id: int | None = None

# Event Schemas
class EventBase(BaseModel):
    league_id: int

class EventCreate(EventBase):
    start_time: datetime
    end_time: datetime

class Event(EventCreate):
    event_id: int

class EventUpdate(EventBase):
    event_id: int
    start_time: datetime | None = None
    end_time: datetime | None = None
    
# Purchase Schemas
class PurchaseBase(BaseModel):
    event_id: int | None = None

class PurchaseCreate(PurchaseBase):
    user_id: int
    league_id: int
    date_time: datetime
    payment_method: str
    purchase_type: str

class Pruchase(PurchaseCreate):
    pruchase_id: int