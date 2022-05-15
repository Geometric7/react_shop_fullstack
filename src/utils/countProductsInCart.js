export const countProductsInCart = ringsList => {
  return ringsList.reduce((total, rings) => rings.amount + total, 0);
};
