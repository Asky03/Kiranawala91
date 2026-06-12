import { Router } from 'express';
import { validate } from '../../middleware/validate.middleware';
import { requireAuth } from '../../middleware/auth.middleware';
import { requireRole } from '../../middleware/role.middleware';
import {
  createShopSchema,
  updateShopSchema,
  rejectShopSchema,
} from './shop.schema';
import * as shopController from './shop.controller';

const router = Router();

// Every shop route requires authentication
router.use(requireAuth);

// ─── Shopkeeper routes (operate on their own shop) ──────────────────
// All use /me — the user ID comes from the JWT, never from URL params.
// This is the right pattern for self-scoped resources.

router.post(
  '/me',
  requireRole('SHOPKEEPER'),
  validate(createShopSchema),
  shopController.createMyShop,
);

router.get('/me', requireRole('SHOPKEEPER'), shopController.getMyShop);

router.patch(
  '/me',
  requireRole('SHOPKEEPER'),
  validate(updateShopSchema),
  shopController.updateMyShop,
);

// ─── Admin routes ───────────────────────────────────────────────────

router.get('/pending', requireRole('ADMIN'), shopController.listPendingShops);

router.post('/:id/approve', requireRole('ADMIN'), shopController.approveShop);

router.post(
  '/:id/reject',
  requireRole('ADMIN'),
  validate(rejectShopSchema),
  shopController.rejectShop,
);

export default router;