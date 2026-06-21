/**
 * Formats a numeric price into a currency string (e.g. $149.00)
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

/**
 * Calculates the total cost based on unit price and quantity
 */
export const calculateTotal = (price: number, quantity: number): number => {
  return price * quantity;
};

/**
 * Calculates the savings amount (originalPrice - price) * quantity
 */
export const calculateSavings = (
  price: number,
  originalPrice: number | undefined,
  quantity: number
): number => {
  if (!originalPrice || originalPrice <= price) return 0;
  return (originalPrice - price) * quantity;
};

/**
 * Computes a string representing the discount percentage (e.g. "15% OFF")
 */
export const getDiscountPercentageText = (
  price: number,
  originalPrice?: number
): string | undefined => {
  if (!originalPrice || originalPrice <= price) {
    return undefined;
  }
  const percentage = Math.round(((originalPrice - price) / originalPrice) * 100);
  return `${percentage}% OFF`;
};
