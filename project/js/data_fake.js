// dữ liệu mẫu khi chạy chương tình.


// mảng dữ liệu 40 đối tượng của mảng danh mục.

// Dữ liệu mẫu từ data_fake.js
const initialCategories = [
    { id: 1, categoryName: "Chăm sóc sức khỏe", categoryEmoji: "💊" },
    { id: 2, categoryName: "Quản lý", categoryEmoji: "📋" },
    { id: 3, categoryName: "Thiết bị điện tử", categoryEmoji: "🔋" },
    { id: 4, categoryName: "Khám phá vũ trụ", categoryEmoji: "🚀" },
    { id: 5, categoryName: "Công cụ", categoryEmoji: "🛠" },
    { id: 6, categoryName: "Nông nghiệp", categoryEmoji: "🚜" },
    { id: 7, categoryName: "Kỹ năng mềm", categoryEmoji: "🎯" },
    { id: 8, categoryName: "Thể thao", categoryEmoji: "⚽" },
    { id: 9, categoryName: "Vận hành", categoryEmoji: "⚙️" },
    { id: 10, categoryName: "Tổ chức", categoryEmoji: "📅" },
    { id: 11, categoryName: "Toán học", categoryEmoji: "➗" },
    { id: 12, categoryName: "Bảo vệ môi trường", categoryEmoji: "🌳" },
    { id: 13, categoryName: "Du lịch", categoryEmoji: "🌍" },
    { id: 14, categoryName: "Ngôn ngữ", categoryEmoji: "🗣" },
    { id: 15, categoryName: "SEO", categoryEmoji: "🔍" },
    { id: 16, categoryName: "Chăm sóc sức khỏe", categoryEmoji: "💊" },
    { id: 17, categoryName: "Tự động hóa", categoryEmoji: "🤖" },
    { id: 18, categoryName: "Sách", categoryEmoji: "📖" },
    { id: 19, categoryName: "Marketing", categoryEmoji: "📈" },
    { id: 20, categoryName: "Năng lượng tái tạo", categoryEmoji: "🌞" },
    { id: 21, categoryName: "Lịch sử", categoryEmoji: "📜" },
    { id: 22, categoryName: "Vũ trụ", categoryEmoji: "🌌" },
    { id: 23, categoryName: "Môi trường sống", categoryEmoji: "🌍" },
    { id: 24, categoryName: "Khoa học", categoryEmoji: "🔬" },
    { id: 25, categoryName: "Giải trí", categoryEmoji: "🎉" },
    { id: 26, categoryName: "Thí nghiệm", categoryEmoji: "🧪" },
    { id: 27, categoryName: "Web", categoryEmoji: "🌐" },
    { id: 28, categoryName: "Web", categoryEmoji: "🌐" },
    { id: 29, categoryName: "Công nghệ", categoryEmoji: "💻" },
    { id: 30, categoryName: "Kỹ năng lãnh đạo", categoryEmoji: "👔" },
    { id: 31, categoryName: "Chế tạo robot", categoryEmoji: "🤖" },
    { id: 32, categoryName: "Thiết kế", categoryEmoji: "🎨" },
    { id: 33, categoryName: "Nghệ thuật", categoryEmoji: "🎭" },
    { id: 34, categoryName: "Kinh tế", categoryEmoji: "💼" },
    { id: 35, categoryName: "Vật lý", categoryEmoji: "⚛️" },
    { id: 36, categoryName: "Hóa học", categoryEmoji: "🧪" },
    { id: 37, categoryName: "Toán học", categoryEmoji: "➗" },
    { id: 38, categoryName: "Nông nghiệp", categoryEmoji: "🌱" },
    { id: 39, categoryName: "Học máy", categoryEmoji: "🤖" },
    { id: 40, categoryName: "Chăm sóc cây trồng", categoryEmoji: "🌱" }
];

// Kiểm tra nếu chưa có dữ liệu danh mục trong localStorage thì lưu dữ liệu mặc định
function initializeCategories() {
    const categories = getCategoriesFromLocalStorage();
    if (categories.length === 0) {
        saveCategoriesToLocalStorage(initialCategories);  // Lưu mảng initialCategories vào localStorage
    }
}

// Lấy danh mục từ localStorage
function getCategoriesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('Category')) || [];
}

// Lưu danh mục vào localStorage
function saveCategoriesToLocalStorage(categories) {
    localStorage.setItem('Category', JSON.stringify(categories));
}

// Gọi hàm khi trang tải
window.addEventListener('DOMContentLoaded', function() {
    initializeCategories();  // Kiểm tra và lưu dữ liệu vào localStorage nếu chưa có
});




