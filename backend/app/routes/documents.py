import traceback
from typing import List

from schemas.document import AddDocumentRequest, Document, UpdateDocumentRequest
from schemas.response import ErrorResponse, SuccessResponse
from utils.logging import log
from utils.sqlite_cloud_client import add_row, get_all_rows, update_rows
from fastapi import APIRouter

router = APIRouter()


@router.get("/", summary="Health check")
async def health_check():
    return SuccessResponse(message="OK")


@router.get(
    "/documents",
    summary="List all documents",
    responses={
        200: {"model": List[Document], "description": "Successful response"},
        500: {
            "model": ErrorResponse,
            "description": "An unexpected error occurred. Please try again.",
        },
    },
)
async def list_documents():
    try:
        docs = get_all_rows("documents")
        documents = [Document(**doc) for doc in docs]
        return documents
    except Exception as e:
        log.error(f"Error fetching documents {e} {traceback.format_exc()}")
        return ErrorResponse(
            message=f"An unexpected error occurred. Please try again later."
        )


@router.post(
    "/documents",
    summary="Add a document",
    responses={
        200: {"model": Document, "description": "Successful response"},
        500: {
            "model": ErrorResponse,
            "description": "An unexpected error occurred. Please try again.",
        },
    },
)
async def add_document(body: AddDocumentRequest):
    try:
        document_id = add_row("documents", body.dict())
        return Document(
            id=document_id, type=body.type, title=body.title, position=body.position
        ).dict()
    except Exception as e:
        log.error(f"Error adding document {e} {traceback.format_exc()}")
        return ErrorResponse(
            message=f"An unexpected error occurred. Please try again later."
        )


@router.patch(
    "/documents",
    summary="Update documents",
    responses={
        200: {"model": SuccessResponse, "description": "Successful response"},
        500: {
            "model": ErrorResponse,
            "description": "An unexpected error occurred. Please try again.",
        },
    },
)
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


@router.delete(
    "/documents/{id}",
    summary="Remove document",
    responses={
        200: {"model": SuccessResponse, "description": "Successful response"},
        500: {
            "model": ErrorResponse,
            "description": "An unexpected error occurred. Please try again.",
        },
    },
)
async def remove_document():
    pass
