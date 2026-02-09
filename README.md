**API Endpoints**

- GET /tasks
  - Returns HTTP 200 and an array of tasks.

- GET /tasks/:id
  - Returns HTTP 200 and the task object, or 404 if not found.

- POST /tasks
  - Body: { title: string, description: string, completed: boolean }
  - Returns HTTP 201 and the created task on success.
  - Returns HTTP 400 for invalid payload.

- PUT /tasks/:id
  - Body: { title: string, description: string, completed: boolean }
  - Returns HTTP 200 and the updated task on success.
  - Returns HTTP 400 for invalid payload, 404 for missing id.

- DELETE /tasks/:id
  - Returns HTTP 200 on success, 404 if task not found.
