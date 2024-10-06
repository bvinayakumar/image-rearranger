from pydantic import BaseModel
from typing import Optional


class Document(BaseModel):
    id: int
    type: str
    title: str
    position: Optional[int] = None


class AddDocumentRequest(BaseModel):
    type: str
    title: str
    position: Optional[int] = None


class UpdateDocumentRequest(BaseModel):
    id: int
    type: Optional[str] = None
    title: Optional[str] = None
    position: Optional[int] = None
