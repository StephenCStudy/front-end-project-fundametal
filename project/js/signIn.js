if (document.querySelector('.registration-form')) {
    window.addEventListener('load', function() {
        const errorLabels = document.querySelectorAll('.danger');
        errorLabels.forEach(label => {
            label.style.display = 'none';
        });
    });

    const form = document.querySelector('.registration-form');
    const formGroups = document.querySelectorAll('.form-group');
    const fullnameError = formGroups[0].querySelector('.danger');
    const emailError = formGroups[1].querySelector('.danger');
    const passwordError = formGroups[2].querySelector('.danger');
    const confirmPasswordError = formGroups[3].querySelector('.danger');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        let hasError = false;

        if (fullname.trim() === '') {
            fullnameError.textContent = "Họ và tên là bắt buộc";
            fullnameError.style.display = 'block';
            hasError = true;
        } else {
            fullnameError.style.display = 'none';
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email.trim() === '') {
            emailError.textContent = "Email là bắt buộc";
            emailError.style.display = 'block';
            hasError = true;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = "Định dạng email không hợp lệ";
            emailError.style.display = 'block';
            hasError = true;
        } else if (window.authService.getUsersFromStorage().some(user => user.email === email)) {
            emailError.textContent = "Email đã được sử dụng";
            emailError.style.display = 'block';
            hasError = true;
        } else {
            emailError.style.display = 'none';
        }

        if (password === '') {
            passwordError.textContent = "Mật khẩu là bắt buộc";
            passwordError.style.display = 'block';
            hasError = true;
        } else if (password.length < 6) {
            passwordError.textContent = "Mật khẩu phải có ít nhất 6 ký tự";
            passwordError.style.display = 'block';
            hasError = true;
        } else {
            passwordError.style.display = 'none';
        }

        if (confirmPassword === '') {
            confirmPasswordError.textContent = "Xác nhận mật khẩu là bắt buộc";
            confirmPasswordError.style.display = 'block';
            hasError = true;
        } else if (confirmPassword !== password) {
            confirmPasswordError.textContent = "Mật khẩu không khớp";
            confirmPasswordError.style.display = 'block';
            hasError = true;
        } else {
            confirmPasswordError.style.display = 'none';
        }

        if (!hasError) {
            const result = window.authService.registerUser(fullname, email, password);
            
            if (result.success) {
                // alert('Đăng ký thành công!');
                form.reset();
                window.location.href = "../auth/login_page.html"; // Chuyển hướng đến trang đăng nhập
            } else {
                emailError.textContent = result.message;
                emailError.style.display = 'block';
            }
        }
    });
}
