import { Hono } from 'hono';
import { getAllTasks } from '../controllers/get-all-tasks';
import { createTask } from '../controllers/create-task';

const tasksRouter = new Hono();

tasksRouter.get('/:userId', async (c) => {
  return getAllTasks(c);
});

tasksRouter.post('/create', async (c) => {
  return createTask(c);
});

export default tasksRouter;
