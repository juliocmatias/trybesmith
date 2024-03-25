import { Router } from 'express';
import { productsController } from '../controllers';

const router = Router();

router.post('/', productsController.create);
router.get('/', productsController.getAll);

export default router;