document.addEventListener('DOMContentLoaded', function() {
    // Check admin authentication
    const username = localStorage.getItem('username');
    const isAdmin = localStorage.getItem('isAdmin');

    if (!username || isAdmin !== 'true') {
        alert('Bạn không có quyền truy cập trang này');
        window.location.href = '../login.html';
        return;
    }

    // Update username display
    document.querySelector('.username').textContent = username;

    // Time filter buttons
    const timeFilters = document.querySelectorAll('.time-filters button');
    timeFilters.forEach(button => {
        button.addEventListener('click', function() {
            timeFilters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateStats(this.textContent);
        });
    });

    // Case card actions
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach(card => {
        const menuButton = card.querySelector('.fa-ellipsis-v');
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            // Here you would typically show a dropdown menu with actions
            console.log('Case menu clicked:', card.querySelector('h3').textContent);
        });

        card.addEventListener('click', function() {
            // Here you would typically navigate to case details
            console.log('Case clicked:', this.querySelector('h3').textContent);
        });
    });

    // Update stats based on time filter
    function updateStats(timeFilter) {
        // Here you would typically make an API call to get updated stats
        console.log('Updating stats for:', timeFilter);
        
        // Simulate data update
        const stats = {
            'Theo tuần': { total: 20, pending: 6, received: 14 },
            'Theo tháng': { total: 85, pending: 25, received: 60 },
            'Theo năm': { total: 1024, pending: 156, received: 868 }
        };

        const data = stats[timeFilter];
        if (data) {
            // Update donut chart
            const donutChart = document.querySelector('.donut-chart');
            const pendingPercentage = (data.pending / data.total) * 100;
            donutChart.style.background = `conic-gradient(
                #e74c3c 0% ${pendingPercentage}%,
                #2ecc71 ${pendingPercentage}% 100%
            )`;

            // Update total count
            document.querySelector('.chart-center strong').textContent = data.total;
        }
    }

    // Initialize with default stats
    updateStats('Theo tuần');

    // Add specific filters
    const specificFilters = [
        'Tất cả',
        'Chưa tiếp nhận',
        'Đã tiếp nhận',
        'Đang xử lý',
        'Hoàn thành'
    ];

    const filterContainer = document.getElementById('specific-filter-container');
    specificFilters.forEach(filter => {
        const button = document.createElement('button');
        button.textContent = filter;
        if (filter === 'Tất cả') button.classList.add('active');
        
        button.addEventListener('click', function() {
            filterContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Here you would typically filter the case list
            console.log('Filtering cases by:', filter);
        });

        filterContainer.appendChild(button);
    });

    // Logout functionality
    document.querySelector('.logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
        window.location.href = '../login.html';
    });
}); 