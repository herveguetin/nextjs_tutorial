export async function addToCart(qty: number) {
  return fetch('/checkout/api', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ qty: qty }),
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
