import { Hono } from 'hono';
import { getAllTasks } from '../controllers/get-all-tasks';

const tasksRouter = new Hono();

tasksRouter.get('/:userId', async (c) => {
  return getAllTasks(c);
});

export default tasksRouter;
