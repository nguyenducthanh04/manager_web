// Biến toàn cục
const API_URL = "https://67ffae04b72e9cfaf72583b0.mockapi.io/products";
let courses = [];
let filteredCourses = [];
let currentView = "table"; 
function toggleView(view) {
  currentView = view;
  document.getElementById("tableView").style.display = view === "table" ? "block" : "none";
  document.getElementById("gridView").style.display = view === "grid" ? "flex" : "none";
  renderCourses();
}

async function fetchCourses() {
  try {
    const response = await axios.get(API_URL);
    courses = response.data;
    filteredCourses = [...courses]; 
    renderCourses();
  } catch (error) {
    showToast("Lỗi khi lấy dữ liệu từ API!", "error");
    console.error("Lỗi khi lấy dữ liệu:", error);
  }
}

function renderCourses(data = filteredCourses) {
  if (currentView === "table") {
    renderTable(data);
  } else {
    renderGrid(data);
  }
}

function renderTable(data) {
  const tableBody = document.getElementById("courseTableBody");
  tableBody.innerHTML = "";
  data.forEach(course => {
    const row = document.createElement("tr");
    row.className = "fade-in";
    row.innerHTML = `
      <td>${course.courseName}</td>
      <td>${course.instructor}</td>
      <td>${course.price.toLocaleString("vi-VN")} VNĐ</td>
      <td><img src="${course.image}" alt="${course.courseName}" style="max-width: 100px;"></td>
      <td>
        <button class="btn btn-primary btn-sm me-1" onclick="viewCourse('${course.id}')">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn btn-warning btn-sm me-1" onclick="editCourse('${course.id}')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-danger btn-sm" onclick="deleteCourse('${course.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Hàm render dạng lưới (giống renderCartItems)
 // Hàm render dạng lưới (giữ nguyên vì đã sử dụng class card)
    function renderGrid(data) {
      const gridView = document.getElementById("gridView");
      gridView.innerHTML = "";
      data.forEach((course) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "col-md-3 col-sm-6";
        itemDiv.innerHTML = `
          <div class="card slide-in-up">
            <img src="${course.image}" alt="${course.courseName}" class="card-img-top">
            <div class="card-body">
              <h6>${course.courseName}</h6>
              <p>Giảng viên: ${course.instructor}</p>
              <p>Giá tiền: ${course.price.toLocaleString("vi-VN")} VNĐ</p>
              <div class="btn-group">
                <button class="btn btn-sm btn-primary" onclick="viewCourse('${course.id}')">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning" onclick="editCourse('${course.id}')">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteCourse('${course.id}')">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        `;
        gridView.appendChild(itemDiv);
      });
    }

// Hàm sắp xếp khóa học
function sortCourses() {
  const sortBy = document.getElementById("sortSelect").value;
  let sortedCourses = [...filteredCourses];

  sortedCourses.sort((a, b) => {
    if (sortBy === "name_asc") return a.courseName.localeCompare(b.courseName);
    if (sortBy === "name_desc") return b.courseName.localeCompare(a.courseName);
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    return 0;
  });

  renderCourses(sortedCourses);
  showToast("Đã sắp xếp danh sách!");
}

// Hàm tìm kiếm khóa học
function searchCourses() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(keyword) ||
    course.instructor.toLowerCase().includes(keyword)
  );
  sortCourses();
}

// Hàm mở modal thêm khóa học
function openAddCourseModal() {
  document.getElementById("addCourseName").value = "";
  document.getElementById("addCourseInstructor").value = "";
  document.getElementById("addCoursePrice").value = "";
  document.getElementById("addCourseImage").value = "";
  document.getElementById("addCourseNameError").style.display = "none";
  document.getElementById("addCourseInstructorError").style.display = "none";
  document.getElementById("addCoursePriceError").style.display = "none";
  document.getElementById("addCourseImageError").style.display = "none";
  const modal = new bootstrap.Modal(document.getElementById("addCourseModal"));
  modal.show();
}

// Hàm xử lý thêm khóa học
async function handleAddCourse() {
  const name = document.getElementById("addCourseName").value.trim();
  const instructor = document.getElementById("addCourseInstructor").value.trim();
  const price = document.getElementById("addCoursePrice").value;
  const image = document.getElementById("addCourseImage").value.trim();

  // Validate
  let isValid = true;
  if (!name) {
    document.getElementById("addCourseNameError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("addCourseNameError").style.display = "none";
  }
  if (!instructor) {
    document.getElementById("addCourseInstructorError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("addCourseInstructorError").style.display = "none";
  }
  if (!price || price <= 0) {
    document.getElementById("addCoursePriceError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("addCoursePriceError").style.display = "none";
  }
  if (!image) {
    document.getElementById("addCourseImageError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("addCourseImageError").style.display = "none";
  }

  if (!isValid) return;

  // Gửi request thêm khóa học
  try {
    const response = await axios.post(API_URL, { courseName: name, instructor, price: parseInt(price), image });
    courses.push(response.data);
    filteredCourses = [...courses];
    sortCourses();
    showToast("Thêm khóa học thành công!");
    bootstrap.Modal.getInstance(document.getElementById("addCourseModal")).hide();
  } catch (error) {
    showToast("Lỗi khi thêm khóa học!", "error");
    console.error("Lỗi khi thêm:", error);
  }
}

// Hàm mở modal sửa khóa học
function editCourse(id) {
  const course = courses.find(c => c.id === id);
  if (!course) return;

  document.getElementById("editCourseId").value = course.id;
  document.getElementById("editCourseName").value = course.courseName;
  document.getElementById("editCourseInstructor").value = course.instructor;
  document.getElementById("editCoursePrice").value = course.price;
  document.getElementById("editCourseImage").value = course.image;

  document.getElementById("editCourseNameError").style.display = "none";
  document.getElementById("editCourseInstructorError").style.display = "none";
  document.getElementById("editCoursePriceError").style.display = "none";
  document.getElementById("editCourseImageError").style.display = "none";

  const modal = new bootstrap.Modal(document.getElementById("editCourseModal"));
  modal.show();
}

// Hàm xử lý sửa khóa học
async function handleEditCourse() {
  const id = document.getElementById("editCourseId").value;
  const name = document.getElementById("editCourseName").value.trim(); //trim bỏ trắng đầu cuối
  const instructor = document.getElementById("editCourseInstructor").value.trim();
  const price = document.getElementById("editCoursePrice").value;
  const image = document.getElementById("editCourseImage").value.trim();

  // Validate
  let isValid = true;
  if (!name) {
    document.getElementById("editCourseNameError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("editCourseNameError").style.display = "none";
  }
  if (!instructor) {
    document.getElementById("editCourseInstructorError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("editCourseInstructorError").style.display = "none";
  }
  if (!price || price <= 0) {
    document.getElementById("editCoursePriceError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("editCoursePriceError").style.display = "none";
  }
  if (!image) {
    document.getElementById("editCourseImageError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("editCourseImageError").style.display = "none";
  }

  if (!isValid) return;

  // Gửi request sửa khóa học
  try {
    const response = await axios.put(`${API_URL}/${id}`, { courseName: name, instructor, price: parseInt(price), image });
    const index = courses.findIndex(c => c.id === id); //k tìm thấy trả về -1
    courses[index] = response.data;
    filteredCourses = [...courses];
    sortCourses();
    showToast("Sửa khóa học thành công!");
    bootstrap.Modal.getInstance(document.getElementById("editCourseModal")).hide();
  } catch (error) {
    showToast("Lỗi khi sửa khóa học!", "error");
    console.error("Lỗi khi sửa:", error);
  }
}

// Hàm xóa khóa học
async function deleteCourse(id) {
  if (!confirm("Bạn có chắc muốn xóa khóa học này?")) return;

  try {
    await axios.delete(`${API_URL}/${id}`);
    courses = courses.filter(c => c.id !== id);
    filteredCourses = [...courses];
    sortCourses();
    showToast("Xóa khóa học thành công!");
  } catch (error) {
    showToast("Lỗi khi xóa khóa học!", "error");
    console.error("Lỗi khi xóa:", error);
  }
}

// Hàm xem chi tiết khóa học
function viewCourse(id) {
  const course = courses.find(c => c.id === id);
  if (!course) return;

  document.getElementById("viewCourseName").textContent = course.courseName;
  document.getElementById("viewCourseInstructor").textContent = course.instructor;
  document.getElementById("viewCoursePrice").textContent = course.price.toLocaleString("vi-VN") + " VNĐ";
  document.getElementById("viewCourseImage").src = course.image;

  const modal = new bootstrap.Modal(document.getElementById("viewCourseModal"));
  modal.show();
}

// Khởi tạo khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
  fetchCourses();
  document.getElementById("searchInput").addEventListener("input", searchCourses);
});

// Hàm toggleTheme (giả lập nếu chưa có)
function toggleTheme() {
  const html = document.documentElement;
  const theme = html.getAttribute("data-bs-theme") === "light" ? "dark" : "light";
  html.setAttribute("data-bs-theme", theme);
  document.getElementById("themeToggle").innerHTML = theme === "light" ? 
    '<i class="fas fa-moon"></i> <span>Dark Mode</span>' : 
    '<i class="fas fa-sun"></i> <span>Light Mode</span>';
}