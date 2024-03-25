import { Router } from 'express';
import productsController from '../controllers';

const router = Router();

router.post('/', productsController.create);

export default router;