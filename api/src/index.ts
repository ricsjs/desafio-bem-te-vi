import { Hono } from 'hono';
import { cors } from 'hono/cors';
import tasksRouter from './http/routes/tasks-routes';
import usersRouter from './http/routes/users-routes';

import { swaggerUI } from '@hono/swagger-ui';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const app = new Hono();

app.get('/swagger.json', (c) => {
  const filePath = resolve(__dirname, './swagger.json');
  const fileContent = readFileSync(filePath, 'utf-8');
  return c.json(JSON.parse(fileContent));
});

app.get('/ui', swaggerUI({ url: '/swagger.json' }));

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.use(
  '/*',
  cors({
    origin: '*',
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
