import { Hono } from 'hono';
import { getAllTasks } from '../controllers/task-controllers/get-all-tasks';
import { createTask } from '../controllers/task-controllers/create-task';
import { getTaskById } from '../controllers/task-controllers/get-task-by-id';
import { updateTask } from '../controllers/task-controllers/update-task';
import { deleteTask } from '../controllers/task-controllers/delete-task';
import { authenticateJWT } from '../../middlewares/auth-jwt';

const tasksRouter = new Hono();

tasksRouter.use('*', authenticateJWT);

tasksRouter.get('/user/:userId', async (c) => {
  return getAllTasks(c);
});

tasksRouter.get('/task/:id', async (c) => {
  return getTaskById(c);
});

tasksRouter.post('/create', async (c) => {
  return createTask(c);
});

tasksRouter.put('/update/:id', async (c) => {
  return updateTask(c);
});

tasksRouter.delete('/delete/:id', async (c) => {
  return deleteTask(c);
});

export default tasksRouter;
