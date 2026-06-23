import { Router } from "express";
import rawSensors from "../data/sensors.json";

const router = Router();

router.get("/", (_, res) => {
  const processedSensors = rawSensors.map((product) => {
    const variants = product.variants.map((variant) => {
      const originalPrice = variant.price;
      const discount = variant.discount || 0;
      const price = discount
        ? Math.round((originalPrice * (1 - discount / 100)) * 100) / 100
        : originalPrice;
      return {
        ...variant,
        originalPrice: discount ? originalPrice : undefined,
        price,
        discount,
      };
    });

    // Determine default product-level discountBadge from first variant if it has a discount
    const firstVariantDiscount = variants[0]?.discount || 0;
    const discountBadge = firstVariantDiscount ? `Save ${firstVariantDiscount}%` : undefined;

    return {
      ...product,
      discountBadge,
      variants,
    };
  });

  res.json(processedSensors);
});

export default router;
