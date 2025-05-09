// Language Data
const translations = {
  en: {
    sitename: "CNTT 16-05",
    home: "Home",
    manage: "Course Management",
    list: "Course List",
    logout: "Logout",
    theme: "Dark Mode",
    menu: "Menu",
    cart: "Cart",
    login: "Login/Register",
    searchPlaceholder: "Search courses...",
    tableView: "Table View",
    gridView: "Grid View",
    sortNameAsc: "Name (A-Z)",
    sortNameDesc: "Name (Z-A)",
    sortPriceAsc: "Price (Low to High)",
    sortPriceDesc: "Price (High to Low)",
    addCourse: "Add Course",
    courseName: "Course Name",
    instructor: "Instructor",
    price: "Price",
    image: "Image",
    actions: "Actions",
    addCourseTitle: "Add Course",
    courseNameLabel: "Course Name",
    courseNameError: "Please enter the course name!",
    instructorLabel: "Instructor",
    instructorError: "Please enter the instructor!",
    priceLabel: "Price",
    priceError: "Please enter the price!",
    imageLabel: "Image (URL)",
    imageError: "Please enter the URL!",
    close: "Close",
    add: "Add",
    editCourseTitle: "Edit Course",
    save: "Save",
    viewCourseTitle: "Course Details",
    toastTitle: "Notification",
    //login
    loginTab: "Login",
    registerTab: "Register",
    emailLabel: "Email",
    passwordLabel: "Password",
    usernameLabel: "Username",
    loginButton: "Login",
    registerButton: "Register",
    noAccount: "Don't have an account? ",
    hasAccount: "Already have an account? ",
    registerNow: "Register now!",
    loginNow: "Login now!",
    emailPlaceholder: "Enter Email",
    passwordPlaceholder: "Enter Password",
    usernamePlaceholder: "Enter Username",
    emailError: "Invalid email!",
    passwordError: "Invalid password!",
    usernameError: "Invalid username!",
  },
  vi: {
    // manage
    sitename: "CNTT 16-05",
    home: "Trang chủ",
    manage: "Quản Lý Khóa Học",
    logout: "Đăng xuất",
    theme: "Chế độ tối",
    list: "Danh sách khoá học",
    menu: "Menu",
    cart: "Giỏ hàng",
    login: "Đăng nhập/Đăng ký",
    searchPlaceholder: "Tìm kiếm sản phẩm...",
    tableView: "Dạng Bảng",
    gridView: "Dạng Lưới",
    sortNameAsc: "Tên (A-Z)",
    sortNameDesc: "Tên (Z-A)",
    sortPriceAsc: "Giá (Tăng dần)",
    sortPriceDesc: "Giá (Giảm dần)",
    addCourse: "Thêm khoá học",
    courseName: "Tên khóa học",
    instructor: "Giảng viên",
    price: "Giá tiền",
    image: "Hình ảnh",
    actions: "Thao tác",
    addCourseTitle: "Thêm Khóa Học",
    courseNameLabel: "Tên khóa học",
    courseNameError: "Vui lòng nhập tên!",
    instructorLabel: "Giảng viên",
    instructorError: "Vui lòng nhập giảng viên!",
    priceLabel: "Giá tiền",
    priceError: "Vui lòng nhập giá!",
    imageLabel: "Hình ảnh (URL)",
    imageError: "Vui lòng nhập URL!",
    close: "Đóng",
    add: "Thêm",
    editCourseTitle: "Sửa Khóa Học",
    save: "Lưu",
    viewCourseTitle: "Chi Tiết Khóa Học",
    toastTitle: "Thông báo",
    loginTab: "Đăng nhập",
    registerTab: "Đăng ký",
    emailLabel: "Email",
    passwordLabel: "Mật khẩu",
    usernameLabel: "Tên người dùng",
    loginButton: "Đăng nhập",
    registerButton: "Đăng ký",
    noAccount: "Bạn chưa có tài khoản? ",
    hasAccount: "Bạn đã có tài khoản? ",
    registerNow: "Đăng ký ngay!",
    loginNow: "Đăng nhập ngay!",
    emailPlaceholder: "Nhập Email",
    passwordPlaceholder: "Nhập Mật khẩu",
    usernamePlaceholder: "Nhập Tên người dùng",
    emailError: "Email chưa hợp lệ!",
    passwordError: "Mật khẩu chưa hợp lệ!",
    usernameError: "Tên người dùng chưa hợp lệ!",
    
    //index
  },
};

// Function to change language
function changeLanguage(lang) {
  const elements = document.querySelectorAll("[data-key]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-key");
    element.textContent = translations[lang][key];
      element.classList.add('fade-in');
  });

  // Handle placeholder separately
  const placeholderElements = document.querySelectorAll(
    "[data-key-placeholder]"
  );
  placeholderElements.forEach((element) => {
    const key = element.getAttribute("data-key-placeholder");
    element.placeholder = translations[lang][key];
        element.classList.add('fade-in');
  });

  localStorage.setItem("language", lang);
}

// Load saved language and set up event listeners
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "vi";
  changeLanguage(savedLang);

  // Handle flag click
  const flags = document.querySelectorAll(".flag");
  flags.forEach((flag) => {
    flag.addEventListener("click", () => {
      const lang = flag.getAttribute("data-lang");
      changeLanguage(lang);
    });
  });
});