import { Router } from 'express';
import { productsController } from '../controllers';
import { validateProduct } from '../middlewares';

const router = Router();

router.post('/', validateProduct, productsController.create);
router.get('/', productsController.getAll);

export default router;