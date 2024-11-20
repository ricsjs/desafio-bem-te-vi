import { Hono } from 'hono';
import { userRegister } from '../controllers/user-controllers/user-register';
import { userAuthenticate } from '../controllers/user-controllers/user-auth';

const usersRouter = new Hono();

usersRouter.post('/signup', async (c) => {
  return userRegister(c);
});

usersRouter.post('/login', async (c) => {
  return userAuthenticate(c);
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
