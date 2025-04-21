// Cart functionality
document.addEventListener("DOMContentLoaded", function() {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart display
    updateCartDisplay();
    
    // Update cart count in navbar
    updateCartCount();
    
    // Checkout button event
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        window.location.href = 'checkout.html';
    });
    
    // Continue Shopping button
    document.getElementById('continueShoppingBtn').addEventListener('click', function() {
        window.location.href = 'hotels.html';
    });
    
    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cartItems');
        const subtotalElement = document.getElementById('subtotal');
        const taxesElement = document.getElementById('taxes');
        const totalElement = document.getElementById('total');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                    <h5 class="text-muted">Your cart is empty</h5>
                    <a href="hotels.html" class="btn btn-primary mt-3">Browse Hotels</a>
                </div>
            `;
            subtotalElement.textContent = '$0.00';
            taxesElement.textContent = '$0.00';
            totalElement.textContent = '$0.00';
            checkoutBtn.disabled = true;
            document.getElementById('cartCountBadge').textContent = '0 items';
            return;
        }
        
        // Calculate totals
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += parseFloat(item.price) * (item.quantity || 1);
        });
        
        const taxes = subtotal * 0.1; // 10% tax
        const total = subtotal + taxes;
        
        // Update summary
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxesElement.textContent = `$${taxes.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
        checkoutBtn.disabled = false;
        
        const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        document.getElementById('cartCountBadge').textContent = `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`;
        
        // Display cart items
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'row mb-4 align-items-center';
            
            if (item.type === 'flight') {
                cartItem.innerHTML = `
                    <div class="col-md-3">
                        <img src="images/${item.airline_logo}" alt="${item.airline_name}" class="img-fluid rounded">
                    </div>
                    <div class="col-md-5">
                        <h6 class="mb-1">${item.airline_name} Flight #${item.flight_number}</h6>
                        <p class="mb-1 text-muted small">${item.departure_airport} to ${item.arrival_airport}</p>
                        <p class="mb-1 text-muted small">${item.departure_date} at ${item.departure_time}</p>
                        <p class="mb-1 text-muted small">${item.class.charAt(0).toUpperCase() + item.class.slice(1)} Class</p>
                    </div>
                    <div class="col-md-2 text-center">
                        <h6 class="mb-0">$${parseFloat(item.price).toFixed(2)}</h6>
                    </div>
                    <div class="col-md-2 text-end">
                        <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            } else if (item.type === 'hotel') {
                cartItem.innerHTML = `
                    <div class="col-md-3">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                    </div>
                    <div class="col-md-5">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="mb-1 text-muted small">${item.location}</p>
                        <p class="mb-1 text-muted small">${item.checkIn} to ${item.checkOut}</p>
                        <p class="mb-1 text-muted small">${item.roomType} (${item.guests} guests)</p>
                        <div class="d-flex align-items-center mt-2">
                            ${Array.from({length: item.rating}, (_, i) => 
                                `<i class="fas fa-star text-warning me-1 small"></i>`).join('')}
                            <span class="small ms-1">${item.reviews} reviews</span>
                        </div>
                    </div>
                    <div class="col-md-2 text-center">
                        <h6 class="mb-0">$${parseFloat(item.price).toFixed(2)}</h6>
                        <small class="text-muted">${item.nights} nights</small>
                    </div>
                    <div class="col-md-2 text-end">
                        <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            }
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
                updateCartCount();
            });
        });
    }
});

// Function to update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBadges = document.querySelectorAll('.fa-shopping-cart + .badge');
    
    const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    cartBadges.forEach(badge => {
        badge.textContent = itemCount;
    });
}

// Function to add hotel to cart (call this from your hotel booking page)
function addHotelToCart(hotelData) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Create hotel cart item
    const hotelItem = {
        type: 'hotel',
        id: hotelData.id,
        name: hotelData.name,
        location: hotelData.location,
        image: hotelData.image,
        rating: hotelData.rating,
        reviews: hotelData.reviews,
        roomType: hotelData.roomType,
        price: hotelData.price,
        checkIn: hotelData.checkIn,
        checkOut: hotelData.checkOut,
        nights: hotelData.nights,
        guests: hotelData.guests,
        quantity: 1
    };
    
    cart.push(hotelItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    alert(`${hotelData.name} has been added to your cart!`);
}