import { Hono } from 'hono';
import { cors } from 'hono/cors'
import tasksRouter from './http/routes/tasks-routes';
import usersRouter from './http/routes/users-routes';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.use('/*', cors())
app.use(
  '/*',
  cors({
    origin: 'http://example.com',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)

app.route('/tasks', tasksRouter);

app.route('/users', usersRouter);

export default app;
