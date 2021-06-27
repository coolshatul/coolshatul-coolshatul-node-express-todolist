const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const path = require('path');
const httpStatus = require('http-status');

const todoRoute = require('./routes/todo');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

let server;
const connectDB = require('./config/db');
dotenv.config({ path: './env' })
connectDB()

const app = express();
app.use(express.json())

if (process.env.MODE === 'development') {
    app.use(morgan('dev'))
}
const PORT = process.env.PORT || 5000;

app.use('/api/task', todoRoute)

app.get('/', (req, res) => {
    res.send('API is running good')
})
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

server = app.listen(PORT, console.log(`Server is running on port ${PORT}`.yellow.bold));

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});