// dữ liệu mẫu khi chạy chương tình.


// mảng dữ liệu 40 đối tượng của mảng danh mục.

// Dữ liệu mẫu từ data_fake.js         --- Danh mục ---
const Categories = [
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
      saveCategoriesToLocalStorage(Categories);  // Lưu mảng initialCategories vào localStorage
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
window.addEventListener('DOMContentLoaded', function () {
  initializeCategories();  // Kiểm tra và lưu dữ liệu vào localStorage nếu chưa có
});

























































// Dữ liệu mẫu từ data_fake.js         --- bài test ---
const sample_data = [
  // Câu hỏi về công nghệ
  {
    content: "Trong các hệ điều hành dưới đây, hệ điều hành nào được phát triển bởi Microsoft?",
    answers: ["Linux", "macOS", "Windows", "Android"],
    correct: 3
  },
  {
    content: "Ngôn ngữ lập trình nào được sử dụng chủ yếu trong phát triển web động?",
    answers: ["Python", "JavaScript", "Java", "Ruby"],
    correct: 2
  },
  {
    content: "Hệ thống mạng nào dưới đây được sử dụng trong môi trường doanh nghiệp?",
    answers: ["LAN", "WAN", "VPN", "All of the above"],
    correct: 4
  },
  {
    content: "Công nghệ 5G mang đến lợi ích gì?",
    answers: ["Tăng tốc độ truyền tải dữ liệu", "Giảm độ trễ trong mạng", "Hỗ trợ kết nối Internet vạn vật (IoT)", "Tất cả đều đúng"],
    correct: 4
  },
  
  // Câu hỏi về toán học
  {
    content: "Phương trình nào là phương trình bậc hai?",
    answers: ["y = 3x + 5", "y = x^2 + 4x + 4", "y = 5x^3", "y = 2x + 3"],
    correct: 2
  },
  {
    content: "Hệ phương trình nào dưới đây có nghiệm duy nhất?",
    answers: ["x + y = 5, x - y = 1", "x + y = 6, x - y = 6", "x + y = 7, x - y = 1", "x + y = 2, x - y = 3"],
    correct: 1
  },
  {
    content: "Hình học nào có công thức tính diện tích là A = πr^2?",
    answers: ["Hình vuông", "Hình tròn", "Hình tam giác", "Hình chữ nhật"],
    correct: 2
  },
  {
    content: "Phương trình nào là phương trình hàm số bậc nhất?",
    answers: ["y = x^2", "y = 2x + 5", "y = x^3", "y = 4x^2 - 3x"],
    correct: 2
  },

  // Câu hỏi về lịch sử
  {
    content: "Ngày nào là Ngày Quốc khánh Việt Nam?",
    answers: ["2 tháng 9", "30 tháng 4", "1 tháng 5", "10 tháng 3"],
    correct: 1
  },
  {
    content: "Ai là người lãnh đạo phong trào Cần Vương?",
    answers: ["Tôn Thất Thuyết", "Trần Hưng Đạo", "Nguyễn Huệ", "Phan Bội Châu"],
    correct: 1
  },
  {
    content: "Sự kiện nào xảy ra vào ngày 30 tháng 4 năm 1975?",
    answers: ["Giải phóng miền Nam", "Ngày Quốc tế Lao động", "Ngày Tết Nguyên Đán", "Ngày lễ Quốc khánh"],
    correct: 1
  },
  {
    content: "Ai là người sáng lập ra đế chế Mông Cổ?",
    answers: ["Genghis Khan", "Tamerlane", "Kublai Khan", "Marco Polo"],
    correct: 1
  },

  // Câu hỏi về văn học
  {
    content: "Tác phẩm nào là của nhà văn Nguyễn Du?",
    answers: ["Truyện Kiều", "Lão Hạc", "Chí Phèo", "Đoạn trường tân thanh"],
    correct: 1
  },
  {
    content: "Ai là tác giả của tác phẩm 'Những ngày thơ ấu'?",
    answers: ["Tô Hoài", "Nguyễn Du", "Phan Bội Châu", "Nam Cao"],
    correct: 1
  },
  {
    content: "Chủ đề chính của tác phẩm 'Chí Phèo' là gì?",
    answers: ["Sự xung đột giữa các giai cấp", "Cuộc sống trong xã hội phong kiến", "Cuộc đấu tranh giữa cái thiện và cái ác", "Vấn đề tình yêu và hôn nhân"],
    correct: 1
  },
  {
    content: "Tác phẩm 'Đoạn trường tân thanh' là của ai?",
    answers: ["Tố Hữu", "Nguyễn Du", "Nam Cao", "Phan Bội Châu"],
    correct: 2
  }
];






















// Tạo mảng chứa 40 bài test
const initialTests = [];

// Tạo 40 bài test
for (let i = 1; i <= 40; i++) {
const data = sample_data[Math.floor(Math.random() * sample_data.length)];
const answers = data.answers.map((answer, idx) => {
  return {
    answer,
    ...(idx === data.correct - 1 ? { isCorrect: true } : {})
  };
});

const test = {
  id: i,
  testName: `Thử thách kiến thức #${i}`,
  categoryId: i,
  image: "https://www.w3schools.com/html/html5.gif",
  playTime: Math.floor(Math.random() * 20 + 1), // random thời gian từ 1 đến 20 phút
  playAmount: Math.floor(Math.random() * 20) + 1, // random lượt chơi từ 1 đến 20
  questions: [
    {
      content: data.content,
      answers: answers
    }
  ]
};

initialTests.push(test);
}

// Kiểm tra nếu chưa có dữ liệu bài test trong localStorage thì lưu dữ liệu mới
function initializeTests() {
const tests = getTestsFromLocalStorage();
if (tests.length === 0) {
    // Lưu toàn bộ mảng initialTests vào localStorage nếu chưa có
    saveTestsToLocalStorage(initialTests);
}
}

// Lấy dữ liệu bài test từ localStorage
function getTestsFromLocalStorage() {
return JSON.parse(localStorage.getItem('tests')) || [];
}

// Lưu bài test vào localStorage
function saveTestsToLocalStorage(tests) {
localStorage.setItem('tests', JSON.stringify(tests));
}

// Gọi hàm khi trang tải
window.addEventListener('DOMContentLoaded', function () {
initializeTests();  // Kiểm tra và lưu dữ liệu vào localStorage nếu chưa có
});