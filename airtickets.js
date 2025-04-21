// Add event listeners to book buttons
document.querySelectorAll('.book-flight-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const flightCard = this.closest('.flight-card');
        const flightInfo = {
            airline_name: flightCard.dataset.airline,
            flight_number: flightCard.querySelector('small.d-block').textContent,
            departure_airport: flightCard.querySelectorAll('small.text-muted')[0].textContent,
            arrival_airport: flightCard.querySelectorAll('small.text-muted')[1].textContent,
            departure_date: flightCard.querySelectorAll('small')[2].textContent,
            departure_time: flightCard.querySelectorAll('strong')[0].textContent,
            class: flightCard.querySelector('.form-select').value,
            price: flightCard.querySelector('h5').textContent.replace('$', ''),
            airline_logo: flightCard.querySelector('.img-fluid').getAttribute('src').replace('images/', '')
        };

        // Add to cart
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(flightInfo);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        alert(`Flight added to cart!\n\n${flightInfo.airline_name} ${flightInfo.flight_number}\nFrom: ${flightInfo.departure_airport}\nTo: ${flightInfo.arrival_airport}\nPrice: $${flightInfo.price}`);
    });
});

// Function to update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBadges = document.querySelectorAll('.fa-shopping-cart + .badge');
    
    cartBadges.forEach(badge => {
        badge.textContent = cart.length;
    });
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();

    // Initialize date pickers
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const departureInput = document.getElementById('departure');
    const returnInput = document.getElementById('return');
    
    if (departureInput) {
        departureInput.min = today.toISOString().split('T')[0];
        departureInput.value = today.toISOString().split('T')[0];
    }
    
    if (returnInput) {
        returnInput.min = tomorrow.toISOString().split('T')[0];
        returnInput.value = tomorrow.toISOString().split('T')[0];
    }
    
    // Update return date when departure changes
    if (departureInput && returnInput) {
        departureInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const nextDay = new Date(selectedDate);
            nextDay.setDate(selectedDate.getDate() + 1);
            
            returnInput.min = nextDay.toISOString().split('T')[0];
            
            if (new Date(returnInput.value) < nextDay) {
                returnInput.value = nextDay.toISOString().split('T')[0];
            }
        });
    }

    // Sample flight data
    const sampleFlights = {
        airlines: [
            { id: 1, name: "Emirates", logo: "emirates.png", rating: 4.8 },
            { id: 2, name: "Qatar Airways", logo: "qatar.png", rating: 4.9 },
            { id: 3, name: "Singapore Airlines", logo: "singapore.png", rating: 4.7 },
            { id: 4, name: "Etihad Airways", logo: "etihad.png", rating: 4.6 },
            { id: 5, name: "Turkish Airlines", logo: "turkish.png", rating: 4.5 },
            { id: 6, name: "Biman Bangladesh", logo: "biman.png", rating: 3.9 }
        ],
        flights: []
    };

    // Generate sample flights
    const routes = [
        { from: "Dhaka (DAC)", to: "Dubai (DXB)", duration: "4h 15m", stops: 0 },
        { from: "Dhaka (DAC)", to: "Doha (DOH)", duration: "4h 15m", stops: 0 },
        { from: "Dhaka (DAC)", to: "Singapore (SIN)", duration: "4h 30m", stops: 0 },
        { from: "Dhaka (DAC)", to: "Abu Dhabi (AUH)", duration: "4h 15m", stops: 0 },
        { from: "Dhaka (DAC)", to: "Istanbul (IST)", duration: "7h 30m", stops: 0 },
        { from: "Dhaka (DAC)", to: "London (LHR)", duration: "10h 30m", stops: 1 },
        { from: "Dubai (DXB)", to: "Dhaka (DAC)", duration: "4h 15m", stops: 0 },
        { from: "Doha (DOH)", to: "Dhaka (DAC)", duration: "4h 15m", stops: 0 },
        { from: "Singapore (SIN)", to: "Dhaka (DAC)", duration: "4h 30m", stops: 0 },
        { from: "Abu Dhabi (AUH)", to: "Dhaka (DAC)", duration: "4h 15m", stops: 0 }
    ];

    const basePrices = {
        "DAC-DXB": 450, "DAC-DOH": 420, "DAC-SIN": 380, "DAC-AUH": 430, 
        "DAC-IST": 550, "DAC-LHR": 700, "DXB-DAC": 450, "DOH-DAC": 420,
        "SIN-DAC": 380, "AUH-DAC": 430
    };

    // Generate 100 sample flights
    for (let i = 0; i < 100; i++) {
        const route = routes[i % routes.length];
        const airline = sampleFlights.airlines[i % sampleFlights.airlines.length];
        const date = new Date();
        date.setDate(date.getDate() + Math.floor(i / 10));
        const dateStr = date.toISOString().split('T')[0];
        
        const routeKey = route.from.substring(route.from.indexOf('(')+1, route.from.indexOf(')')) + '-' + 
                        route.to.substring(route.to.indexOf('(')+1, route.to.indexOf(')'));
        const price = basePrices[routeKey] + (Math.random() * 100 - 50);
        
        // Generate random times
        const hour = 6 + Math.floor(Math.random() * 12);
        const minute = Math.floor(Math.random() * 12) * 5;
        const departureTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Calculate arrival time based on duration
        const durationParts = route.duration.split(' ');
        const durationHours = parseInt(durationParts[0]);
        const arrivalHour = hour + durationHours;
        const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        sampleFlights.flights.push({
            id: i + 1,
            airline_id: airline.id,
            flight_number: `${airline.name.substring(0, 2).toUpperCase()}${100 + i}`,
            departure_airport: route.from,
            arrival_airport: route.to,
            departure_time: departureTime,
            arrival_time: arrivalTime,
            departure_date: dateStr,
            arrival_date: dateStr,
            duration: route.duration,
            price: price.toFixed(2),
            seats_left: Math.floor(Math.random() * 20) + 5,
            stops: route.stops,
            class: "economy",
            airline_name: airline.name,
            airline_logo: airline.logo,
            airline_rating: airline.rating
        });
    }

    // Airport suggestions
    const airports = [
        { code: "DAC", name: "Hazrat Shahjalal International Airport", city: "Dhaka" },
        { code: "DXB", name: "Dubai International Airport", city: "Dubai" },
        { code: "DOH", name: "Hamad International Airport", city: "Doha" },
        { code: "SIN", name: "Singapore Changi Airport", city: "Singapore" },
        { code: "AUH", name: "Abu Dhabi International Airport", city: "Abu Dhabi" },
        { code: "IST", name: "Istanbul Airport", city: "Istanbul" },
        { code: "LHR", name: "Heathrow Airport", city: "London" }
    ];

    // Setup autocomplete
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    const fromSuggestions = document.getElementById('fromSuggestions');
    const toSuggestions = document.getElementById('toSuggestions');
    
    if (fromInput && fromSuggestions) {
        fromInput.addEventListener('input', () => fetchAirportSuggestions(fromInput, fromSuggestions));
    }
    
    if (toInput && toSuggestions) {
        toInput.addEventListener('input', () => fetchAirportSuggestions(toInput, toSuggestions));
    }
    
    if (fromSuggestions) {
        fromSuggestions.addEventListener('click', (e) => handleSuggestionClick(e, fromInput, fromSuggestions));
    }
    
    if (toSuggestions) {
        toSuggestions.addEventListener('click', (e) => handleSuggestionClick(e, toInput, toSuggestions));
    }
    
    document.addEventListener('click', function(e) {
        if (fromInput && fromSuggestions && !fromInput.contains(e.target) && !fromSuggestions.contains(e.target)) {
            fromSuggestions.classList.add('d-none');
        }
        if (toInput && toSuggestions && !toInput.contains(e.target) && !toSuggestions.contains(e.target)) {
            toSuggestions.classList.add('d-none');
        }
    });

    // Flight search form submission
    const flightSearchForm = document.getElementById('flightSearchForm');
    if (flightSearchForm) {
        flightSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchBtn = document.getElementById('searchFlightsBtn');
            const searchText = document.getElementById('searchText');
            const searchSpinner = document.getElementById('searchSpinner');
            
            if (searchBtn && searchText && searchSpinner) {
                searchBtn.disabled = true;
                searchText.textContent = 'Searching...';
                searchSpinner.classList.remove('d-none');
            }
            
            setTimeout(() => {
                try {
                    const from = document.getElementById('from')?.value;
                    const to = document.getElementById('to')?.value;
                    const departure = document.getElementById('departure')?.value;
                    const returnDate = document.getElementById('return')?.value;
                    const adults = parseInt(document.getElementById('adults')?.value || 1);
                    const children = parseInt(document.getElementById('children')?.value || 0);
                    const flightClass = document.getElementById('class')?.value || "economy";
                    
                    const fromCode = from?.match(/\(([A-Z]{3})\)/);
                    const toCode = to?.match(/\(([A-Z]{3})\)/);
                    
                    if (!fromCode || !toCode) {
                        throw new Error('Please select valid airports from the suggestions');
                    }
                    
                    // Filter flights
                    const departureFlights = sampleFlights.flights.filter(flight => 
                        flight.departure_airport.includes(fromCode[1]) && 
                        flight.arrival_airport.includes(toCode[1]) &&
                        flight.departure_date === departure &&
                        flight.class === flightClass
                    );
                    
                    let returnFlights = [];
                    if (returnDate) {
                        returnFlights = sampleFlights.flights.filter(flight => 
                            flight.departure_airport.includes(toCode[1]) && 
                            flight.arrival_airport.includes(fromCode[1]) &&
                            flight.departure_date === returnDate &&
                            flight.class === flightClass
                        );
                    }
                    
                    // Adjust prices
                    const adjustPrice = (price, adults, children) => {
                        return price * adults + (price * children * 0.8);
                    };
                    
                    departureFlights.forEach(flight => {
                        flight.adjusted_price = adjustPrice(parseFloat(flight.price), adults, children);
                    });
                    
                    returnFlights.forEach(flight => {
                        flight.adjusted_price = adjustPrice(parseFloat(flight.price), adults, children);
                    });
                    
                    // Display results
                    displayFlightResults({
                        departureFlights: departureFlights,
                        returnFlights: returnFlights,
                        searchParams: {
                            from: from,
                            to: to,
                            departure: departure,
                            return: returnDate,
                            adults: adults,
                            children: children,
                            class: flightClass
                        }
                    });
                    
                    const searchResultsSection = document.getElementById('searchResultsSection');
                    if (searchResultsSection) {
                        searchResultsSection.style.display = 'block';
                        searchResultsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                } catch (error) {
                    alert(error.message);
                } finally {
                    if (searchBtn && searchText && searchSpinner) {
                        searchBtn.disabled = false;
                        searchText.textContent = 'Search Flights';
                        searchSpinner.classList.add('d-none');
                    }
                }
            }, 500);
        });
    }

    // Modify search button
    const modifySearchBtn = document.getElementById('modifySearchBtn');
    if (modifySearchBtn) {
        modifySearchBtn.addEventListener('click', function() {
            const searchResultsSection = document.getElementById('searchResultsSection');
            if (searchResultsSection) {
                searchResultsSection.style.display = 'none';
            }
        });
    }

    // Apply filters button
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const priceRange = document.getElementById('priceRange')?.value;
            const selectedAirlines = Array.from(document.querySelectorAll('.airline-filter:checked')).map(el => el.value);
            
            document.querySelectorAll('.flight-card').forEach(card => {
                const price = parseFloat(card.dataset.price);
                const airline = card.dataset.airline;
                
                if (price <= priceRange && selectedAirlines.includes(airline)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Helper functions
    function fetchAirportSuggestions(inputElement, suggestionsElement) {
        if (!inputElement || !suggestionsElement) return;
        
        const query = inputElement.value.trim();
        if (query.length < 2) {
            suggestionsElement.classList.add('d-none');
            return;
        }
        
        const filtered = airports.filter(airport => 
            airport.code.toLowerCase().includes(query.toLowerCase()) || 
            airport.name.toLowerCase().includes(query.toLowerCase()) || 
            airport.city.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filtered.length > 0) {
            suggestionsElement.innerHTML = filtered.map(airport => `
                <button type="button" class="list-group-item list-group-item-action" 
                    data-code="${airport.code}" 
                    data-value="${airport.city} (${airport.code}) - ${airport.name}">
                    <strong>${airport.city} (${airport.code})</strong><br>
                    <small>${airport.name}</small>
                </button>
            `).join('');
            suggestionsElement.classList.remove('d-none');
        } else {
            suggestionsElement.innerHTML = '<div class="list-group-item">No airports found</div>';
            suggestionsElement.classList.remove('d-none');
        }
    }

    function handleSuggestionClick(e, inputElement, suggestionsElement) {
        if (!e.target || !inputElement || !suggestionsElement) return;
        
        if (e.target.classList.contains('list-group-item-action')) {
            inputElement.value = e.target.dataset.value;
            suggestionsElement.classList.add('d-none');
        }
    }

    function displayFlightResults(data) {
        const flightResults = document.getElementById('flightResults');
        const searchSummary = document.getElementById('searchSummary');
        
        if (!flightResults) return;
        
        flightResults.innerHTML = '';
        
        if (!data.departureFlights || data.departureFlights.length === 0) {
            flightResults.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info">
                        No flights found matching your criteria. Please try different search parameters.
                    </div>
                </div>
            `;
            return;
        }
        
        // Show search summary
        if (searchSummary) {
            searchSummary.innerHTML = `
                <h4 class="mb-3">Flights from ${data.searchParams.from.split('(')[0].trim()} to ${data.searchParams.to.split('(')[0].trim()}</h4>
                <div class="d-flex flex-wrap gap-3 mb-4">
                    <div class="badge bg-light text-dark p-2">${new Date(data.searchParams.departure).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                    ${data.searchParams.return ? `<div class="badge bg-light text-dark p-2">${new Date(data.searchParams.return).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>` : ''}
                    <div class="badge bg-light text-dark p-2">${data.searchParams.adults} Adult${data.searchParams.adults > 1 ? 's' : ''}</div>
                    ${data.searchParams.children > 0 ? `<div class="badge bg-light text-dark p-2">${data.searchParams.children} Child${data.searchParams.children > 1 ? 'ren' : ''}</div>` : ''}
                    <div class="badge bg-light text-dark p-2">${data.searchParams.class.charAt(0).toUpperCase() + data.searchParams.class.slice(1)} Class</div>
                </div>
            `;
        }
        
        // Display departure flights
        const departureTitle = document.createElement('h5');
        departureTitle.className = 'mb-3 mt-4';
        departureTitle.textContent = 'Departure Flights';
        flightResults.appendChild(departureTitle);
        
        data.departureFlights.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'col-12';
            flightCard.innerHTML = `
                <div class="card mb-3 flight-card" data-price="${flight.adjusted_price}" data-airline="${flight.airline_name}">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-2 text-center">
                                <img src="images/${flight.airline_logo}" alt="${flight.airline_name}" class="img-fluid mb-2" style="height: 40px;">
                                <small class="d-block">${flight.airline_name}</small>
                                <small class="text-muted">${flight.flight_number}</small>
                                <div class="rating mt-1">
                                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(flight.airline_rating))}
                                    ${flight.airline_rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="d-flex flex-column">
                                    <strong>${flight.departure_time}</strong>
                                    <small>${new Date(flight.departure_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</small>
                                    <small class="text-muted">${flight.departure_airport}</small>
                                </div>
                            </div>
                            <div class="col-md-2 text-center">
                                <small class="text-muted">${flight.duration}</small>
                                <div class="flight-route my-2">
                                    <div class="flight-dot"></div>
                                    <div class="flight-line"></div>
                                    <div class="flight-dot"></div>
                                </div>
                                <small class="text-muted">${flight.stops === 0 ? 'Non-stop' : flight.stops + ' stop(s)'}</small>
                            </div>
                            <div class="col-md-3">
                                <div class="d-flex flex-column">
                                    <strong>${flight.arrival_time}</strong>
                                    <small>${new Date(flight.arrival_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</small>
                                    <small class="text-muted">${flight.arrival_airport}</small>
                                </div>
                            </div>
                            <div class="col-md-2 text-center">
                                <h5 class="text-primary mb-1">$${flight.adjusted_price.toFixed(2)}</h5>
                                <small class="text-muted d-block">${flight.seats_left} seats left</small>
                                <select class="form-select form-select-sm mb-2">
                                    <option value="economy">Economy</option>
                                    <option value="business">Business</option>
                                    <option value="first">First Class</option>
                                </select>
                                <button class="btn btn-sm btn-outline-primary mt-2 w-100 book-flight-btn">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            flightResults.appendChild(flightCard);
        });
        
        // Display return flights if available
        if (data.returnFlights && data.returnFlights.length > 0) {
            const returnTitle = document.createElement('h5');
            returnTitle.className = 'mb-3 mt-5';
            returnTitle.textContent = 'Return Flights';
            flightResults.appendChild(returnTitle);
            
            data.returnFlights.forEach(flight => {
                const flightCard = document.createElement('div');
                flightCard.className = 'col-12';
                flightCard.innerHTML = `
                    <div class="card mb-3 flight-card" data-price="${flight.adjusted_price}" data-airline="${flight.airline_name}">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-md-2 text-center">
                                    <img src="images/${flight.airline_logo}" alt="${flight.airline_name}" class="img-fluid mb-2" style="height: 40px;">
                                    <small class="d-block">${flight.airline_name}</small>
                                    <small class="text-muted">${flight.flight_number}</small>
                                    <div class="rating mt-1">
                                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(flight.airline_rating))}
                                        ${flight.airline_rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="d-flex flex-column">
                                        <strong>${flight.departure_time}</strong>
                                        <small>${new Date(flight.departure_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</small>
                                        <small class="text-muted">${flight.departure_airport}</small>
                                    </div>
                                </div>
                                <div class="col-md-2 text-center">
                                    <small class="text-muted">${flight.duration}</small>
                                    <div class="flight-route my-2">
                                        <div class="flight-dot"></div>
                                        <div class="flight-line"></div>
                                        <div class="flight-dot"></div>
                                    </div>
                                    <small class="text-muted">${flight.stops === 0 ? 'Non-stop' : flight.stops + ' stop(s)'}</small>
                                </div>
                                <div class="col-md-3">
                                    <div class="d-flex flex-column">
                                        <strong>${flight.arrival_time}</strong>
                                        <small>${new Date(flight.arrival_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</small>
                                        <small class="text-muted">${flight.arrival_airport}</small>
                                    </div>
                                </div>
                                <div class="col-md-2 text-center">
                                    <h5 class="text-primary mb-1">$${flight.adjusted_price.toFixed(2)}</h5>
                                    <small class="text-muted d-block">${flight.seats_left} seats left</small>
                                    <select class="form-select form-select-sm mb-2">
                                        <option value="economy">Economy</option>
                                        <option value="business">Business</option>
                                        <option value="first">First Class</option>
                                    </select>
                                    <button class="btn btn-sm btn-outline-primary mt-2 w-100 book-flight-btn">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                flightResults.appendChild(flightCard);
            });
        }
        
        // Set price range
        const priceRange = document.getElementById('priceRange');
        const priceRangeValue = document.getElementById('priceRangeValue');
        if (priceRange && priceRangeValue) {
            const maxPrice = Math.max(...data.departureFlights.map(f => f.adjusted_price));
            priceRange.max = Math.ceil(maxPrice / 100) * 100;
            priceRange.value = Math.ceil(maxPrice / 100) * 100;
            priceRangeValue.textContent = `$${Math.ceil(maxPrice / 100) * 100}`;
        }
        
        // Populate airline filters
        const airlinesFilter = document.getElementById('airlinesFilter');
        if (airlinesFilter) {
            const airlines = [...new Set(data.departureFlights.map(f => f.airline_name))];
            airlinesFilter.innerHTML = airlines.map(airline => `
                <div class="form-check">
                    <input class="form-check-input airline-filter" type="checkbox" value="${airline}" id="filter-${airline.replace(/\s+/g, '-')}" checked>
                    <label class="form-check-label" for="filter-${airline.replace(/\s+/g, '-')}">
                        ${airline}
                    </label>
                </div>
            `).join('');
        }
        
        // Re-attach event listeners to new book buttons
        document.querySelectorAll('.book-flight-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const flightCard = this.closest('.flight-card');
                const flightInfo = {
                    airline_name: flightCard.dataset.airline,
                    flight_number: flightCard.querySelector('small.d-block').textContent,
                    departure_airport: flightCard.querySelectorAll('small.text-muted')[0].textContent,
                    arrival_airport: flightCard.querySelectorAll('small.text-muted')[1].textContent,
                    departure_date: flightCard.querySelectorAll('small')[2].textContent,
                    departure_time: flightCard.querySelectorAll('strong')[0].textContent,
                    class: flightCard.querySelector('.form-select').value,
                    price: flightCard.querySelector('h5').textContent.replace('$', ''),
                    airline_logo: flightCard.querySelector('.img-fluid').getAttribute('src').replace('images/', '')
                };

                // Add to cart
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(flightInfo);
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Update cart count
                updateCartCount();
                
                alert(`Flight added to cart!\n\n${flightInfo.airline_name} ${flightInfo.flight_number}\nFrom: ${flightInfo.departure_airport}\nTo: ${flightInfo.arrival_airport}\nPrice: $${flightInfo.price}`);
            });
        });
    }
});