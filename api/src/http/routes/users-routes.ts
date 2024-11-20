import { Hono } from 'hono';
import { userRegister } from '../controllers/user-controllers/user-register';

const usersRouter = new Hono();

usersRouter.post('/signup', async (c) => {
  return userRegister(c);
});

// tasksRouter.get('/task/:id', async (c) => {
//   return getTaskById(c);
// })

// tasksRouter.post('/create', async (c) => {
//   return createTask(c);
// });

// tasksRouter.put('/update/:id', async (c) => {
//   return updateTask(c);
// });

// tasksRouter.delete('/delete/:id', async (c) => {
//   return deleteTask(c);
// });

export default usersRouter;
