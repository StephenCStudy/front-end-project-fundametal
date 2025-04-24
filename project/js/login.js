// Kiểm tra nếu đang ở trang đăng nhập trước khi thực thi mã này
if (document.getElementById("email") && document.getElementById("password") && document.getElementById("btn")) {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let emailError = document.querySelectorAll(".danger")[0];
    let passwordError = document.querySelectorAll(".danger")[1];
    let btn = document.getElementById("btn");

    // Kiểm tra người dùng đã đăng nhập chưa khi tải trang
    window.addEventListener("load", function () {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (window.authService.isUserLoggedIn()) {
            const currentUser = window.authService.getCurrentUser();

            // Chuyển hướng dựa vào role của người dùng
            if (currentUser && currentUser.role === "admin") {
                this.location.href = "../admin/category_page.html"; // trang quản lý danh mục cho admin 
            } else {
                this.location.href = "../user/home_page.html"; // trang chủ cho user
            }
        }

        // Ẩn thông báo lỗi khi trang được tải
        if (emailError && passwordError) {
            emailError.style.display = "none";
            passwordError.style.display = "none";
        }
    });

    // Hàm kiểm tra định dạng email hợp lệ
    function isValidEmail(email) {
        const checkEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return checkEmailValid.test(email);
    }

    btn.addEventListener("click", function (e) {
        e.preventDefault();
        let emailValue = email.value.trim();
        let passwordValue = password.value;

        // Ẩn thông báo lỗi trước khi kiểm tra
        emailError.style.display = "none";
        passwordError.style.display = "none";

        // Kiểm tra input trống
        if (emailValue === "") {
            emailError.textContent = "Email là bắt buộc";
            emailError.style.display = "block";
            return;
        }

        if (passwordValue === "") {
            passwordError.textContent = "Mật khẩu là bắt buộc";
            passwordError.style.display = "block";
            return;
        }

        // Kiểm tra định dạng email
        if (!isValidEmail(emailValue)) {
            emailError.textContent = "Định dạng email không hợp lệ";
            emailError.style.display = "block";
            return;
        }

        // Thử đăng nhập
        const loggedInUser = window.authService.loginUser(emailValue, passwordValue);

        if (loggedInUser) {
            // Chuyển hướng dựa vào role
            if (loggedInUser.role === "admin") {
                location.href = "../admin/category_page.html"; // trang quản lý danh mục cho admin 
            } else {
                location.href = "../user/home_page.html"; // trang chủ cho user
            }
        } else {
            // Đăng nhập thất bại
            passwordError.textContent = "Email hoặc mật khẩu không chính xác";
            passwordError.style.display = "block";
        }
    });
}

// Kiểm tra người dùng đã đăng nhập chưa và cập nhật nút đăng nhập/đăng xuất cho home_page và index 
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

// Gọi hàm khi trang được tải
window.addEventListener("DOMContentLoaded", updateLoginLogoutButtons);

window.logout = function () {
    window.authService.logoutUser();
    updateLoginLogoutButtons();
    window.location.href = "../user/home_page.html"; // Chuyển hướng về trang chủ sau khi đăng xuất
};

document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("isLoginBtn1");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            logout();
        });
    }
});
