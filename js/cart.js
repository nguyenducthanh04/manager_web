let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let cartOffcanvasElement = null;
let cartOffcanvas = null;
let isOpening = false;
console.log(cartItems);
// Khởi tạo giỏ hàng
function initCart() {
    cartOffcanvasElement = document.getElementById("cartOffcanvas");
    if (cartOffcanvasElement) {
        cartOffcanvas = new bootstrap.Offcanvas(cartOffcanvasElement);
        cartOffcanvasElement.addEventListener("hide.bs.offcanvas", () =>
            cartOffcanvasElement.classList.replace("animate-open", "animate-close")
        );
        cartOffcanvasElement.addEventListener(
            "hidden.bs.offcanvas",
            () => (isOpening = false)
        );
    } else {
        console.error("Không tìm thấy #cartOffcanvas");
    }

}
function openCart(event) {
    event.preventDefault();
    const el = document.getElementById("cartOffcanvas");
    if (!el) return alert("Không tìm thấy cartOffcanvas");

    const off = new bootstrap.Offcanvas(el);
    off.show(); // Đây là đoạn chính yếu!
}
function updateCartCount() {
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountOffcanvas = document.getElementById("cartCountOffcanvas");
    if (cartCountOffcanvas) {
        cartCountOffcanvas.textContent = totalQuantity;
    }
}


function addToCart(product) {
    const item = cartItems.find((item) => item.id == product.id);
    if (item) {
        item.quantity += 1;
    } else {
        cartItems.push({
            id: product.id,
            title: product.courseName,
            price: parseFloat(product.price),
            image: product.image,
            quantity: 1,
        });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert(`${product.courseName} Đã thêm vào giỏ hàng!`);
    getCartData();
    updateCartCount();
}
let cartDataDisplay = [];
function getCartData() {
    cartDataDisplay = cartItems;
    renderCart(cartDataDisplay);
}
function renderCart(carts) {
    let cartDisplay = document.getElementById("cartItems");
    const footerCart = document.getElementById("footer-cart");
    if (carts.length === 0) {
        footerCart.style.display = "none";
        cartDisplay.innerHTML = `<p class="text-center">Không có sản phẩm trong giỏ hàng.</p>`;
        updateCartTotal(); 
        return;
    }
    footerCart.style.display = "block";
    cartDisplay.innerHTML = carts.map((cart) => {
        return `
        <div class="cart-item slideInUp">
            <div class="d-flex align-items-center">
                <img src="${cart.image}" alt="${cart.title}">
                <div class="item-details">
                    <h6>${cart.title}</h6>
                    <p>${cart.price.toLocaleString("vi-VN")} VNĐ</p>
                </div>
            </div>
            <div class="quantity-controls">
                <input type="hidden" name="item1_id" value="1">
                <input type="hidden" name="item1_title" value="${cart.title}">
                <input type="hidden" name="item1_price" value="${cart.price}">
                <input type="hidden" name="item1_image" value="${cart.image}">
                <button type="button" class="btn btn-outline-secondary" onclick="updateQuantity(${cart.id}, 'decrease')">-</button>
                <span>${cart.quantity}</span>
                <button type="button" class="btn btn-outline-secondary" onclick="updateQuantity(${cart.id}, 'increase')">+</button>
                <button type="button" class="btn btn-danger" onclick="removeCartItem(${cart.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
        `
    }).join("");

    updateCartTotal(); 
}

getCartData();

function calculateTotalPrice() {
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return totalPrice;
}

function updateCartTotal() {
    const totalPrice = calculateTotalPrice();
    let totalPriceElement = document.getElementById("totalPrice");
    if (totalPriceElement) {
        totalPriceElement.textContent = `${totalPrice.toLocaleString("vi-VN")} VNĐ`;
    }
}

function updateQuantity(cartId, action) {
    const item = cartItems.find(i => Number(i.id) === cartId);

    if (item) {
    if (action === "increase") {
            item.quantity++;
        } else if (action === "decrease") {
            if (item.quantity === 1) {
                removeCartItem(Number(item.id));
                return; 
            } else {
                item.quantity--;
            }
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        getCartData();  
        updateCartCount();  
        updateCartTotal();  
}
}

function removeCartItem(cartId) {
    cartItems = cartItems.filter(item => Number(item.id) !== cartId);
    console.log(cartItems);
    console.log(typeof cartId);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    getCartData();
    updateCartCount();
    updateCartTotal();  
}
function clearCartData() {
    localStorage.removeItem("cartItems");  
    cartItems = [];  
    getCartData();
    updateCartCount();
    updateCartTotal();
}

function clearCart() {
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?");
    if (confirmDelete) {
        clearCartData(); 
    }
}

function payment() {
    const confirmDelete = confirm("Bạn có chắc chắn muốn thanh toán toàn bộ giỏ hàng không?");
    if (confirmDelete) {
        clearCartData(); 
        showToast("Thanh toán thành công");
    }
}
