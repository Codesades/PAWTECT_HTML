// assets/js/case-detail.js
// Logic cho trang case-detail.html

document.addEventListener('DOMContentLoaded', () => {
    const detailContainer = document.getElementById('case-detail-container');
    if (!detailContainer) return; // Không phải trang chi tiết thì thoát

    // --- BƯỚC 1: LẤY ID TỪ URL ---
    // Ví dụ URL: case-detail.html?id=CASE%20%23101
    const urlParams = new URLSearchParams(window.location.search);
    const caseCid = urlParams.get('cid'); // SỬA 'id' THÀNH 'cid'

    // --- BƯỚC 2: TÌM CASE TRONG DỮ LIỆU ---
    // Kiểm tra xem dữ liệu đã tồn tại chưa
    if (typeof appData === 'undefined' || !appData.posts) {
        console.error("Không tìm thấy dữ liệu appData.");
        detailContainer.innerHTML = '<p class="error-message">Lỗi: Không thể tải dữ liệu.</p>';
        return;
    }

    // Tìm case có ID khớp
    const caseData = appData.posts.find(post => post.cid === caseCid); // SỬA post.id === caseId THÀNH post.cid === caseCid

    // --- BƯỚC 3: RENDER DỮ LIỆU RA GIAO DIỆN ---
    if (caseData) {
        renderCaseDetails(caseData);
    } else {
        // Nếu không tìm thấy case
        detailContainer.innerHTML = `
            <div class="page-header-user">
                <a href="home.html" class="back-arrow"><i class="fas fa-arrow-left"></i></a>
                <h2>Không tìm thấy</h2>
            </div>
            <p class="error-message">Không tìm thấy thông tin cho ca cứu hộ với ID: ${caseId}</p>
        `;
    }

    // Hàm để render toàn bộ trang chi tiết
    function renderCaseDetails(data) {
        // Dịch status ra tiếng Việt
        const statusMap = {
            pending: 'Chờ duyệt',
            unhandled: 'Chưa được tiếp nhận',
            handled: 'Đã tiếp nhận'
        };
        const statusText = statusMap[data.status] || 'Không rõ';

        const htmlContent = `
                        <div class="page-navigation">
                <a href="home.html" class="back-link">
                    ← Các gói ủng hộ
                </a>
            </div>

            <div class="case-content">
                <h1 class="case-id">${data.id}</h1>
                <p class="case-update-time">${data.updateTime}</p>
                
                <div class="case-info">
                    <p><strong>Địa chỉ:</strong> ${data.address}</p>
                    <p><strong>Miêu tả:</strong> ${data.description}</p>
                </div>

                <div class="case-image-slider">
                    <div class="image-wrapper">
                        <img src="${data.imagePet || data.imageUrl}" alt="Ảnh thú cưng">
                    </div>
                    <!-- Có thể thêm slider và dấu chấm ở đây nếu có nhiều ảnh -->
                    <div class="slider-pagination-detail">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                </div>

                <div class="case-status-section">
                    <p class="status-text">Tình trạng: <strong>${statusText}</strong></p>
                    <button class="btn btn-action">Tiếp nhận ngay</button>
                </div>
            </div>
        `;

        detailContainer.innerHTML = htmlContent;
    }
});