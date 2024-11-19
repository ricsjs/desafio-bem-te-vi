import { Hono } from 'hono'
import { getAllTasks } from './http/controllers/get-all-tasks';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/tasks/:userId', async (c) => {
    return getAllTasks(c);
  });

export default app
