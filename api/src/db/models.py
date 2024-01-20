from sqlalchemy import Boolean, Column, Integer, String, Date
from sqlalchemy.orm import relationship

from .database import Base

class Users(Base):
    __tablename__ = "users"

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    firstName = Column(String)

