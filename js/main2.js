// Este bloque debe estar DENTRO de la función renderCart()
// después de que el HTML de los ítems del carrito ha sido insertado
document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.dataset.productId;
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        renderCart(); // Vuelve a llamar a renderCart() para actualizar el modal
    });
});