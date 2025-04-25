// render select dropdown

const categories = [
    "Chăm sóc sức khỏe", "Quản lý", "Thiết bị điện tử", "Khám phá vũ trụ", "Công cụ", "Nông nghiệp",
    "Kỹ năng mềm", "Thể thao", "Vận hành", "Tổ chức", "Toán học", "Bảo vệ môi trường", "Du lịch", "Ngôn ngữ",
    "SEO", "Chăm sóc sức khỏe", "Tự động hóa", "Sách", "Marketing", "Năng lượng tái tạo", "Lịch sử", "Vũ trụ",
    "Môi trường sống", "Khoa học", "Giải trí", "Thí nghiệm", "Web", "Web", "Công nghệ", "Kỹ năng lãnh đạo",
    "Chế tạo robot", "Thiết kế", "Nghệ thuật", "Kinh tế", "Vật lý", "Hóa học", "Toán học", "Nông nghiệp",
    "Học máy", "Chăm sóc cây trồng"
  ];
  
  // Xóa phần tử trùng lặp
  const uniqueCategories = [...new Set(categories)];
  
  // Thêm các phần tử vào dropdown
  const selectElement = document.getElementById("category");
  
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.textContent = category;
    selectElement.appendChild(option);
  });