// Add to cart button
$('#addToCartBtn').click(function() {
    const selectedRoom = $('.room-option.selected');
    if (selectedRoom.length === 0) {
        alert('Please select a room first');
        return;
    }
    
    const hotelCard = $(this).closest('.modal-content').find('.modal-body .row');
    const hotelName = $('#hotelModalTitle').text();
    const roomName = selectedRoom.find('h6').text();
    const roomPrice = selectedRoom.find('h5').text().replace('$', '');
    const checkIn = $('#checkInDate').text();
    const checkOut = $('#checkOutDate').text();
    
    // Calculate nights
    const checkInDate = new Date($('#checkIn').val());
    const checkOutDate = new Date($('#checkOut').val());
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    // Get hotel location
    const location = $('.hotel-card .text-muted').first().text().trim();
    
    // Get hotel image
    const image = $('.hotel-card').first().find('img').attr('src');
    
    // Get rating and reviews
    const rating = 5; // Default value - replace with actual data
    const reviews = 428; // Default value - replace with actual data
    
    // Create hotel data object
    const hotelData = {
        id: selectedRoom.data('room-id'),
        name: hotelName,
        location: location,
        image: image,
        rating: rating,
        reviews: reviews,
        roomType: roomName,
        price: roomPrice,
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        guests: $('#guests').val()
    };
    
    // Add to cart
    addHotelToCart(hotelData);
    
    // Close modal
    const bookingModal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
    bookingModal.hide();
});