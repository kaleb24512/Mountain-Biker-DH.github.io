document.addEventListener('DOMContentLoaded', function() {
    // ...
    renderCart(); // Esta función se llama al inicio para mostrar el número actual de ítems (que al principio es 0 o lo que haya en localStorage)
});

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        // ... lógica para añadir el producto al array 'cart' ...

        saveCart();  // Guarda el carrito actualizado en localStorage
        renderCart(); // <--- ¡AQUÍ ESTÁ! Llama a la función que actualiza el número
        $('#cartModal').modal('show'); // Abre el modal
    });
});

function renderCart() {
    // ... otras líneas para obtener los elementos HTML y calcular el total ...

    const cartCountElement = document.getElementById('cart-count'); // Obtiene el elemento <span> del contador
    if (!cartCountElement) { // Validación en caso de que no exista el elemento
        console.error("Error: El elemento con ID 'cart-count' no se encontró en el HTML.");
        return;
    }

    // ... (código para limpiar el modal y listar los ítems) ...

    cartCountElement.textContent = cart.length; // <--- ESTA ES LA LÍNEA MÁGICA
    // 'cart.length' es el número total de elementos únicos en tu array 'cart'.
    // '.textContent' cambia el texto visible dentro del <span> a ese número.
}