// session-handler.js - Xử lý trạng thái phiên đăng nhập

// Đặt event listener khi trang bị đóng
window.addEventListener('beforeunload', function() {
    // Phiên đăng nhập của admin lưu trong sessionStorage sẽ tự động bị xóa
    // khi đóng trình duyệt, nên không cần xóa ở đây
    
    // phần này mở rộng thêm khi cần updateupdate
});

// Khi trang tải, kiểm tra xem có phiên đăng nhập nào đang hoạt động không
document.addEventListener('DOMContentLoaded', function() {
    // kiểm tra trạng thái đăng nhập và người dùng hiện tại được xử lý trong 
    // auth_service.js và login.js. File này tồn tại để xử lý các yêu cầu quản lý
    // phiên đăng nhập trong tương lai nếu cần.
});