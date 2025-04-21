// Checkout functionality
document.addEventListener("DOMContentLoaded", function() {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Display cart items in checkout
    displayCheckoutItems();
    
    // Calculate and display totals
    updateCheckoutTotals();
    
    // Back to cart button
    document.getElementById('backToCartBtn').addEventListener('click', function() {
        window.location.href = 'cart.html';
    });
    
    // Payment method toggle
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.id === 'creditCard') {
                document.getElementById('paymentForm').style.display = 'block';
                document.getElementById('paypalButtonContainer').style.display = 'none';
            } else if (this.id === 'paypal') {
                document.getElementById('paymentForm').style.display = 'none';
                document.getElementById('paypalButtonContainer').style.display = 'block';
            }
        });
    });
    
    // Complete booking button
    document.getElementById('completeBookingBtn').addEventListener('click', function() {
        if (validateForms()) {
            processBooking();
        }
    });
    
    // Apply promo code
    document.getElementById('applyPromoBtn').addEventListener('click', function() {
        applyPromoCode();
    });
    
    function displayCheckoutItems() {
        const checkoutItemsContainer = document.getElementById('checkoutItems');
        
        if (cart.length === 0) {
            checkoutItemsContainer.innerHTML = '<p class="text-muted">Your cart is empty</p>';
            return;
        }
        
        checkoutItemsContainer.innerHTML = '';
        
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'mb-3 pb-3 border-bottom';
            
            if (item.type === 'flight') {
                itemElement.innerHTML = `
                    <div class="d-flex justify-content-between">
                        <div>
                            <h6 class="mb-1">${item.airline_name} Flight</h6>
                            <p class="small text-muted mb-1">${item.departure_airport} to ${item.arrival_airport}</p>
                            <p class="small text-muted">${item.departure_date} • ${item.class}</p>
                        </div>
                        <div class="text-end">
                            <p class="mb-1">$${parseFloat(item.price).toFixed(2)}</p>
                            <p class="small text-muted">1 passenger</p>
                        </div>
                    </div>
                `;
            } else if (item.type === 'hotel') {
                itemElement.innerHTML = `
                    <div class="d-flex justify-content-between">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <p class="small text-muted mb-1">${item.roomType}</p>
                            <p class="small text-muted">${item.checkIn} - ${item.checkOut} (${item.nights} nights)</p>
                            <div class="d-flex align-items-center mt-1">
                                ${Array.from({length: item.rating}, (_, i) => 
                                    `<i class="fas fa-star text-warning me-1 small"></i>`).join('')}
                                <span class="small ms-1">${item.reviews} reviews</span>
                            </div>
                        </div>
                        <div class="text-end">
                            <p class="mb-1">$${parseFloat(item.price).toFixed(2)}</p>
                            <p class="small text-muted">${item.guests} guests</p>
                        </div>
                    </div>
                `;
            }
            
            checkoutItemsContainer.appendChild(itemElement);
        });
    }
    
    function updateCheckoutTotals() {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += parseFloat(item.price) * (item.quantity || 1);
        });
        
        const taxes = subtotal * 0.1; // 10% tax
        const discount = 0; // Will be updated if promo code applied
        const total = subtotal + taxes - discount;
        
        document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('checkoutTaxes').textContent = `$${taxes.toFixed(2)}`;
        document.getElementById('checkoutDiscount').textContent = `-$${discount.toFixed(2)}`;
        document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
    }
    
    function applyPromoCode() {
        const promoCode = document.getElementById('promoCode').value;
        if (!promoCode) return;
        
        // In a real app, you would validate the promo code with your backend
        alert(`Promo code "${promoCode}" applied! (This is a demo - no actual discount applied)`);
        
        // For demo purposes, we'll just show a $10 discount
        const currentTotal = parseFloat(document.getElementById('checkoutTotal').textContent.replace('$', ''));
        const newTotal = currentTotal - 10;
        
        document.getElementById('checkoutDiscount').textContent = '-$10.00';
        document.getElementById('checkoutTotal').textContent = `$${newTotal.toFixed(2)}`;
    }
    
    function validateForms() {
        // Validate contact form
        const email = document.getElementById('email').value;
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        // Validate traveler information
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phone = document.getElementById('phone').value;
        const dob = document.getElementById('dob').value;
        const passport = document.getElementById('passport').value;
        const passportCountry = document.getElementById('passportCountry').value;
        const passportExpiry = document.getElementById('passportExpiry').value;
        
        if (!firstName || !lastName || !phone || !dob || !passport || !passportCountry || !passportExpiry) {
            alert('Please complete all traveler information fields');
            return false;
        }
        
        // Validate payment method
        if (document.getElementById('creditCard').checked) {
            const cardNumber = document.getElementById('cardNumber').value;
            const cardName = document.getElementById('cardName').value;
            const cardExpiry = document.getElementById('cardExpiry').value;
            const cardCvv = document.getElementById('cardCvv').value;
            
            if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
                alert('Please complete all credit card fields');
                return false;
            }
            
            if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
                alert('Please enter a valid 16-digit card number');
                return false;
            }
            
            if (!/^\d{3,4}$/.test(cardCvv)) {
                alert('Please enter a valid CVV (3 or 4 digits)');
                return false;
            }
        }
        
        // Validate billing address
        const address1 = document.getElementById('address1').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const zip = document.getElementById('zip').value;
        const country = document.getElementById('country').value;
        
        if (!address1 || !city || !state || !zip || !country) {
            alert('Please complete all billing address fields');
            return false;
        }
        
        return true;
    }
    
    function processBooking() {
        // In a real app, you would send this data to your backend
        const bookingData = {
            contact: {
                email: document.getElementById('email').value,
                receiveOffers: document.getElementById('emailOffers').checked
            },
            traveler: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                phone: document.getElementById('phone').value,
                dob: document.getElementById('dob').value,
                passport: document.getElementById('passport').value,
                passportCountry: document.getElementById('passportCountry').value,
                passportExpiry: document.getElementById('passportExpiry').value
            },
            payment: {
                method: document.querySelector('input[name="paymentMethod"]:checked').id,
                cardDetails: document.getElementById('creditCard').checked ? {
                    number: document.getElementById('cardNumber').value,
                    name: document.getElementById('cardName').value,
                    expiry: document.getElementById('cardExpiry').value,
                    cvv: document.getElementById('cardCvv').value,
                    save: document.getElementById('saveCard').checked
                } : null
            },
            billing: {
                address1: document.getElementById('address1').value,
                address2: document.getElementById('address2').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zip: document.getElementById('zip').value,
                country: document.getElementById('country').value
            },
            items: cart,
            total: document.getElementById('checkoutTotal').textContent
        };
        
        console.log('Booking data:', bookingData); // For debugging
        
        // For demo purposes, we'll just show a success message
        alert('Booking successful! Redirecting to confirmation page...');
        
        // Clear cart and redirect
        localStorage.removeItem('cart');
        updateCartCount();
        window.location.href = 'booking_confirmation.html';
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