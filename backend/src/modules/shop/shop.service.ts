import { prisma } from '../../config/db';
import { ApiError } from '../../utils/ApiError';
import type {
  CreateShopInput,
  UpdateShopInput,
  RejectShopInput,
} from './shop.schema';
import type { Shop } from '@prisma/client';

/**
 * Normalize Zod input — convert empty strings to undefined so Prisma
 * stores NULL instead of "" for optional fields.
 */
const normalize = <T extends Record<string, unknown>>(input: T): T => {
  const out = { ...input };
  for (const key of Object.keys(out)) {
    if (out[key] === '') {
      (out as Record<string, unknown>)[key] = undefined;
    }
  }
  return out;
};

// ─── Shopkeeper actions ─────────────────────────────────────────────

/**
 * Create a shop for the current shopkeeper.
 * Enforces one-to-one: a shopkeeper with an existing shop gets 409.
 */
export const createMyShop = async (
  ownerId: string,
  input: CreateShopInput,
): Promise<Shop> => {
  // Pre-check for clearer error (the @unique constraint is the actual guard)
  const existing = await prisma.shop.findUnique({
    where: { ownerId },
    select: { id: true },
  });

  if (existing) {
    throw new ApiError(409, 'You already have a shop', 'SHOP_EXISTS');
  }

  try {
    return await prisma.shop.create({
      data: {
        ...normalize(input),
        ownerId,
        // status defaults to PENDING (set in schema)
      },
    });
  } catch (err) {
    // Race condition fallback
    if (err && typeof err === 'object' && 'code' in err && err.code === 'P2002') {
      throw new ApiError(409, 'You already have a shop', 'SHOP_EXISTS');
    }
    throw err;
  }
};

/**
 * Get the current shopkeeper's shop.
 * Returns null (not 404) if they haven't created one yet —
 * the frontend uses this to decide between "create form" and "manage shop" UI.
 */
export const getMyShop = async (ownerId: string): Promise<Shop | null> => {
  return prisma.shop.findUnique({
    where: { ownerId },
  });
};

/**
 * Update the current shopkeeper's shop.
 * Special behaviour: if the shop was REJECTED, editing it resets it to PENDING
 * so the shopkeeper can address feedback and resubmit.
 */
export const updateMyShop = async (
  ownerId: string,
  input: UpdateShopInput,
): Promise<Shop> => {
  const shop = await prisma.shop.findUnique({
    where: { ownerId },
    select: { id: true, status: true },
  });

  if (!shop) {
    throw new ApiError(404, 'You have not created a shop yet', 'NO_SHOP');
  }

  const wasRejected = shop.status === 'REJECTED';

  return prisma.shop.update({
    where: { ownerId },
    data: {
      ...normalize(input),
      ...(wasRejected && { status: 'PENDING', rejectionReason: null }),
    },
  });
};

// ─── Admin actions ──────────────────────────────────────────────────

/**
 * List all shops awaiting approval. Includes owner contact info
 * so the admin can reach out before approving / rejecting.
 */
export const listPendingShops = async () => {
  return prisma.shop.findMany({
    where: { status: 'PENDING' },
    include: {
      owner: {
        select: { id: true, name: true, email: true, phone: true },
      },
    },
    orderBy: { createdAt: 'asc' }, // oldest first — fair queue
  });
};

/**
 * Approve a shop. Idempotent in the sense that re-approving an APPROVED
 * shop is rejected (caller is probably confused).
 */
export const approveShop = async (shopId: string, adminId: string): Promise<Shop> => {
  const shop = await prisma.shop.findUnique({
    where: { id: shopId },
    select: { id: true, status: true },
  });

  if (!shop) {
    throw new ApiError(404, 'Shop not found', 'SHOP_NOT_FOUND');
  }
  if (shop.status === 'APPROVED') {
    throw new ApiError(409, 'Shop is already approved', 'ALREADY_APPROVED');
  }

  return prisma.shop.update({
    where: { id: shopId },
    data: {
      status: 'APPROVED',
      approvedAt: new Date(),
      approvedById: adminId,
      rejectionReason: null,
    },
  });
};

/**
 * Reject a shop with a reason. The shopkeeper sees this reason
 * on their dashboard and can edit + resubmit.
 */
export const rejectShop = async (
  shopId: string,
  input: RejectShopInput,
): Promise<Shop> => {
  const shop = await prisma.shop.findUnique({
    where: { id: shopId },
    select: { id: true },
  });

  if (!shop) {
    throw new ApiError(404, 'Shop not found', 'SHOP_NOT_FOUND');
  }

  return prisma.shop.update({
    where: { id: shopId },
    data: {
      status: 'REJECTED',
      rejectionReason: input.reason,
      approvedAt: null,
      approvedById: null,
    },
  });
};