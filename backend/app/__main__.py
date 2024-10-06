import uvicorn


def main():
    uvicorn.run(
        "app.main:app", host="0.0.0.0", port=8080, log_level="info", reload=True
    )


main()
