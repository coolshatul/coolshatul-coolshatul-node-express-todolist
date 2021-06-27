# RESTful API Node TodoList

## Installation

Clone the repo:

```bash
git clone --depth 1 https://github.com/coolshatul/node-express-todolist.git
cd node-express-todolist

```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp env.example env

# open env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
npm dev
```

Running in production:

```bash
npm start
```

## Environment Variables

The environment variables can be found and modified in the `env` file. They come with these default values:

```bash
# Port number
PORT=5000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/toDo
```

### API Endpoints

List of available routes:

**Task routes**:\
`POST /api/task` - create a task\
`GET /api/task` - get all tasks\
`GET /api/task/:id` - get task\
`PUT /api/task/:id` - update task\
`DELETE /api/task/:id` - delete task\
`POST /api/filterTask` - filter a tasks\
`POST /api/orderTask` - add order to tasks

### API Documentation
```
https://documenter.getpostman.com/view/8187201/Tzef92zk
```