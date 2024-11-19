import { Hono } from 'hono';
import tasksRouter from './http/routes/tasks-routes';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/tasks', tasksRouter);

export default app;
