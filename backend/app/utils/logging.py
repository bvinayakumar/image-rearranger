import logging

from app.config import get_env_var


def init_logging():
    log_level = get_env_var("LOG_LEVEL", "INFO")
    logging.basicConfig(level=log_level)


log = logging.getLogger("IMAGE RE-ARRANGER")
