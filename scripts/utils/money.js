export function formatCurrency(priceCents) {
  if (priceCents >= 0) {
    return (Math.round(priceCents) / 100).toFixed(2);
  } else {
    return 'Incorrect number, price should be greater than 0';
  }
}
