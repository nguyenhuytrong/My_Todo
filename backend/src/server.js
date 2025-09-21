import express from 'express';
import taskRoute from './routes/tasksRouters.js';

const app = express();

app.use("/api/tasks", taskRoute);

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});

