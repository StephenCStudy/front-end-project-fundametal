

// =============================================================================
//  1. BIẾN TOÀN CỤC & ELEMENT SELECTORS
// =============================================================================

let email;
let password;
let emailError;
let passwordError;
let btn;



// =============================================================================
//  2. THIẾT LẬP TRANG BAN ĐẦU
// =============================================================================

// Kiểm tra nếu đang ở trang đăng nhập trước khi thực thi mã này
document.addEventListener("DOMContentLoaded", function() {
    initializeLoginPage();
    updateLoginLogoutButtons();
    setupLogoutButton();
});

// Hàm khởi tạo trang đăng nhập
function initializeLoginPage() {
    // Kiểm tra nếu đang ở trang đăng nhập
    if (document.getElementById("email") && document.getElementById("password") && document.getElementById("btn")) {
        // Khởi tạo các element selector
        email = document.getElementById("email");
        password = document.getElementById("password");
        emailError = document.querySelectorAll(".danger")[0];
        passwordError = document.querySelectorAll(".danger")[1];
        btn = document.getElementById("btn");

        // Ẩn thông báo lỗi khi trang được tải
        if (emailError && passwordError) {
            emailError.style.display = "none";
            passwordError.style.display = "none";
        }

        // Kiểm tra người dùng đã đăng nhập chưa khi tải trang
        checkUserLoginStatus();

        // Setup event listeners
        setupLoginButton();
    }
}



// =============================================================================
//  3. CHỨC NĂNG XÁC THỰC
// =============================================================================
function checkUserLoginStatus() {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (window.authService.isUserLoggedIn()) {
        const currentUser = window.authService.getCurrentUser();
        redirectBasedOnRole(currentUser);
    }
}

function redirectBasedOnRole(user) {
    // Chuyển hướng dựa vào role của người dùng
    if (user && user.role === "admin") {
        location.href = "../admin/category_page.html"; // trang quản lý danh mục cho admin 
    } else {
        location.href = "../user/home_page.html"; // trang chủ cho user
    }
}

function updateLoginLogoutButtons() {
    const logoutBtn = document.getElementById("isLoginBtn1");
    const loginBtn = document.getElementById("isLoginBtn2");

    // Kiểm tra xem các phần tử có tồn tại không
    if (!logoutBtn || !loginBtn) {
        return;  // Nếu không có phần tử, dừng hàm lại (dùng cho các trang khác ngoài home và index)
    }

    const isLoggedIn = window.authService.isUserLoggedIn();
    const currentUser = window.authService.getCurrentUser();

    // Kiểm tra trạng thái đăng nhập và hiển thị nút phù hợp
    if (isLoggedIn && currentUser) {
        logoutBtn.style.display = "block";  // Hiển thị nút Đăng xuất
        loginBtn.style.display = "none";   // Ẩn nút Đăng nhập
    } else {
        logoutBtn.style.display = "none";  // Ẩn nút Đăng xuất
        loginBtn.style.display = "block";  // Hiển thị nút Đăng nhập
    }
}

window.logout = function() {
    window.authService.logoutUser();
    updateLoginLogoutButtons();
    window.location.href = "../user/home_page.html"; // Chuyển hướng về trang chủ sau khi đăng xuất
};



// =============================================================================
//  4. KIỂM TRA FORM
// =============================================================================
// Hàm kiểm tra định dạng email hợp lệ
function isValidEmail(email) {
    const checkEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return checkEmailValid.test(email);
}

function validateLoginForm() {
    let emailValue = email.value.trim();
    let passwordValue = password.value;
    let isValid = true;

    // Ẩn thông báo lỗi trước khi kiểm tra
    emailError.style.display = "none";
    passwordError.style.display = "none";

    // Kiểm tra input trống
    if (emailValue === "") {
        emailError.textContent = "Email là bắt buộc";
        emailError.style.display = "block";
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        // Kiểm tra định dạng email
        emailError.textContent = "Định dạng email không hợp lệ";
        emailError.style.display = "block";
        isValid = false;
    }

    if (passwordValue === "") {
        passwordError.textContent = "Mật khẩu là bắt buộc";
        passwordError.style.display = "block";
        isValid = false;
    }

    return isValid ? { email: emailValue, password: passwordValue } : false;
}



// =============================================================================
//  5. THIẾT LẬP SỰ KIỆN
// =============================================================================
function setupLoginButton() {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        
        // Validate form
        const formData = validateLoginForm();
        if (!formData) return;

        // Thử đăng nhập
        const loggedInUser = window.authService.loginUser(formData.email, formData.password);

        if (loggedInUser) {
            redirectBasedOnRole(loggedInUser);
        } else {
            // Đăng nhập thất bại
            passwordError.textContent = "Email hoặc mật khẩu không chính xác";
            passwordError.style.display = "block";
        }
    });
}

function setupLogoutButton() {
    const logoutBtn = document.getElementById("isLoginBtn1");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(e) {
            e.preventDefault();
            logout();
        });
    }
}