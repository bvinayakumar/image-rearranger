from fastapi import FastAPI
from config import PORT
from routes.documents import router as documents_router
from utils.logging import init_logging
from utils.sqlite_cloud_client import init_db

app = FastAPI()

init_logging()
init_db()

app.include_router(documents_router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=PORT)
