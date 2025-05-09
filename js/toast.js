// Hàm hiển thị toast
function showToast(message, type = "success") {
  const toastEl = document.getElementById("toast");
  const toastTitleEl = document.getElementById("toastTitle");
  const toastMessageEl = document.getElementById("toastMessage");

  toastTitleEl.textContent = type === "success" ? "Thành công" : "Lỗi";
  toastMessageEl.textContent = message;

  toastEl.classList.remove("bg-success", "bg-danger", "text-white");
  if (type === "success") {
    toastEl.classList.add("bg-success", "text-white");
  } else {
    toastEl.classList.add("bg-danger", "text-white");
  }

  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
}