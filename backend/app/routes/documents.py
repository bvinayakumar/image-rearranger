import traceback
from typing import List

from app.schemas.document import AddDocumentRequest, Document, UpdateDocumentRequest
from app.schemas.response import ErrorResponse, SuccessResponse
from app.utils.logging import log
from app.utils.sqlite_client import add_row, get_all_rows, update_rows
from fastapi import APIRouter

router = APIRouter()


@router.get("/documents", summary="Get all documents")
async def get_documents():
    try:
        docs = get_all_rows("documents")
        documents = [Document(**doc) for doc in docs]
        return documents
    except Exception as e:
        log.error(f"Error fetching documents {e} {traceback.format_exc()}")
        return ErrorResponse(
            message=f"An unexpected error occurred. Please try again later."
        )


@router.post("/documents", summary="Add a document")
async def add_document(body: AddDocumentRequest):
    try:
        add_row("documents", body.dict())
        return SuccessResponse(message="Added document successfully")
    except Exception as e:
        log.error(f"Error adding document {e} {traceback.format_exc()}")
        return ErrorResponse(
            message=f"An unexpected error occurred. Please try again later."
        )


@router.patch("/documents", summary="Update documents")
async def update_documents(body: List[UpdateDocumentRequest]):
    try:
        docs = [doc.dict() for doc in body]
        update_rows("documents", docs)
        return SuccessResponse(message="Updated documents successfully")
    except Exception as e:
        log.error(f"Error updating documents {e} {traceback.format_exc()}")
        return ErrorResponse(
            message=f"An unexpected error occurred. Please try again later."
        )
