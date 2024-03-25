import { Router } from 'express';
import { usersController } from '../controllers';

const router = Router();

router.get('/', usersController.getAll);

export default router;