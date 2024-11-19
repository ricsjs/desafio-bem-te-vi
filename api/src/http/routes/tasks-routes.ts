import { Hono } from 'hono';
import { getAllTasks } from '../controllers/get-all-tasks';
import { createTask } from '../controllers/create-task';
import { getTaskById } from '../controllers/get-task-by-id';

const tasksRouter = new Hono();

tasksRouter.get('/user/:userId', async (c) => {
  return getAllTasks(c);
});

tasksRouter.get('/task/:id', async (c) => {
  return getTaskById(c);
})

tasksRouter.post('/create', async (c) => {
  return createTask(c);
});

tasksRouter.put('/update/:id', async (c) => {
  return;
});

tasksRouter.delete('/delete/:id', async (c) => {
  return;
});

export default tasksRouter;
