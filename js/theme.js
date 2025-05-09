function updateToggleButtons() {
    const buttons = [
      document.getElementById('themeToggle'), // Nút trên màn hình lớn
      document.getElementById('themeToggleOffcanvas') // Nút trong Offcanvas
    ];
    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
  
    buttons.forEach(button => {
      if (button) {
        button.innerHTML = isDark
          ? '<i class="fas fa-sun me-2"></i> <span>Light Mode</span>'
          : '<i class="fas fa-moon me-2"></i> <span>Dark Mode</span>';
      }
    });
  }
  
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleButtons();
  }
  
  // Khởi tạo trạng thái ban đầu
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    updateToggleButtons();
  });

