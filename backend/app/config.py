import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())


def get_env_var(key, default_value=None):
    return os.getenv(key, default_value or "")
