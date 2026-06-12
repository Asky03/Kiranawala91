import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import * as shopService from './shop.service';

/**
 * POST /api/shops/me — shopkeeper creates their shop
 */
export const createMyShop = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, 'Not authenticated', 'NOT_AUTHENTICATED');

  const shop = await shopService.createMyShop(req.user.id, req.body);
  res.status(201).json(new ApiResponse({ shop }, 'Shop submitted for approval'));
});

/**
 * GET /api/shops/me — shopkeeper fetches their shop
 * Returns { shop: null } if not created yet (not a 404).
 */
export const getMyShop = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, 'Not authenticated', 'NOT_AUTHENTICATED');

  const shop = await shopService.getMyShop(req.user.id);
  res.status(200).json(new ApiResponse({ shop }));
});

/**
 * PATCH /api/shops/me — shopkeeper edits their shop
 */
export const updateMyShop = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, 'Not authenticated', 'NOT_AUTHENTICATED');

  const shop = await shopService.updateMyShop(req.user.id, req.body);
  res.status(200).json(new ApiResponse({ shop }, 'Shop updated'));
});

/**
 * GET /api/shops/pending — admin lists pending shops
 */
export const listPendingShops = asyncHandler(async (_req: Request, res: Response) => {
  const shops = await shopService.listPendingShops();
  res.status(200).json(new ApiResponse({ shops, count: shops.length }));
});

/**
 * POST /api/shops/:id/approve — admin approves a shop
 */
export const approveShop = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, 'Not authenticated', 'NOT_AUTHENTICATED');

  const shop = await shopService.approveShop(req.params.id, req.user.id);
  res.status(200).json(new ApiResponse({ shop }, 'Shop approved'));
});

/**
 * POST /api/shops/:id/reject — admin rejects a shop with a reason
 */
export const rejectShop = asyncHandler(async (req: Request, res: Response) => {
  const shop = await shopService.rejectShop(req.params.id, req.body);
  res.status(200).json(new ApiResponse({ shop }, 'Shop rejected'));
});