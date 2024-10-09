# Image Re-arranger Backend

This service is the API backend for image re-arranger frontend application.

# Environment variables

| Name         | Purpose                                                                                |
| ------------ | -------------------------------------------------------------------------------------- |
| DATABASE_URL | SQLite cloud database URL                                                              |
| ORIGINS      | Comma separate list of origins that should be permitted to make cross-origin requests. |

# Pre-requisites

1. Python 3.11.10
2. SQLite Cloud: https://sqlitecloud.io

# Development Setup

1. Set environment variables in `.env` file
2. Run below commands

```bash
python -m venv venv
source venv/bin/activate
pip install -r app/requirements.txt
python app/main.py
```

Swagger API documentation is available at http://localhost:8000/docs
