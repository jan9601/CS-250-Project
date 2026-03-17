from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str = "buyer"

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    role: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str

class CropCreate(BaseModel):
    name: str
    plantingDate: str
    price: float
    quantity: int
    description: Optional[str] = None

class CropResponse(BaseModel):
    id: int
    name: str
    plantingDate: str
    predictedHarvestDate: Optional[str]
    confidenceScore: Optional[float]
    price: float
    quantity: int
    status: str
    description: Optional[str]
    class Config:
        from_attributes = True