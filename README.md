# Task Manager API

Brief, in-memory Express.js REST API for creating and managing tasks.

## Overview

Small demo API used in tests and local development. Data is stored in-memory; restarting the server clears tasks.

## Prerequisites

- Node.js (v12+)
- npm

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run locally:

```bash
node app.js
# or
npm start
```

3. Run tests:

```bash
npm test
```

The server listens on port 4000 by default.

## Notes

- `app.listen` is conditional in `app.js` so the test runner can import the app without starting the server.
- Data is stored in-memory for simplicity.

## API Endpoints

### GET /tasks

Description: Retrieve all tasks

Response: 200 OK

Example:

```bash
curl http://localhost:4000/tasks
```

### GET /tasks/:id

Description: Retrieve single task by id

Response: 200 OK (task object) or 404 Not Found

Example:

```bash
curl http://localhost:4000/tasks/1
```

### POST /tasks

Description: Create a new task

Request body (JSON):

```json
{
  "title": "string",
  "description": "string",
  "completed": false
}
```

Response: 201 Created (created task) or 400 Bad Request for invalid payload

Example:

```bash
curl -X POST http://localhost:4000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Desc","completed":false}'
```

### PUT /tasks/:id

Description: Replace an existing task

Request body: same shape as POST

Response: 200 OK (updated task), 400 Bad Request (invalid payload), or 404 Not Found (invalid id)

Example:

```bash
curl -X PUT http://localhost:4000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","description":"Updated desc","completed":true}'
```

### DELETE /tasks/:id

Description: Delete a task

Response: 200 OK on success, 404 Not Found if id doesn't exist

Example:

```bash
curl -X DELETE http://localhost:4000/tasks/1
```

## Testing the API

The project includes tests using `tap` + `supertest`.

Run the full test suite:

```bash
npm test
```

If you want to exercise endpoints manually, use the `curl` examples above or Postman.

## License

MIT
