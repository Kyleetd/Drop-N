from sqlalchemy import Boolean, Column, Integer, String, Date
from sqlalchemy.orm import relationship

from .database import Base

class Users(Base):
    __tablename__ = "users"

