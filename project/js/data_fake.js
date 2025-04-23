// dữ liệu mẫu khi chạy chương tình.

// let data = [];
// localStorage.setItem("data", JSON.stringify(data));

// students.js - Mảng dữ liệu 100 sinh viên mẫu

const students = [
    {
        id: 1,
        fullName: "Nguyễn Văn An",
        age: 20,
        gender: "Nam",
        gpa: 3.5,
        major: "Công nghệ thông tin"
    },
    {
        id: 2,
        fullName: "Trần Thị Bình",
        age: 21,
        gender: "Nữ",
        gpa: 3.7,
        major: "Kinh tế"
    },
    {
        id: 3,
        fullName: "Lê Văn Cường",
        age: 22,
        gender: "Nam",
        gpa: 3.2,
        major: "Kỹ thuật điện"
    },
    {
        id: 4,
        fullName: "Phạm Thị Dung",
        age: 20,
        gender: "Nữ",
        gpa: 3.8,
        major: "Ngôn ngữ Anh"
    },
    {
        id: 5,
        fullName: "Hoàng Văn Em",
        age: 19,
        gender: "Nam",
        gpa: 3.1,
        major: "Công nghệ thông tin"
    },
    {
        id: 6,
        fullName: "Vũ Thị Phương",
        age: 21,
        gender: "Nữ",
        gpa: 3.9,
        major: "Y khoa"
    },
    {
        id: 7,
        fullName: "Đặng Văn Giang",
        age: 22,
        gender: "Nam",
        gpa: 3.4,
        major: "Quản trị kinh doanh"
    },
    {
        id: 8,
        fullName: "Ngô Thị Hà",
        age: 20,
        gender: "Nữ",
        gpa: 3.6,
        major: "Luật"
    },
    {
        id: 9,
        fullName: "Bùi Văn Kiên",
        age: 21,
        gender: "Nam",
        gpa: 3.0,
        major: "Kiến trúc"
    },
    {
        id: 10,
        fullName: "Đỗ Thị Lan",
        age: 19,
        gender: "Nữ",
        gpa: 3.7,
        major: "Báo chí"
    },
    {
        id: 11,
        fullName: "Hồ Văn Minh",
        age: 22,
        gender: "Nam",
        gpa: 3.3,
        major: "Công nghệ thông tin"
    },
    {
        id: 12,
        fullName: "Lý Thị Ngọc",
        age: 20,
        gender: "Nữ",
        gpa: 3.5,
        major: "Tài chính - Ngân hàng"
    },
    {
        id: 13,
        fullName: "Dương Văn Phong",
        age: 21,
        gender: "Nam",
        gpa: 3.2,
        major: "Kỹ thuật xây dựng"
    },
    {
        id: 14,
        fullName: "Mai Thị Quỳnh",
        age: 20,
        gender: "Nữ",
        gpa: 3.8,
        major: "Marketing"
    },
    {
        id: 15,
        fullName: "Phan Văn Sơn",
        age: 22,
        gender: "Nam",
        gpa: 3.4,
        major: "Công nghệ thông tin"
    },
    {
        id: 16,
        fullName: "Trương Thị Thúy",
        age: 21,
        gender: "Nữ",
        gpa: 3.6,
        major: "Kế toán"
    },
    {
        id: 17,
        fullName: "Võ Văn Uy",
        age: 20,
        gender: "Nam",
        gpa: 3.1,
        major: "Thiết kế đồ họa"
    },
    {
        id: 18,
        fullName: "Đoàn Thị Vân",
        age: 19,
        gender: "Nữ",
        gpa: 3.9,
        major: "Quản trị khách sạn"
    },
    {
        id: 19,
        fullName: "Huỳnh Văn Xuân",
        age: 22,
        gender: "Nam",
        gpa: 3.5,
        major: "Công nghệ thông tin"
    },
    {
        id: 20,
        fullName: "Lưu Thị Yến",
        age: 21,
        gender: "Nữ",
        gpa: 3.7,
        major: "Du lịch"
    },
    {
        id: 21,
        fullName: "Đinh Văn Anh",
        age: 20,
        gender: "Nam",
        gpa: 3.3,
        major: "Điện tử viễn thông"
    },
    {
        id: 22,
        fullName: "Triệu Thị Bích",
        age: 19,
        gender: "Nữ",
        gpa: 3.8,
        major: "Công nghệ thực phẩm"
    },
    {
        id: 23,
        fullName: "Cao Văn Chính",
        age: 21,
        gender: "Nam",
        gpa: 3.2,
        major: "Công nghệ thông tin"
    },
    {
        id: 24,
        fullName: "Lương Thị Diệp",
        age: 22,
        gender: "Nữ",
        gpa: 3.6,
        major: "Ngôn ngữ Pháp"
    },
    {
        id: 25,
        fullName: "Châu Văn Hải",
        age: 20,
        gender: "Nam",
        gpa: 3.4,
        major: "Quản lý đất đai"
    },
    {
        id: 26,
        fullName: "Tống Thị Giang",
        age: 21,
        gender: "Nữ",
        gpa: 3.7,
        major: "Kỹ thuật môi trường"
    },
    {
        id: 27,
        fullName: "Lâm Văn Hùng",
        age: 22,
        gender: "Nam",
        gpa: 3.0,
        major: "Khoa học máy tính"
    },
    {
        id: 28,
        fullName: "Thái Thị Hường",
        age: 20,
        gender: "Nữ",
        gpa: 3.9,
        major: "Dược học"
    },
    {
        id: 29,
        fullName: "Trịnh Văn Khang",
        age: 21,
        gender: "Nam",
        gpa: 3.5,
        major: "Công nghệ thông tin"
    },
    {
        id: 30,
        fullName: "Quách Thị Linh",
        age: 19,
        gender: "Nữ",
        gpa: 3.4,
        major: "Kinh tế"
    },
    {
        id: 31,
        fullName: "Nguyễn Văn Mạnh",
        age: 22,
        gender: "Nam",
        gpa: 3.3,
        major: "Vật lý kỹ thuật"
    },
    {
        id: 32,
        fullName: "Trần Thị Nhung",
        age: 20,
        gender: "Nữ",
        gpa: 3.8,
        major: "Quan hệ quốc tế"
    },
    {
        id: 33,
        fullName: "Lê Văn Phúc",
        age: 21,
        gender: "Nam",
        gpa: 3.1,
        major: "Công nghệ thông tin"
    },
    {
        id: 34,
        fullName: "Phạm Thị Quỳnh",
        age: 22,
        gender: "Nữ",
        gpa: 3.6,
        major: "Ngôn ngữ Anh"
    },
    {
        id: 35,
        fullName: "Hoàng Văn Sang",
        age: 20,
        gender: "Nam",
        gpa: 3.5,
        major: "Kỹ thuật cơ khí"
    },
    {
        id: 36,
        fullName: "Vũ Thị Tâm",
        age: 19,
        gender: "Nữ",
        gpa: 3.7,
        major: "Tâm lý học"
    },
    {
        id: 37,
        fullName: "Đặng Văn Uy",
        age: 21,
        gender: "Nam",
        gpa: 3.2,
        major: "Khoa học máy tính"
    },
    {
        id: 38,
        fullName: "Ngô Thị Vân",
        age: 22,
        gender: "Nữ",
        gpa: 3.9,
        major: "Quản trị kinh doanh"
    },
    {
        id: 39,
        fullName: "Bùi Văn Xuân",
        age: 20,
        gender: "Nam",
        gpa: 3.4,
        major: "Kỹ thuật điện"
    },
    {
        id: 40,
        fullName: "Đỗ Thị Yến",
        age: 21,
        gender: "Nữ",
        gpa: 3.6,
        major: "Công nghệ thông tin"
    },
    {
        id: 41,
        fullName: "Hồ Văn Anh",
        age: 22,
        gender: "Nam",
        gpa: 3.3,
        major: "Kinh tế quốc tế"
    },
    {
        id: 42,
        fullName: "Lý Thị Bình",
        age: 20,
        gender: "Nữ",
        gpa: 3.8,
        major: "Khoa học dữ liệu"
    },
    {
        id: 43,
        fullName: "Dương Văn Cường",
        age: 19,
        gender: "Nam",
        gpa: 3.5,
        major: "Kỹ thuật hóa học"
    },
    {
        id: 44,
        fullName: "Mai Thị Diệp",
        age: 21,
        gender: "Nữ",
        gpa: 3.7,
        major: "Công nghệ thông tin"
    },
    {
        id: 45,
        fullName: "Phan Văn Em",
        age: 22,
        gender: "Nam",
        gpa: 3.1,
        major: "Kiến trúc"
    },
    {
        id: 46,
        fullName: "Trương Thị Giang",
        age: 20,
        gender: "Nữ",
        gpa: 3.6,
        major: "Y đa khoa"
    },
    {
        id: 47,
        fullName: "Võ Văn Hùng",
        age: 21,
        gender: "Nam",
        gpa: 3.4,
        major: "Công nghệ thông tin"
    },
    {
        id: 48,
        fullName: "Đoàn Thị Hường",
        age: 20,
        gender: "Nữ",
        gpa: 3.9,
        major: "Tài chính - Ngân hàng"
    },
    {
        id: 49,
        fullName: "Huỳnh Văn Khang",
        age: 22,
        gender: "Nam",
        gpa: 3.2,
        major: "Quản trị kinh doanh"
    },
    {
        id: 50,
        fullName: "Lưu Thị Linh",
        age: 19,
        gender: "Nữ",
        gpa: 3.8,
        major: "Luật"
    },
    {
        id: 51,
        fullName: "Đinh Văn Mạnh",
        age: 21,
        gender: "Nam",
        gpa: 3.5,
        major: "Khoa học máy tính"
    },
    {
        id: 52,
        fullName: "Triệu Thị Nhung",
        age: 20,
        gender: "Nữ",
        gpa: 3.7,
        major: "Công nghệ thông tin"
    },
    {
        id: 53,
        fullName: "Cao Văn Phúc",
        age: 22,
        gender: "Nam",
        gpa: 3.3,
        major: "Marketing"
    },
    {
        id: 54,
        fullName: "Lương Thị Quỳnh",
        age: 21,
        gender: "Nữ",
        gpa: 3.6,
        major: "Kế toán"
    },
    {
        id: 55,
        fullName: "Châu Văn Sang",
        age: 20,
        gender: "Nam",
        gpa: 3.2,
        major: "Công nghệ thông tin"
    },
    {
        id: 56,
        fullName: "Tống Thị Tâm",
        age: 19,
        gender: "Nữ",
        gpa: 3.9,
        major: "Ngôn ngữ Hàn Quốc"
    },
    {
        id: 57,
        fullName: "Lâm Văn Uy",
        age: 22,
        gender: "Nam",
        gpa: 3.4,
        major: "Kỹ thuật xây dựng"
    },
    {
        id: 58,
        fullName: "Thái Thị Vân",
        age: 21,
        gender: "Nữ",
        gpa: 3.5,
        major: "Công nghệ thông tin"
    },
    {
        id: 59,
        fullName: "Trịnh Văn Xuân",
        age: 20,
        gender: "Nam",
        gpa: 3.1,
        major: "Thiết kế đồ họa"
    },
    {
        id: 60,
        fullName: "Quách Thị Yến",
        age: 21,
        gender: "Nữ",
        gpa: 3.8,
        major: "Quản trị khách sạn"
    },
    {
        id: 61,
        fullName: "Nguyễn Văn Anh",
        age: 22,
        gender: "Nam",
        gpa: 3.6,
        major: "Công nghệ thông tin"
    },
    {
        id: 62,
        fullName: "Trần Thị Bích",
        age: 20,
        gender: "Nữ",
        gpa: 3.7,
        major: "Ngôn ngữ Trung"
    },
    {
        id: 63,
        fullName: "Lê Văn Chính",
        age: 19,
        gender: "Nam",
        gpa: 3.3,
        major: "Điện tử viễn thông"
    },
    {
        id: 64,
        fullName: "Phạm Thị Diệp",
        age: 21,
        gender: "Nữ",
        gpa: 3.5,
        major: "Công nghệ thông tin"
    },
    {
        id: 65,
        fullName: "Hoàng Văn Hải",
        age: 22,
        gender: "Nam",
        gpa: 3.2,
        major: "Quản lý đất đai"
    },
    {
        id: 66,
        fullName: "Vũ Thị Giang",
        age: 20,
        gender: "Nữ",
        gpa: 3.9,
        major: "Báo chí truyền thông"
    },
    {
        id: 67,
        fullName: "Đặng Văn Hùng",
        age: 21,
        gender: "Nam",
        gpa: 3.4,
        major: "Công nghệ thông tin"
    },
    {
        id: 68,
        fullName: "Ngô Thị Hường",
        age: 22,
        gender: "Nữ",
        gpa: 3.6,
        major: "Quản trị kinh doanh"
    },
    {
        id: 69,
        fullName: "Bùi Văn Khang",
        age: 20,
        gender: "Nam",
        gpa: 3.0,
        major: "Kỹ thuật ô tô"
    },
    {
        id: 70,
        fullName: "Đỗ Thị Linh",
        age: 19,
        gender: "Nữ",
        gpa: 3.7,
        major: "Công nghệ thông tin"
    },
    {
        id: 71,
        fullName: "Hồ Văn Mạnh",
        age: 21,
        gender: "Nam",
        gpa: 3.5,
        major: "Công nghệ sinh học"
    },
    {
        id: 72,
        fullName: "Lý Thị Nhung",
        age: 22,
        gender: "Nữ",
        gpa: 3.8,
        major: "Kế toán"
    },
    {
        id: 73,
        fullName: "Dương Văn Phúc",
        age: 20,
        gender: "Nam",
        gpa: 3.2,
        major: "Công nghệ thông tin"
    },
    {
        id: 74,
        fullName: "Mai Thị Quỳnh",
        age: 21,
        gender: "Nữ",
        gpa: 3.6,
        major: "Tài chính - Ngân hàng"
    },
    {
        id: 75,
        fullName: "Phan Văn Sang",
        age: 19,
        gender: "Nam",
        gpa: 3.1,
        major: "Kỹ thuật điện"
    },
    {
        id: 76,
        fullName: "Trương Thị Tâm",
        age: 22,
        gender: "Nữ",
        gpa: 3.9,
        major: "Công nghệ thông tin"
    },
    {
        id: 77,
        fullName: "Võ Văn Uy",
        age: 21,
        gender: "Nam",
        gpa: 3.5,
        major: "Kiến trúc"
    },
    {
        id: 78,
        fullName: "Đoàn Thị Vân",
        age: 20,
        gender: "Nữ",
        gpa: 3.7,
        major: "Ngôn ngữ Anh"
    },
    {
        id: 79,
        fullName: "Huỳnh Văn Xuân",
        age: 22,
        gender: "Nam",
        gpa: 3.3,
        major: "Công nghệ thông tin"
    },
    {
        id: 80,
        fullName: "Lưu Thị Yến",
        age: 19,
        gender: "Nữ",
        gpa: 3.8,
        major: "Marketing"
    },
    {
        id: 81,
        fullName: "Đinh Văn Anh",
        age: 21,
        gender: "Nam",
        gpa: 3.4,
        major: "Khoa học máy tính"
    },
    {
        id: 82,
        fullName: "Triệu Thị Bích",
        age: 20,
        gender: "Nữ",
        gpa: 3.6,
        major: "Công nghệ thông tin"
    },
    {
        id: 83,
        fullName: "Cao Văn Chính",
        age: 22,
        gender: "Nam",
        gpa: 3.2,
        major: "Quản trị kinh doanh"
    },
    {
        id: 84,
        fullName: "Lương Thị Diệp",
        age: 21,
        gender: "Nữ",
        gpa: 3.7,
        major: "Luật kinh tế"
    },
    {
        id: 85,
        fullName: "Châu Văn Em",
        age: 19,
        gender: "Nam",
        gpa: 3.5,
        major: "Công nghệ thông tin"
    },
    {
        id: 86,
        fullName: "Tống Thị Giang",
        age: 20,
        gender: "Nữ",
        gpa: 3.9,
        major: "Y khoa"
    },
    {
        id: 87,
        fullName: "Lâm Văn Hùng",
        age: 22,
        gender: "Nam",
        gpa: 3.0,
        major: "Kỹ thuật xây dựng"
    },
    {
        id: 88,
        fullName: "Thái Thị Hường",
        age: 21,
        gender: "Nữ",
        gpa: 3.6,
        major: "Công nghệ thông tin"
    },
    {
        id: 89,
        fullName: "Trịnh Văn Khang",
        age: 20,
        gender: "Nam",
        gpa: 3.3,
        major: "Thiết kế đồ họa"
    },
    {
        id: 90,
        fullName: "Quách Thị Linh",
        age: 19,
        gender: "Nữ",
        gpa: 3.8,
        major: "Quản trị khách sạn"
    },
    {
        id: 91,
        fullName: "Nguyễn Văn Mạnh",
        age: 22,
        gender: "Nam",
        gpa: 3.4,
        major: "Công nghệ thông tin"
    },
    {
        id: 92,
        fullName: "Trần Thị Nhung",
        age: 21,
        gender: "Nữ",
        gpa: 3.5,
        major: "Ngôn ngữ Nhật"
    },
    {
        id: 93,
        fullName: "Lê Văn Phúc",
        age: 20,
        gender: "Nam",
        gpa: 3.2,
        major: "Công nghệ thực phẩm"
    },
    {
        id: 94,
        fullName: "Phạm Thị Quỳnh",
        age: 19,
        gender: "Nữ",
        gpa: 3.7,
        major: "Công nghệ thông tin"
    },
    {
        id: 95,
        fullName: "Hoàng Văn Sang",
        age: 22,
        gender: "Nam",
        gpa: 3.6,
        major: "Kỹ thuật cơ khí"
    },
    {
        id: 96,
        fullName: "Vũ Thị Tâm",
        age: 21,
        gender: "Nữ",
        gpa: 3.9,
        major: "Tâm lý học"
    },
    {
        id: 97,
        fullName: "Đặng Văn Uy",
        age: 20,
        gender: "Nam",
        gpa: 3.1,
        major: "Công nghệ thông tin"
    },
    {
        id: 98,
        fullName: "Ngô Thị Vân",
        age: 19,
        gender: "Nữ",
        gpa: 3.8,
        major: "Du lịch"
    },
    {
        id: 99,
        fullName: "Bùi Văn Xuân",
        age: 22,
        gender: "Nam",
        gpa: 3.5,
        major: "Khoa học máy tính"
    },
    {
        id: 100,
        fullName: "Đỗ Thị Yến",
        age: 21,
        gender: "Nữ",
        gpa: 3.7,
        major: "Công nghệ thông tin"
    }
];

// Export mảng sinh viên để có thể sử dụng ở các file khác
export default students;

