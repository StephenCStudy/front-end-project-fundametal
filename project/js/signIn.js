// Ẩn các thông báo lỗi khi trang được tải
window.addEventListener('load', function() {
    const errorLabels = document.querySelectorAll('.danger');
    errorLabels.forEach(label => {
        label.style.display = 'none';
    });
});

// Lấy các phần tử DOM cần thiết
const form = document.querySelector('.registration-form');
const formGroups = document.querySelectorAll('.form-group');
const fullnameError = formGroups[0].querySelector('.danger');
const emailError = formGroups[1].querySelector('.danger');
const passwordError = formGroups[2].querySelector('.danger');
const confirmPasswordError = formGroups[3].querySelector('.danger');

// Xử lý sự kiện gửi biểu mẫu
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của biểu mẫu

    // Lấy giá trị từ các trường nhập liệu
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    let hasError = false; // Biến kiểm tra lỗi

    // Lấy danh sách người dùng từ localStorage hoặc khởi tạo mảng rỗng
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Kiểm tra hợp lệ cho fullname
    if (fullname.trim() === '') {
        fullnameError.style.display = 'block'; // Hiển thị lỗi nếu trống
        hasError = true;
    } else {
        fullnameError.style.display = 'none'; // Ẩn lỗi nếu hợp lệ
    }

    // Kiểm tra hợp lệ cho email
    const emailRegex = /^\S+@\S+\.\S+$/; // Regex kiểm tra định dạng email
    if (email.trim() === '' || !emailRegex.test(email)) {
        emailError.style.display = 'block'; // Hiển thị lỗi nếu trống hoặc sai định dạng
        hasError = true;
    } else if (users.some(user => user.email === email)) {
        emailError.style.display = 'block'; // Hiển thị lỗi nếu email đã tồn tại
        hasError = true;
    } else {
        emailError.style.display = 'none'; // Ẩn lỗi nếu hợp lệ
    }

    // Kiểm tra hợp lệ cho password
    if (password === '' || password.length < 6) {
        passwordError.style.display = 'block'; // Hiển thị lỗi nếu trống hoặc dưới 6 ký tự
        hasError = true;
    } else {
        passwordError.style.display = 'none'; // Ẩn lỗi nếu hợp lệ
    }

    // Kiểm tra hợp lệ cho confirm-password
    if (confirmPassword !== password) {
        confirmPasswordError.style.display = 'block'; // Hiển thị lỗi nếu không khớp
        hasError = true;
    } else {
        confirmPasswordError.style.display = 'none'; // Ẩn lỗi nếu hợp lệ
    }

    // Nếu không có lỗi, lưu thông tin người dùng vào localStorage
    if (!hasError) {
        const newUser = { fullname, email, password }; // Tạo đối tượng người dùng mới
        users.push(newUser); // Thêm vào mảng users
        localStorage.setItem('users', JSON.stringify(users)); // Lưu vào localStorage
        alert('Registration successful!'); // Hiển thị thông báo thành công
        form.reset(); // Reset biểu mẫu sau khi đăng ký
    }
});