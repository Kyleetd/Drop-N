from sqlalchemy import Boolean, Column, Integer, String, Date, Numeric, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship

from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    password = Column(String)
    phone_number = Column(Integer)
    

class League(Base):
    __tablename__ = "leagues"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    description = Column(String)
    membership_cost = Column(Numeric(precision=10, scale=2))
    drop_in_cost = Column(Numeric(precision=10, scale=2))
    president_id = Column(Integer)


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)

    league_id = Column(Integer, ForeignKey('leagues.id'), index=True)

    start_time = Column(DateTime)
    end_time = Column(DateTime)

class Purchase(Base):
    __tablename__ = "purchases"
    
    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey('users.id'), index=True)
    league_id = Column(Integer, ForeignKey('leagues.id'), index=True)
    event_id = Column(Integer, ForeignKey('events.id'), index=True)

    payment_method = Column(Enum('visa', 'mastercard', 'cash'))
    purchase_type = Column(Enum('league', 'event'))
