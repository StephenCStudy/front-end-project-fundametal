
// =============================================================================
// 1. KHỞI TẠO VÀ QUẢN LÝ DỮ LIỆU NGƯỜI DÙNG
// =============================================================================

// Khởi tạo mảng users với tài khoản admin , user mặc định nếu chưa có trong local
function accountCreate() {
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
    let idNew = Date.now();


    // Chuyển đổi dấu thời gian sang chuỗi hệ cơ số 36 (bao gồm các chữ số và chữ cái từ a-z)
    let base36 = idNew.toString(36);

    // Sinh ra một số ngẫu nhiên trong khoảng (0, 1), sau đó chuyển nó sang chuỗi hệ cơ số 36
    // Lấy phần số sau dấu chấm và cắt 5 ký tự ngẫu nhiên
    let randomBase36 = Math.random().toString(36).substr(2, 5);

    // Kết hợp dấu thời gian (ở hệ cơ số 36) và chuỗi ngẫu nhiên tạo ra một ID duy nhất
    return base36 + randomBase36;
}

// Lấy tất cả người dùng từ localStorage
function getUsersFromStorage() {
    return JSON.parse(localStorage.getItem('users')) || [];

}

// Lưu người dùng vào localStorage
function saveUsersToStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}




// =============================================================================
// 2. ĐĂNG NHẬP VÀ KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP
// =============================================================================

// Đăng nhập người dùng
function loginUser(email, password) {
    const users = getUsersFromStorage();
    const user = users.find(u => u.email === email && u.password === password); // Tìm người dùng trong mảng users dựa trên email và password
    
    if (user) {

        // Thiết lập trạng thái đăng nhập dựa trên role
        if (user.role === "admin") {
            // Admin: lưu vào sessionStorage (sẽ bị xóa khi đóng trình duyệt)
            sessionStorage.setItem("isLogin", "true");
            localStorage.setItem("currentUserId", user.id);
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



// =============================================================================
// 3. QUẢN LÝ THÔNG TIN NGƯỜI DÙNG HIỆN TẠI
// =============================================================================

// Lấy thông tin người dùng hiện tại đang đăng nhập
function getCurrentUser() {
    // lấy ID người dùng hiện tại từ cả hai loại storage
    const userId = sessionStorage.getItem("currentUserId") || localStorage.getItem("currentUserId"); 

    // Nếu không có ID người dùng, trả về null
    // Điều này có thể xảy ra nếu người dùng chưa đăng nhập hoặc đã đăng xuất
    if (!userId) return null;
    
    const users = getUsersFromStorage(); // Lấy tất cả người dùng từ localStorage
    // Tìm người dùng trong mảng users dựa trên ID
    return users.find(user => user.id === userId) || null;  //trả về mảng nếu tìm thấy id người hiện tại hoặc null.
}



// =============================================================================
// 4. ĐĂNG XUẤT
// =============================================================================

// Đăng xuất người dùng
function logoutUser() {
    // Xóa thông tin đăng nhập ở sesionStorage để đảm bảo đăng xuất hoàn toàn tk admin
    sessionStorage.removeItem("isLogin");
    localStorage.removeItem("currentUserId");
    // Xóa thông tin đăng nhập ở localStorage để đảm bảo đăng xuất hoàn toàn tk user
    localStorage.removeItem("isLogin");
    localStorage.removeItem("currentUserId");
}



// =============================================================================
// 5. ĐĂNG KÝ TÀI KHOẢN MỚI
// =============================================================================

// Đăng ký người dùng mới
function createNewAccount(fullname, email, password) {
    const users = getUsersFromStorage();
    
    // Kiểm tra email đã tồn tại chưa
    if (users.some(user => user.email === email)) {
        return { success: false, message: "Email đã được sử dụng" };  // trả về thông báo nếu email đã tồn tại
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


// =============================================================================
// 6. KHỞI TẠO VÀ EXPORT
// =============================================================================

// Khởi tạo users khi script được load
accountCreate();

// Export các hàm để sử dụng trong file khác
window.authService = {
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getCurrentUser,
    createNewAccount,
    getUsersFromStorage,
};