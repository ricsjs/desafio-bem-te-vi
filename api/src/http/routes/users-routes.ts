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

export default usersRouter;
