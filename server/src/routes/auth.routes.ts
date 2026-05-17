import { Router } from 'express';
import { AuthController } from '../controllers';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware';
import { registerSchema, loginSchema } from '../validators';

const router = Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.get('/profile', authenticate, AuthController.getProfile);

export default router;
