import { Hono } from 'hono';
import { cors } from 'hono/cors';
import tasksRouter from './http/routes/tasks-routes';
import usersRouter from './http/routes/users-routes';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.use(
  '/*',
  cors({
    origin: 'https://desafio-bem-te-h9c43zm78-ricardo-alencars-projects.vercel.app',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
);

app.route('/tasks', tasksRouter);
app.route('/users', usersRouter);

export default app;
