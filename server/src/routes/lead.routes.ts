import { Router } from 'express';
import { LeadController } from '../controllers';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware';
import { createLeadSchema, updateLeadSchema, leadQuerySchema, leadIdSchema } from '../validators';
import { USER_ROLES } from '../constants';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', validate(leadQuerySchema), LeadController.getAll);
router.get('/export/csv', validate(leadQuerySchema), LeadController.exportCsv);
router.get('/:id', validate(leadIdSchema), LeadController.getById);
router.post('/', validate(createLeadSchema), LeadController.create);
router.put('/:id', validate(updateLeadSchema), LeadController.update);
router.delete('/:id', authorize(USER_ROLES.ADMIN), validate(leadIdSchema), LeadController.delete);

export default router;
