# Image Re-arranger

Image re-arranger is an application that displays images in a grid and lets you re-arrange it using drag and drop.

This application is composed of a frontend application and a backend application.

# Pre-requisites

Create an SQLite cloud database `backend.db` at https://sqlitecloud.io

# Development Setup

1. Both the frontend and backend applications can be run using `docker-compose`.
2. In `docker-compose.yml`, update `DATABASE_URL` with SQLite cloud connection string.

```bash
docker-compose up
```

# Production Deployment

Frontend application is deployed at https://image-rearranger.vercel.app
Backend application is deployed at https://image-rearranger-backend.vercel.app

# Solution Approach (Part 1 to Part 4)

The solution is developed in 4 parts as per the [problem specification](PROBLEM_SPECIFICATION.pdf). The code changes for each part is done on respective branch (e.g. `part1`). `main` branch has the code changes for the entire solution.

```bash
$ git branch
* main
  part1
  part2
  part3
  part4
```

SQLite cloud is used to store persistent data as file system is not accessible on serverless backend deployments using `vercel`.

# Part 5: General questions

API documentation for list, add, update and remove of documents is available at https://image-rearranger-backend.vercel.app/docs.

Few improvements to the APIs:

1. Authorization
2. Pagination (using `offset` and `limit`) for list documents API
3. Ordering of documents by `position` for list documents API
