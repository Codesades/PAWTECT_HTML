document.addEventListener('DOMContentLoaded', () => {

    // =============================================================
    // PHẦN 1: LOGIC CHO SIDEBAR (CHẠY TRÊN MỌI TRANG)
    // =============================================================
    const menuIcon = document.getElementById('menu-icon');
    const sidebarNav = document.getElementById('sidebar-nav');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');

    // Mở/đóng sidebar khi click
    if (menuIcon && sidebarNav && closeBtn && overlay) {
        menuIcon.addEventListener('click', () => {
            sidebarNav.classList.add('active');
            overlay.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            sidebarNav.classList.remove('active');
            overlay.classList.remove('active');
        });

        overlay.addEventListener('click', () => {
            sidebarNav.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Hàm đặt trạng thái 'active' cho mục sidebar dựa trên URL
    function setActiveSidebarItem() {
        const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại, ví dụ: "/dashboard"
        const sidebarLinks = document.querySelectorAll('.sidebar ul li a'); // Lấy tất cả các link trong sidebar

        sidebarLinks.forEach(link => {
            link.classList.remove('active'); // Xóa active khỏi tất cả các link trước
            
            // So sánh href của link với đường dẫn hiện tại
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active'); // Thêm active vào link khớp
            }
        });
    }

    // GỌI HÀM KHI TRANG TẢI XONG
    setActiveSidebarItem();


});