const API_URL = "https://67ffae04b72e9cfaf72583b0.mockapi.io/users";
let loadingLogin = document.getElementById("loadingLogin");
let loadingRegister = document.getElementById("loadingRegister");
async function handleLogin() {
    loadingLogin.style.display = "block";
    let loginEmailError = document.getElementById("loginEmailError");
    let loginPasswordError = document.getElementById("loginPasswordError");
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;
    let isValid = true;

    if (!loginEmail) {
        loginEmailError.style.display = "block";
        loadingLogin.style.display = "none";
        isValid = false;
    }
    if (!loginPassword) {
        loginPasswordError.style.display = "block";
        loadingLogin.style.display = "none";
        isValid = false;
    }

    if (!isValid) return;
    try {
        const users = await axios.get(API_URL);
        const usersConvert = users.data;
        const userCheck = usersConvert.find(u => u.email === loginEmail && u.password === loginPassword);
        if(!userCheck) {
            showToast("Tài khoản hoặc mật khẩu sai!", "red");
            loadingLogin.style.display = "none";
            return;
        }
        if(userCheck) {
            const userData = {
                name: userCheck.name,
                email: userCheck.email,
            }
            localStorage.setItem("userData", userData);
            window.location.href = "index.html";
        }
    } catch (error) {
        showToast("Có lỗi xảy ra khi đăng nhập!");
        console.error(error);
    }
}

async function handleRegister() {
    loadingRegister.style.display = "block";
    let registerUsernameError = document.getElementById("registerUsernameError");
    let registerEmailError = document.getElementById("registerEmailError");
    let registerPasswordError = document.getElementById("registerPasswordError");
    let registerUsername = document.getElementById("registerUsername").value;
    let registerEmail = document.getElementById("registerEmail").value;
    let registerPassword = document.getElementById("registerPassword").value;
    let isValid = true;
    if(!registerUsername) {
        registerUsernameError.style.display = "block";
        loadingRegister.style.display = "none";
        isValid = false;
    }
    if(!registerEmail) {
        registerEmailError.style.display = "block";
        loadingRegister.style.display = "none";
        isValid = false;
    }
        if(!registerPassword) {
        registerPasswordError.style.display = "block";
        loadingRegister.style.display = "none";
        isValid = false;
    }
    if (!isValid) return;
    try {
        const users = await axios.get(API_URL);
        const usersConvert = users.data;
        const userCheck = usersConvert.find(u => u.email === registerEmail);
        if(userCheck) {
            showToast("Email đã được sử dụng! Vui lòng thử lại", "red");
            loadingRegister.style.display = "none";
            return;
        }
        const userNew = {
            name: registerUsername,
            email: registerEmail,
            password: registerPassword,
            createdAt: new Date(),
        }
        await axios.post(API_URL, userNew);
        loadingRegister.style.display = "none";
        showToast("Đăng ký tài khoản thành công");
        document.getElementById("registerUsername").value = "";
        document.getElementById("registerEmail").value = "";
        document.getElementById("registerPassword").value = "";

        registerUsernameError.style.display = "none";
        registerEmailError.style.display = "none";
        registerPasswordError.style.display = "none";
    } catch (error) {
       showToast("Lỗi xảy ra khi đăng ký tài khoản!", "red");
       console.error(error); 
    }
    
}