export async function fetchCheckoutData() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { items: { count: 0 } };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch checkout data.');
  }
}

export async function addToCart(qty: number) {
  try {
    let checkoutData = await fetchCheckoutData()
    checkoutData.items.count = checkoutData.items.count + qty
    return checkoutData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add to cart.');
  }
}
