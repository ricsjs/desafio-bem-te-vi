import { Hono } from 'hono';
import tasksRouter from './http/routes/tasks-routes';
import usersRouter from './http/routes/users-routes';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/tasks', tasksRouter);

app.route('/users', usersRouter);

export default app;
