const API_URL = "https://67ffae04b72e9cfaf72583b0.mockapi.io/products";

// Hàm lấy danh sách khóa học từ API
async function fetchCourses() {
    try {
        const response = await axios.get(API_URL);
        const courses = response.data;
        renderCourses(courses);
    } catch (error) {
        console.error('Lỗi khi lấy khóa học:', error);
        document.getElementById('productList').innerHTML = '<p class="text-center text-danger">Không thể tải danh sách khóa học!</p>';
    }
}

// Hàm hiển thị danh sách khóa học
function renderCourses(courses) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    if (courses.length === 0) {
        productList.innerHTML = '<p class="text-center text-muted">Không có khóa học nào.</p>';
        return;
    }
    courses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
        courseDiv.innerHTML = `
            <div class="course-card zoom-in">
                <img src="${course.image}" alt="${course.courseName}" style="width: 100%; height: 150px; object-fit: cover;">
                <h5>${course.courseName}</h5>
                <p>Giảng viên: ${course.instructor}</p>
                <p>${course.price.toLocaleString("vi-VN")} VNĐ</p>
                <button class="btn btn-register" title="Đăng ký khóa học" onclick="addToCart({id: '${course.id}', courseName: '${course.courseName}', price: ${course.price}, image: '${course.image}'})">
                    <i class="bi bi-plus-circle"></i> Đăng ký
                </button>
            </div>
        `;
        productList.appendChild(courseDiv);
    });
}

// Hàm render phần đăng nhập/đăng xuất
function renderUserSection() {
    const user = JSON.parse(localStorage.getItem('user'));
    const btnLogout = document.getElementById('btnLogout');
    const btnLogoutOffcanvas = document.getElementById('btnLogoutOffcanvas');
    if (user) {
        btnLogout.style.display = 'block';
        btnLogoutOffcanvas.style.display = 'flex';
    } else {
        btnLogout.style.display = 'none';
        btnLogoutOffcanvas.style.display = 'none';
    }
}

// Hàm đăng xuất
function logout() {
    localStorage.removeItem('user');
    renderUserSection();
    alert('Đăng xuất thành công!');
}

// Gắn sự kiện cho nút đăng xuất
document.getElementById('btnLogout').addEventListener('click', logout);
document.getElementById('btnLogoutOffcanvas').addEventListener('click', logout);

// Khởi tạo khi trang tải
document.addEventListener('DOMContentLoaded', () => {
    fetchCourses();
    renderUserSection();
    updateCartCount();
});