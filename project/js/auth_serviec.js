// auth-serviec.js - Quản lý xác thực và dữ liệu người dùng




// Khởi tạo mảng users với tài khoản admin nếu chưa tồn tại
function adminAccount() {
    const users = getUsersFromStorage() || [];
    
    // Kiểm tra xem tài khoản admin đã tồn tại chưa
    const adminExists = users.some(user => user.email === "admin@gmail.com");
    
    if (!adminExists) {
        // Thêm tài khoản admin mặc định
        users.push({
            id: generateUserId(),
            fullname: "Admin",
            email: "admin@gmail.com",
            password: "123456",
            role: "admin"
        });
        users.push({
            id: generateUserId(),
            fullname: "User",
            email: "user@gmail.com",
            password: "123456",
            role: "user"
        });
        // Lưu users vào storage
        saveUsersToStorage(users);
    }
    
    return users;
}

// Tạo ID duy nhất cho người dùng mới
function generateUserId() {
    // Date.now() trả về số mili giây thời gian hiện tại
    let timestamp = Date.now();

    // Chuyển đổi dấu thời gian sang chuỗi hệ cơ số 36 (bao gồm các chữ số và chữ cái từ a-z)
    let timestampBase36 = timestamp.toString(36);

    // Sinh ra một số ngẫu nhiên trong khoảng (0, 1), sau đó chuyển nó sang chuỗi hệ cơ số 36
    // Lấy phần số sau dấu chấm và cắt 5 ký tự ngẫu nhiên
    let randomBase36 = Math.random().toString(36).substr(2, 5);

    // Kết hợp dấu thời gian (ở hệ cơ số 36) và chuỗi ngẫu nhiên tạo ra một ID duy nhất
    return timestampBase36 + randomBase36;
}


// Lấy tất cả người dùng từ localStorage
function getUsersFromStorage() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Lưu người dùng vào localStorage
function saveUsersToStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

















// Đăng nhập người dùng
function loginUser(email, password) {
    const users = getUsersFromStorage();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Thiết lập trạng thái đăng nhập dựa trên role
        if (user.role === "admin") {
            // Admin: lưu vào sessionStorage (sẽ bị xóa khi đóng trình duyệt)
            sessionStorage.setItem("isLogin", "true");
            sessionStorage.setItem("currentUserId", user.id);
        } else {
            // User: lưu vào localStorage (giữ nguyên khi đóng trình duyệt)
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("currentUserId", user.id);
        }
        
        return user;
    }
    
    return null;
}

// Kiểm tra người dùng đã đăng nhập chưa
function isUserLoggedIn() {
    //Kiểm tra sessionStorage (cho admin)
    if (sessionStorage.getItem("isLogin") === "true") {
        return true;
    }
    
    //kiểm tra localStorage (cho user)
    if (localStorage.getItem("isLogin") === "true") {
        return true;
    }
    
    return false;
}



















// Lấy thông tin người dùng hiện tại đang đăng nhập
function getCurrentUser() {
    // lấy ID người dùng hiện tại từ cả hai loại storage
    const userId = sessionStorage.getItem("currentUserId") || localStorage.getItem("currentUserId");
    console.log(userId); 
    if (!userId) return null;
    
    const users = getUsersFromStorage();
    return users.find(user => user.id === userId) || null;  //trả về mảng nếu tìm thấy id người hiện tại hoặc null.
}






















// Đăng xuất người dùng
function logoutUser() {
    // Xóa thông tin đăng nhập ở sesionStorage để đảm bảo đăng xuất hoàn toàn tk admin
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("currentUserId");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("currentUserId");
}












// Đăng ký người dùng mới
function registerUser(fullname, email, password) {
    const users = getUsersFromStorage();
    
    // Kiểm tra email đã tồn tại chưa
    if (users.some(user => user.email === email)) {
        return { success: false, message: "Email đã được sử dụng" };
    }
    
    // Tạo người dùng mới với role mặc định là "user"
    const newUser = {
        id: generateUserId(),
        fullname,
        email,
        password,
        role: "user"
    };
    
    // Thêm vào mảng users và lưu lại
    users.push(newUser);
    saveUsersToStorage(users);
    
    return { success: true, user: newUser };
}

















// Khởi tạo users khi script được load
adminAccount();

// Export các hàm để sử dụng trong file khác
window.authService = {
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getCurrentUser,
    registerUser,
    getUsersFromStorage
};
