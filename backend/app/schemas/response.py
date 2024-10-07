from typing import Optional
from pydantic import BaseModel


class BaseResponse(BaseModel):
    status: str
    message: Optional[str] = None
    data: Optional[dict] = None


class SuccessResponse(BaseResponse):
    def __init__(self, message) -> None:
        super().__init__(status="success", message=message)


class ErrorResponse(BaseResponse):
    def __init__(self, message) -> None:
        super().__init__(status="failure", message=message)
