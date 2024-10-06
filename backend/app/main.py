from fastapi import FastAPI
from app.routes.documents import router as documents_router
from app.utils.logging import init_logging
from app.utils.sqlite_client import init_db

app = FastAPI()

init_logging()
init_db()

app.include_router(documents_router)
