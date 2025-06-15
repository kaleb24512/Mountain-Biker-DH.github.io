document.addEventListener('DOMContentLoaded', function() {

    // Inicializar el carrito: intenta cargar desde localStorage o crea un array vacío.
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para guardar el estado actual del carrito en localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Función para renderizar (dibujar) los ítems del carrito en el MODAL
    function renderCart() {
        const cartItemsContainer = document.getElementById('modal-cart-items');
        const emptyCartMessage = document.getElementById('modal-empty-cart-message');
        const cartTotalElement = document.getElementById('modal-cart-total');
        const cartCountElement = document.getElementById('cart-count');

        // IMPORTANTE: Verifica que los elementos HTML existan. Si alguno no se encuentra, saldrá un error en la consola.
        if (!cartItemsContainer || !emptyCartMessage || !cartTotalElement || !cartCountElement) {
            console.error("Error: Algunos elementos HTML del carrito (modal o navbar) no se encontraron. Asegúrate de que los IDs sean correctos.");
            return; // Detener la función si faltan elementos cruciales
        }

        cartItemsContainer.innerHTML = ''; // Limpiar el contenedor actual del carrito en el modal
        let total = 0;

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block'; // Mostrar el mensaje de carrito vacío
        } else {
            emptyCartMessage.style.display = 'none'; // Ocultar el mensaje
            cart.forEach(item => {
                const itemHtml = `
                    <div class="col-12 mb-3">
                        <div class="d-flex align-items-center border p-3">
                            <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover;" class="mr-3">
                            <div class="flex-grow-1">
                                <h5>${item.name}</h5>
                                <p class="mb-0">$${item.price.toFixed(2)} MXN x ${item.quantity}</p>
                            </div>
                            <button class="btn btn-danger btn-sm remove-from-cart-btn" data-product-id="${item.id}">Eliminar</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.innerHTML += itemHtml;
                total += item.price * item.quantity;
            });
        }

        cartTotalElement.textContent = `$${total.toFixed(2)} MXN`;
        cartCountElement.textContent = cart.length; // Actualizar el contador en la navbar

        // Añadir event listeners a los botones de eliminar después de que se renderizan
        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.productId;
                cart = cart.filter(item => item.id !== productId);
                saveCart();
                renderCart();
            });
        });
    }

    // Event listener para todos los botones con la clase 'add-to-cart-btn'
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productName = this.dataset.productName;
            const productPrice = parseFloat(this.dataset.productPrice); // Convertir a número (¡sin comas en el HTML!)
            const productImage = this.dataset.productImage;

            // Validación para depuración:
            if (!productId || !productName || isNaN(productPrice) || !productImage) {
                console.error("Error: Faltan datos del producto en el botón 'Comprar'.", { productId, productName, productPrice, productImage, button });
                alert("No se pudo añadir el producto. Faltan datos."); // Mensaje de alerta para el usuario
                return; // No procesar si faltan datos
            }

            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            saveCart();
            renderCart();

            // Abrir el modal del carrito
            $('#cartModal').modal('show'); // Requiere jQuery y Bootstrap JS
        });
    });

    // Renderiza el carrito la primera vez que la página carga
    renderCart();

    // Este evento asegura que el contenido del carrito se actualice cada vez que el modal se abre
    $('#cartModal').on('show.bs.modal', function (e) {
      renderCart();
    });

    // --- Tu código existente de otras funcionalidades (Owl Carousel, Lightbox, etc.) ---
    // AÑADE AQUÍ EL RESTO DE TU JAVASCRIPT QUE YA TENÍAS EN main.js
    // Por ejemplo:
    if ($('.owl-carousel').length) {
        $('.owl-carousel').owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            margin: 30,
            loop: true,
            center: true,
            dots: false,
            nav: true,
            navText : [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0:{ items:1 },
                576:{ items:1 },
                768:{ items:2 },
                992:{ items:3 }
            }
        });
    }

    $('[data-lightbox="gallery"]').each(function(){
        $(this).lightbox();
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Smooth scrolling on the navbar
    $('.navbar-nav a').on('click', function (event) {
        if (this.hash !== '') {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });

    // Activate smooth scroll on page load
    if (window.location.hash) {
        var target = $(window.location.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 45
            }, 1500, 'easeInOutExpo');
        }
    }
    // --- FIN de tu código existente ---
});

