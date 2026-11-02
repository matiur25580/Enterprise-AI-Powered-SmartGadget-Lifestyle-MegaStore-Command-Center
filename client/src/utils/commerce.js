export const addCartItem = (cart, product) => [...cart, product];

export const calculateCartTotal = cart => cart.reduce(
  (total, item) => total + (Number(item.price) || 0),
  0,
);

export const calculateEmi = (amount, months = 12, interestRate = 0.08) => {
  const principal = Number(amount) || 0;
  const duration = Number(months) || 1;
  const total = Math.round(principal * (1 + interestRate));
  return { total, monthly: Math.round(total / duration), interest: total - principal };
};

export const calculateCouponDiscount = (subtotal, percent) => {
  const amount = Number(subtotal) || 0;
  const rate = Math.min(100, Math.max(0, Number(percent) || 0));
  return Math.round(amount * rate / 100);
};
