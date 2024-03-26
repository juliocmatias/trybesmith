import { Router } from 'express';
import { loginController } from '../controllers';
import { validateLogin } from '../middlewares';

const router = Router();

router.post('/', validateLogin, loginController.login);

export default router;