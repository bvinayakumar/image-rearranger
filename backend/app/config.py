import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())


def get_env_var(key, default_value=None):
    return os.getenv(key, default_value or "")


DATABASE_URL = get_env_var("DATABASE_URL")
DATABASE_NAME = get_env_var("DATABASE_NAME", "backend.db")

PORT = int(get_env_var("PORT", 8000))
