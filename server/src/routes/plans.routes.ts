import { Router } from "express";
import rawPlans from "../data/plans.json";

const router = Router();

router.get("/", (_, res) => {
  const processedPlans = rawPlans.map((plan) => {
    const originalPrice = plan.price;
    const discount = plan.discount || 0;
    const price = discount
      ? Math.round((originalPrice * (1 - discount / 100)) * 100) / 100
      : originalPrice;
    
    const discountBadge = discount ? `Save ${discount}%` : undefined;

    return {
      ...plan,
      originalPrice: discount ? originalPrice : undefined,
      price,
      discount,
      discountBadge,
    };
  });

  res.json(processedPlans);
});

export default router;
