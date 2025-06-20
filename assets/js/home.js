document.addEventListener('DOMContentLoaded', () => {


  // ================================================
  // LOGIC CHO SIDEBAR
  // ================================================
  const menuIcon = document.getElementById('menu-icon');
  const sidebarNav = document.getElementById('sidebar-nav');
  const closeBtn = document.getElementById('close-btn');
  const overlay = document.getElementById('overlay');

  // Kiểm tra xem các element có tồn tại không trước khi gán sự kiện
  if (menuIcon && sidebarNav && closeBtn && overlay) {
      // Mở sidebar
      menuIcon.addEventListener('click', () => {
          sidebarNav.classList.add('active');
          overlay.classList.add('active');
      });

      // Đóng sidebar bằng nút 'x'
      closeBtn.addEventListener('click', () => {
          sidebarNav.classList.remove('active');
          overlay.classList.remove('active');
      });

      // Đóng sidebar khi click ra ngoài (lớp phủ)
      overlay.addEventListener('click', () => {
          sidebarNav.classList.remove('active');
          overlay.classList.remove('active');
      });
  }

 // =============================================================
        // LOGIC RIÊNG CHO MỤC "CA CỨU HỘ GẦN TÔI"
        // =============================================================

        const nearbyRescueContainer = document.getElementById('nearby-rescue-container');

        if (nearbyRescueContainer) {

            // Thay thế hàm này trong file assets/js/home.js

            function renderNearbyRescues(posts) {
                nearbyRescueContainer.innerHTML = ''; // Xóa nội dung cũ

                const rescuePosts = posts.filter(post =>
                    post.status !== 'handled' && typeof post.distance === 'number'
                );

                rescuePosts.sort((a, b) => a.distance - b.distance);

                if (rescuePosts.length === 0) {
                    nearbyRescueContainer.innerHTML = '<p class="empty-message">Không có ca cứu hộ nào gần bạn.</p>';
                    return;
                }

                let htmlContent = '';
                rescuePosts.forEach(post => {
                    // --- THAY ĐỔI Ở ĐÂY ---
                    // Lấy đường dẫn ảnh thú cưng từ trường 'imagePet'
                    // Nếu không có imagePet, có thể dùng ảnh địa điểm hoặc ảnh placeholder làm dự phòng
                    const petImage = post.imagePet || post.imageUrl || '/assets/images/placeholder.jpg';

                    htmlContent += `
            <div class="rescue-card">
                <img src="${petImage}" alt="Ảnh ca cứu hộ ${post.id}">
                <div class="rescue-card-info">
                    <span class="rescue-id">${post.id}</span>
                    <span class="rescue-distance">Cách bạn ${post.distance.toFixed(1)}km</span>
                    
                    <!-- THAY ĐỔI Ở ĐÂY: Truyền cid thay vì id -->
                    <a href="case-detail.html?cid=${post.cid}" class="btn btn-view">Xem ngay</a>
                </div>
            </div>
        `;
                });

                nearbyRescueContainer.innerHTML = htmlContent;
            }

            // --- KHỞI TẠO BAN ĐẦU ---
            if (typeof appData !== 'undefined' && appData.posts) {
                renderNearbyRescues(appData.posts);
            } else {
                console.error('Không tìm thấy dữ liệu appData. Hãy chắc chắn file data.js đã được nhúng.');
            }
        }

        // =============================================================
        // LOGIC RIÊNG CHO MỤC "CÓ THỂ BẠN QUAN TÂM"
        // =============================================================

        const interestedContainer = document.getElementById('interested-container');

        // Chỉ chạy code này nếu tìm thấy container
        if (interestedContainer) {

            // Hàm để render danh sách phòng khám
            function renderInterestCards(clinics) {
                interestedContainer.innerHTML = ''; // Xóa nội dung cũ

                if (!clinics || clinics.length === 0) {
                    interestedContainer.innerHTML = '<p class="empty-message">Không có dữ liệu.</p>';
                    return;
                }

                let htmlContent = '';
                clinics.forEach((clinic, index) => {
                    // Thêm một class nền khác nhau cho 2 card đầu tiên để giống thiết kế
                    let backgroundClass = `vet-zone`;

                    htmlContent += `
                    <div class="interest-card ${backgroundClass}">
                        <h3>${clinic.name.toUpperCase()}</h3>
                        <p>${clinic.address}</p>
                        <p>Hotline: ${clinic.hotline}</p>
                        <p>${clinic.workingHours}</p>
                        <a href="vets.html" class="btn btn-light" style="margin-top: auto;">Tới ngay!</a>
                    </div>
                `;
                });

                interestedContainer.innerHTML = htmlContent;
            }

            // --- KHỞI TẠO BAN ĐẦU ---
            if (typeof vetData !== 'undefined' && vetData.clinics) {
                // Lấy dữ liệu từ data-vets.js và render ra giao diện
                renderInterestCards(vetData.clinics);
            } else {
                console.error('Không tìm thấy dữ liệu vetData. Hãy chắc chắn file data-vets.js đã được nhúng.');
            }
        }

        // Đây là hàm cốt lõi, nó sẽ được áp dụng cho MỌI thanh trượt trên trang
            function initializeScrollSection(section) {
                const scrollContainer = section.querySelector('.scroll-container');
                const paginationDots = section.querySelector('.pagination-dots');

                // Nếu không có cả hai thành phần thì không làm gì cả
                if (!scrollContainer || !paginationDots) {
                    return;
                }

                const cards = scrollContainer.children;
                const totalCards = cards.length;

                // Xóa các dấu chấm cũ và tạo lại dựa trên số lượng card thực tế
                paginationDots.innerHTML = '';
                for (let i = 0; i < totalCards; i++) {
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    if (i === 0) {
                        dot.classList.add('active'); // Kích hoạt dấu chấm đầu tiên
                    }
                    paginationDots.appendChild(dot);
                }

                const dots = paginationDots.querySelectorAll('.dot');

                // Lắng nghe sự kiện cuộn trên container
                scrollContainer.addEventListener('scroll', () => {
                    // Tính toán xem card nào đang ở gần mép trái nhất
                    const cardWidth = cards[0].offsetWidth; // Chiều rộng của một card
                    const scrollLeft = scrollContainer.scrollLeft; // Vị trí cuộn hiện tại

                    // Chỉ số của card đang active là vị trí cuộn chia cho chiều rộng card, làm tròn
                    const activeIndex = Math.round(scrollLeft / cardWidth);

                    // Cập nhật trạng thái 'active' cho các dấu chấm
                    dots.forEach((dot, index) => {
                        if (index === activeIndex) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                });
            }

            // Tìm TẤT CẢ các section có thanh trượt và áp dụng logic cho từng cái
            const allScrollSections = document.querySelectorAll('.scroll-section');
            allScrollSections.forEach(section => {
                initializeScrollSection(section);
            });

  console.log('Trang chủ Pawtect đã tải xong!');



});