document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    // Toggle password visibility for all password fields
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });
    
    // Form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Simple validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if (password.length < 8) {
                alert('Password must be at least 8 characters');
                return;
            }
            
            // Here you would typically make an AJAX request to your backend
            console.log('Registration data:', { fullName, email, username, password });
            
            // Simulate successful registration
            // window.location.href = 'login.html?registered=true';
            
            // For demo purposes - show success message
            alert('Registration successful! (This would redirect to login in production)');
        });
    }
});