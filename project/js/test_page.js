// Hàm lấy dữ liệu bài test từ localStorage
function getTestsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tests')) || [];
}
// Hàm lấy danh mục từ localStorage
function getTestCategoriesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('Category')) || [];
}

// Hàm tìm tên danh mục và emoji theo categoryId
function renderCategoryNameEmoji(categoryId) {
    const categories = getTestCategoriesFromLocalStorage();
    const category = categories.find(cat => cat.id === categoryId);
    return category ? `${category.categoryEmoji} ${category.categoryName}` : 'Chưa xác định';
}

// Hàm render bảng test từ dữ liệu bài test
function renderTestTable(tests = null) {
    if (!tests) {
        tests = getTestsFromLocalStorage();  // Lấy dữ liệu bài test từ localStorage nếu không có dữ liệu được truyền vào
    }

    const searchQuery = getSearchQuery().toLowerCase();
    // Fix: Check if testName exists and is a string before calling toLowerCase()
    const filteredTests = tests.filter(test => 
        test && test.testName && typeof test.testName === 'string' && 
        test.testName.toLowerCase().includes(searchQuery)
    );

    const tableBody = document.querySelector('.data-table tbody');
    tableBody.innerHTML = '';  // Xóa nội dung bảng cũ

    // phân trang (thay vì dùng slice, dùng tính toán chỉ mục)
    const currentPage = getCurrentPage();
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;  // Tính chỉ mục bắt đầu
    const endIndex = startIndex + itemsPerPage;  // Tính chỉ mục kết thúc

    let testsToRender = [];

    // Kiểm tra nếu startIndex và endIndex nằm trong phạm vi của filteredTests
    if (startIndex < filteredTests.length) {
        testsToRender = filteredTests.slice(startIndex, Math.min(endIndex, filteredTests.length));
    }

    // Duyệt qua các bài test đã lọc và hiển thị - FIXED: Removed nested loop through questions
    testsToRender.forEach(test => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${test.id}</td>
            <td>${test.testName || 'Không có tên'}</td>
            <td>${renderCategoryNameEmoji(test.categoryId)}</td> <!-- Tên danh mục và emoji -->
            <td>${test.questions ? test.questions.length : 0}</td>
            <td>${test.playTime || 0} phút</td>
            <td class="actions">
                <button class="btn-edit" onclick="editTest(${test.id})">Sửa</button>
                <button class="btn-delete" data-bs-toggle="modal" data-bs-target="#deleteTest" onclick="confirmDeleteTest(${test.id})">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    paginationPage(filteredTests);  // Render phân trang với dữ liệu đã lọc
}

// Hàm phân trang
let itemsPerPage = 6; // Mỗi trang sẽ hiển thị 6 phần tử

// Lưu và lấy trang hiện tại trong sessionStorage
function saveCurrentPage(page) {
    sessionStorage.setItem('currentPage', page); // Lưu trang hiện tại vào sessionStorage
}
function getCurrentPage() {
    return parseInt(sessionStorage.getItem('currentPage')) || 1; // Lấy trang hiện tại từ sessionStorage, nếu không có mặc định là 1
}

// Hàm phân trang
function paginationPage(tests) {
    let pageHtml = "";
    pageHtml += `<li class="page-item prev" onclick="prevPage()">
                    <a class="page-link" id="prev-page">
                        <i class="fas fa-chevron-left"></i> <!-- Mũi tên trái -->
                    </a>
                 </li>`;

    const totalPages = Math.ceil(tests.length / itemsPerPage); // chia mỗi trang thành 6 mục
    for (let i = 1; i <= totalPages; i++) {
        pageHtml += `<li class="page-item">
                        <a class="page-link page-nav" href="#" data-page="${i}" onclick="goToPage(${i})">${i}</a>
                     </li>`;
    }

    pageHtml += `<li class="page-item next" onclick="nextPage()">
                    <a class="page-link" id="next-page">
                        <i class="fas fa-chevron-right"></i> <!-- Mũi tên phải -->
                    </a>
                 </li>`;
    document.getElementById("pagination").innerHTML = pageHtml;

    isActivePage(getCurrentPage());  // Cập nhật trang hiện tại
}

// Cập nhật trang hiện tại khi người dùng nhấn vào số trang
function goToPage(page) {
    saveCurrentPage(page);  // Lưu trang vào sessionStorage
    renderTestTable();  // Render lại bảng với trang hiện tại
    isActivePage(page);
}

// Di chuyển sang trang tiếp theo
function nextPage() {
    const tests = getTestsFromLocalStorage();
    if (getCurrentPage() < Math.ceil(tests.length / itemsPerPage)) {
        saveCurrentPage(getCurrentPage() + 1);  // Lưu trang tiếp theo vào sessionStorage
        renderTestTable();
        isActivePage(getCurrentPage());
    }
}

// Di chuyển về trang trước
function prevPage() {
    if (getCurrentPage() > 1) {
        saveCurrentPage(getCurrentPage() - 1);  // Lưu trang trước vào sessionStorage
        renderTestTable();
        isActivePage(getCurrentPage());
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

// Xác nhận xóa bài test
function confirmDeleteTest(testId) {
    document.getElementById('confirm-delete-btn').onclick = function () {
        deleteTest(testId);  // Xóa bài test
    };
}

// Xóa bài test
function deleteTest(testId) {
    const tests = getTestsFromLocalStorage();
    const testIndex = tests.findIndex(test => test.id === testId);

    if (testIndex > -1) {
        tests.splice(testIndex, 1);  // Xóa bài test khỏi mảng
        localStorage.setItem('tests', JSON.stringify(tests));
        renderTestTable();  // Render lại bảng sau khi xóa
    }
}

// Lưu và lấy từ khóa tìm kiếm trong sessionStorage
function saveSearchQuery(query) {
    sessionStorage.setItem('searchTestQuery', query); // Lưu từ khóa tìm kiếm vào sessionStorage
}
function getSearchQuery() {
    return sessionStorage.getItem('searchTestQuery') || ''; // Lấy từ khóa tìm kiếm từ sessionStorage
}

// Hàm tìm kiếm bài test theo tên
function searchTestByName() {
    const searchQuery = document.querySelector('.search-box input').value.toLowerCase();
    saveSearchQuery(searchQuery);  // Lưu từ khóa tìm kiếm vào sessionStorage
    const tests = getTestsFromLocalStorage();

    // Lọc các bài test theo tên
    // Fix: Same check for testName existence and type as in renderTestTable
    const filteredTests = tests.filter(test => 
        test && test.testName && typeof test.testName === 'string' && 
        test.testName.toLowerCase().includes(searchQuery)
    );
    renderTestTable(filteredTests); // Render bảng với kết quả tìm kiếm
}

// Lắng nghe sự kiện khi người dùng nhập từ khóa tìm kiếm
document.querySelector('.search-box input').addEventListener('input', function () {
    searchTestByName(); // Gọi hàm tìm kiếm khi người dùng nhập
});

// Thực hiện tìm kiếm khi nhấn Enter
document.querySelector('.search-box input').addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        searchTestByName(); // Gọi hàm tìm kiếm khi nhấn Enter
    }
});

// Lưu và lấy lựa chọn sắp xếp trong sessionStorage
function saveSortOption(sortType) {
    sessionStorage.setItem('sortOption', sortType); // Lưu lựa chọn sắp xếp vào sessionStorage
}
function getSortOption() {
    return sessionStorage.getItem('sortOption') || 'Sắp xếp theo'; // Lấy lựa chọn sắp xếp từ sessionStorage
}

// Hàm sắp xếp các bài test
function sortTests(tests, sortType) {
    switch (sortType) {
        case "Tên bài test":
            // Fix: Check if testName exists and is string
            tests.sort((a, b) => {
                const nameA = a && a.testName && typeof a.testName === 'string' ? a.testName.toLowerCase() : '';
                const nameB = b && b.testName && typeof b.testName === 'string' ? b.testName.toLowerCase() : '';
                return nameA.localeCompare(nameB);
            });
            break;
        case "Thời gian":
            // Fix: Check if playTime exists
            tests.sort((a, b) => (a.playTime || 0) - (b.playTime || 0)); // Sắp xếp theo thời gian (tăng dần)
            break;
        case "Số câu hỏi":
            // Fix: Check if questions array exists
            tests.sort((a, b) => (a.questions ? a.questions.length : 0) - (b.questions ? b.questions.length : 0)); // Sắp xếp theo số câu hỏi (tăng dần)
            break;
        case "Danh mục":
            tests.sort((a, b) => {
                const catA = renderCategoryNameEmoji(a.categoryId).toLowerCase(); // Không phân biệt hoa thường
                const catB = renderCategoryNameEmoji(b.categoryId).toLowerCase(); // Không phân biệt hoa thường
                return catA.localeCompare(catB); // Sắp xếp theo tên danh mục (A-Z)
            });
            break;
        default:
            return tests;
    }
    return tests;
}

// Lắng nghe sự kiện thay đổi lựa chọn sắp xếp
document.getElementById("sortProduct").addEventListener("change", function (event) {
    const sortType = event.target.value;
    saveSortOption(sortType);  // Lưu lựa chọn sắp xếp vào sessionStorage

    const tests = getTestsFromLocalStorage();  // Lấy danh sách bài test từ localStorage
    const sortedTests = sortTests(tests, sortType);  // Gọi hàm sortTests để sắp xếp theo loại đã chọn

    renderTestTable(sortedTests);  // Gọi hàm render lại bảng sau khi sắp xếp
});

// Hàm chuyển đến trang sửa bài test
function editTest(testId) {
    window.location.href = `./add_test_page.html?id=${testId}`;
}
// Đặt hàm editTest để sử dụng trong HTML
window.editTest = editTest;
window.confirmDeleteTest = confirmDeleteTest;
window.deleteTest = deleteTest;
window.goToPage = goToPage;
window.prevPage = prevPage;
window.nextPage = nextPage;

// Gọi hàm renderTestTable khi trang tải
// Thiết lập giá trị dropdown sắp xếp từ sessionStorage nếu có
document.addEventListener('DOMContentLoaded', function () {
    // Thiết lập giá trị dropdown sắp xếp từ sessionStorage nếu có
    const sortOption = getSortOption();
    if (sortOption !== 'Sắp xếp theo') {
        document.getElementById('sortProduct').value = sortOption;
    }

    // Thiết lập giá trị tìm kiếm từ sessionStorage nếu có
    const searchQuery = getSearchQuery();
    if (searchQuery) {
        document.querySelector('.search-box input').value = searchQuery;
    }

    renderTestTable();  // Render bảng khi trang tải
});