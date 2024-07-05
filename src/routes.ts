import { Router } from 'express';
import { authMiddleware } from './middlewares/authMiddleware';
import { UserController } from './controllers/UserController';

const routes = Router();
const userController = new UserController();

routes.post("/user", userController.create);
routes.post("/login", userController.login);

export default routes;
