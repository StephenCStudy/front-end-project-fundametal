let email = document.getElementById("email");
let password = document.getElementById("password");
let emailError = document.querySelectorAll(".danger")[0];
let passwordError = document.querySelectorAll(".danger")[1];
let btn = document.getElementById("btn");

// Tài khoản admin mẫu
const adminAccount = {
    email: "admin@gmail.com",
    password: "12345"
};

// Danh sách tài khoản người dùng mẫu
const userAccounts = [
    { email: "tranducanh31032006@gmailcom", password: "12345" },
    { email: "example@gmail.com", password: "12345" }
];

// Kiểm tra người dùng đã đăng nhập chưa khi tải trang
window.addEventListener("load", function () {
    const isLoggedIn = localStorage.getItem("isLogin");
    const userType = localStorage.getItem("userType");

    // Nếu đã đăng nhập, chuyển hướng người dùng tới trang phù hợp
    if (isLoggedIn === "true") {
        if (userType === "admin") {
            this.location.href = "../admin/category_page.html";
        } else if (userType === "user") {
            this.location.href = "../user/home_page.html";
        }
    }
});

// Hàm kiểm tra định dạng email hợp lệ
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
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

    // Kiểm tra thông tin đăng nhập
    if (emailValue === adminAccount.email && passwordValue === adminAccount.password) {
        // Đăng nhập thành công với tài khoản admin
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("userType", "admin");
        localStorage.setItem("userEmail", emailValue);

        // Hiển thị thông báo thành công
        location.href = "../admin/category_page.html"; // Chuyển hướng đến trang quản trị
    } else {
        // Kiểm tra với danh sách tài khoản người dùng
        let userFound = false;
        for (let user of userAccounts) {
            if (emailValue === user.email && passwordValue === user.password) {
                // Đăng nhập thành công với tài khoản người dùng
                localStorage.setItem("isLogin", "true");
                localStorage.setItem("userType", "user");
                localStorage.setItem("userEmail", emailValue);

                // Hiển thị thông báo thành công
                location.href = "../user/home_page.html"; // Chuyển hướng đến trang người dùng
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            // Thông tin đăng nhập không hợp lệ
            passwordError.textContent = "Email hoặc mật khẩu không chính xác";
            passwordError.style.display = "block";

            // Hiển thị gợi ý đăng ký tài khoản
            document.querySelector(".register-suggestion").style.display = "block";
        }
    }
});

// Hàm đăng xuất
function logout() {
    // Đặt isLogin thành false
    localStorage.setItem("isLogin", "false");
    // Xóa thông tin userType
    localStorage.setItem("userType", "");
    // Xóa thông tin email người dùng
    localStorage.removeItem("userEmail");
    // Chuyển hướng về trang đăng nhập
    window.location.href = "../auth/login_page.html";
}
