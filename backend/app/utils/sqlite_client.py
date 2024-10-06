import sqlite3
from typing import List

from app.utils.logging import log


def init_db():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
            CREATE TABLE IF NOT EXISTS documents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL,
                title TEXT NOT NULL,
                position INTEGER
            )
        """
    )
    initial_data = [
        (1, "bank-draft", "Bank Draft", 0),
        (2, "bill-of-lading", "Bill of Lading", 1),
        (3, "invoice", "Invoice", 2),
        (4, "bank-draft-2", "Bank Draft 2", 3),
        (5, "bill-of-landing-2", "Bill of Lading 2", 4),
    ]
    cursor.executemany(
        "INSERT INTO documents (id, type, title, position) VALUES (?, ?, ?, ?) ON CONFLICT DO NOTHING",
        initial_data,
    )

    cursor.close()
    connection.commit()
    connection.close()


def get_db_connection():
    try:
        return sqlite3.connect("backend.db")
    except Exception as e:
        log.info(f"Failed to connect to database: {e}")
        raise


def get_all_rows(table_name: str):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM documents")
        rows = cursor.fetchall()

        result = to_json_list(cursor, rows)

        cursor.close()
        connection.commit()
        connection.close()

        return result
    except Exception as e:
        log.info(f"Failed to fetch data from {table_name}: {e}")
        raise


def add_row(table_name: str, data: dict):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        columns = data.keys()
        values = [data[column] for column in columns]

        cursor.execute(
            f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES ({', '.join('?' * len(values))})",
            values,
        )

        cursor.close()
        connection.commit()
        connection.close()
    except Exception as e:
        log.info(f"Failed to add data to {table_name}: {e}")
        raise


def update_rows(table_name: str, update_data: List[dict]):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        for data in update_data:
            columns = [
                column
                for column in data.keys()
                if data[column] is not None and column != "id"
            ]

            placeholders = [f"{column} = ?" for column in columns]

            values = [data[column] for column in columns]
            values.append(data["id"])

            cursor.execute(
                f"UPDATE {table_name} SET {', '.join(placeholders)} WHERE id = ?",
                values,
            )

        cursor.close()
        connection.commit()
        connection.close()
    except Exception as e:
        log.info(f"Failed to add data to {table_name}: {e}")
        raise


def to_json_list(cursor, rows):
    result = []
    columns = [description[0] for description in cursor.description]
    for row in rows:
        result.append(dict(zip(columns, row)))
    return result
