// Hàm lấy dữ liệu bài test từ localStorage
function getTestsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tests')) || [];
}

// Hàm lấy danh mục từ localStorage
function getTestCategoriesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('Category')) || [];
}

// Hàm tìm tên danh mục và emoji theo categoryId
function getTestCategoryNameWithEmojiById(categoryId) {
    const categories = getTestCategoriesFromLocalStorage();
    const category = categories.find(cat => cat.id === categoryId);
    return category ? `${category.categoryEmoji} ${category.categoryName}` : 'Chưa xác định';
}

// Hàm render bảng câu hỏi từ dữ liệu lưu trong localStorage
let currentPage = 1;
let itemsPerPage = 6;

function renderTestTable() {
    const tests = getTestsFromLocalStorage();  // Lấy dữ liệu bài test từ localStorage
    const tableBody = document.querySelector('.data-table tbody');
    tableBody.innerHTML = '';  // Xóa nội dung bảng cũ

    // Phân trang: Cắt mảng câu hỏi theo trang hiện tại
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const testsToRender = tests.slice(start, end);

    // Render dữ liệu câu hỏi vào bảng
    testsToRender.forEach(test => {
        test.questions.forEach(question => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${test.id}</td>
                <td>${test.testName}</td>
                <td>${getTestCategoryNameWithEmojiById(test.categoryId)}</td> <!-- Tên danh mục và emoji -->
                <td>${test.questions.length}</td>
                <td>${test.playTime} phút</td>
                <td class="actions">
                    <button class="btn-edit" onclick="editTest(${test.id})">Sửa</button>
                    <button class="btn-delete" onclick="confirmDeleteTest(${test.id})">Xóa</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    });

    paginationPage();  // Render phân trang
}

// Hàm phân trang
function paginationPage() {
    const tests = getTestsFromLocalStorage();
    let pageHtml = "";
    pageHtml += `<li class="page-item prev" onclick="prevPage()">
                    <a class="page-link" id="prev-page">
                        <i class="fas fa-chevron-left"></i>
                    </a>
                 </li>`;

    const totalPages = Math.ceil(tests.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        pageHtml += `<li class="page-item">
                        <a class="page-link page-nav" href="#" data-page="${i}" onclick="goToPage(${i})">${i}</a>
                     </li>`;
    }

    pageHtml += `<li class="page-item next" onclick="nextPage()">
                    <a class="page-link" id="next-page">
                        <i class="fas fa-chevron-right"></i>
                    </a>
                 </li>`;
    document.getElementById("pagination").innerHTML = pageHtml;

    isActivePage(currentPage);  // Cập nhật trang hiện tại
}

// Cập nhật trang hiện tại khi người dùng nhấn vào số trang
function goToPage(page) {
    currentPage = page;
    renderTestTable();
    isActivePage(page);
}

// Di chuyển sang trang tiếp theo
function nextPage() {
    const tests = getTestsFromLocalStorage();
    if (currentPage < Math.ceil(tests.length / itemsPerPage)) {
        currentPage++;
        renderTestTable();
        isActivePage(currentPage);
    }
}

// Di chuyển về trang trước
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTestTable();
        isActivePage(currentPage);
    }
}

// Kiểm tra trang hiện tại và làm cho nút Previous/Next bị vô hiệu khi cần
function isActivePage(page) {
    const pageLinks = document.querySelectorAll(".page-nav");

    pageLinks.forEach(link => link.classList.remove("active"));

    const currentPageLink = document.querySelector(`.page-nav[data-page="${page}"]`);
    if (currentPageLink) {
        currentPageLink.classList.add("active");
    }

    const tests = getTestsFromLocalStorage();
    if (page === 1) {
        document.getElementById("prev-page").classList.add("disabled");
    } else {
        document.getElementById("prev-page").classList.remove("disabled");
    }

    if (page === Math.ceil(tests.length / itemsPerPage)) {
        document.getElementById("next-page").classList.add("disabled");
    } else {
        document.getElementById("next-page").classList.remove("disabled");
    }
}

// Gọi hàm renderTestTable khi trang tải
document.addEventListener('DOMContentLoaded', function() {
    renderTestTable();
});
