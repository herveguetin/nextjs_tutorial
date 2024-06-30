export async function addToCart(sku: string, qty: number) {
  return fetch('/checkout/api', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sku: sku, qty: qty }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error');
    });
}

export async function removeFromCart(sku: string) {
  return fetch('/checkout/api', {
    method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sku: sku }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error');
    });
}
