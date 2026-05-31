import { Router } from 'express';
import authController from './auth.controller';
import { validateRequest } from '../../../middlewares/validation.middleware';
import { googleLoginSchema, loginSchema, registerSchema } from './auth.validation';

const router = Router();

// Express expects handler functions, so we bind 'this' implicitly by passing the method reference
// Note: If you ever use 'this' context inside the controller, you would need to write: 
// router.post('/register', (req, res) => authController.register(req, res));
router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/google', validateRequest(googleLoginSchema), authController.googleLogin);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

export default router;