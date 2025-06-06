document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = form.username.value;
        const password = form.password.value;

        // Admin authentication
        if (username === 'admin' && password === 'admin') {
            // Store admin status
            localStorage.setItem('username', 'admin');
            localStorage.setItem('isAdmin', 'true');
            // Redirect to admin dashboard
            window.location.href = 'admin/dashboard.html';
            return;
        }

        // Regular user authentication (for demo purposes)
        // In a real application, this would be handled by a server
        if (username && password) {
            localStorage.setItem('username', username);
            localStorage.setItem('isAdmin', 'false');
            // Redirect to home page or user dashboard
            window.location.href = 'index.html';
        } else {
            showError('Vui lòng điền đầy đủ thông tin');
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
}); 