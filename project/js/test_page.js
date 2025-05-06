

// =============================================================================
// 1. BIẾN TOÀN CỤC
// =============================================================================
const itemsPerPage = 6; // Số lượng mục hiển thị trên mỗi trang




// =============================================================================
// 2. QUẢN LÝ DỮ LIỆU - TRUY CẬP LOCAL STORAGE
// =============================================================================
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



// =============================================================================
// 3. QUẢN LÝ PHIÊN - TRUY CẬP SESSION STORAGE
// =============================================================================
// Lưu và lấy trang hiện tại trong sessionStorage
function saveCurrentPage(page) {
    sessionStorage.setItem('currentPage', page);

}

function getCurrentPage() {
    return parseInt(sessionStorage.getItem('currentPage')) || 1;

}

// Lưu và lấy từ khóa tìm kiếm trong sessionStorage
function saveSearchQuery(query) {
    sessionStorage.setItem('searchTestQuery', query);

}

function getSearchQuery() {
    return sessionStorage.getItem('searchTestQuery') || '';

}

// Lưu và lấy lựa chọn sắp xếp trong sessionStorage

function saveSortOption(sortType) {
    sessionStorage.setItem('sortOption', sortType);

}

function getSortOption() {
    return sessionStorage.getItem('sortOption') || 'Sắp xếp theo';

}



// =============================================================================
// 4. HIỂN THỊ BẢNG DỮ LIỆU
// =============================================================================
// Hàm render bảng test từ dữ liệu bài test
function renderTestTable(tests = null) {
    if (!tests) {
        tests = getTestsFromLocalStorage(); // Lấy dữ liệu từ localStorage
    }

    // Sắp xếp toàn bộ dữ liệu theo tiêu chí hiện tại
    tests = sortTests(tests, currentSortType);

    // Lọc dữ liệu theo từ khóa tìm kiếm (nếu có)
    const searchQuery = getSearchQuery().toLowerCase();
    const filteredTests = tests.filter(test => 
        test && test.testName && typeof test.testName === 'string' && 
        test.testName.toLowerCase().includes(searchQuery)
    );

    const tableBody = document.querySelector('.data-table tbody');
    tableBody.innerHTML = '';

    // Phân trang
    const currentPage = getCurrentPage(); // Lấy trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    let testsToRender = [];
    if (startIndex < filteredTests.length) {
        testsToRender = filteredTests.slice(startIndex, Math.min(endIndex, filteredTests.length));
    }

    // Render dữ liệu cho trang hiện tại
    testsToRender.forEach(test => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${test.id}</td>
            <td>${test.testName || 'Không có tên'}</td>
            <td>${renderCategoryNameEmoji(test.categoryId)}</td>
            <td>${test.questions ? test.questions.length : 0}</td>
            <td>${test.playTime || 0} phút</td>
            <td class="actions">
                <button class="btn-edit" onclick="editTest(${test.id})">Sửa</button>
                <button class="btn-delete" data-bs-toggle="modal" data-bs-target="#deleteTest" onclick="confirmDeleteTest(${test.id})">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    paginationPage(filteredTests); // Cập nhật phân trang
}



// =============================================================================
// 5. PHÂN TRANG
// =============================================================================
// Hàm phân trang
function paginationPage(tests) {

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

    isActivePage(getCurrentPage());
}

// Cập nhật trang hiện tại khi người dùng nhấn vào số trang
function goToPage(page) {
    saveCurrentPage(page);
    renderTestTable();
    isActivePage(page);

}

// Di chuyển sang trang tiếp theo
function nextPage() {
    const tests = getTestsFromLocalStorage();
    if (getCurrentPage() < Math.ceil(tests.length / itemsPerPage)) {
        saveCurrentPage(getCurrentPage() + 1);
        renderTestTable();
        isActivePage(getCurrentPage());

    }
}

// Di chuyển về trang trước
function prevPage() {
    if (getCurrentPage() > 1) {
        saveCurrentPage(getCurrentPage() - 1);
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



// =============================================================================
// 6. TÌM KIẾM VÀ SẮP XẾP
// =============================================================================
// Hàm tìm kiếm bài test theo tên
function searchTestByName() {

    const searchQuery = document.querySelector('.search-box input').value.toLowerCase();
    saveSearchQuery(searchQuery);
    const tests = getTestsFromLocalStorage();

    const filteredTests = tests.filter(test => 
        test && test.testName && typeof test.testName === 'string' && 
        test.testName.toLowerCase().includes(searchQuery)

    );
    renderTestTable(filteredTests);
    sessionStorage.setItem('currentPage', 1); // Đặt lại trang về 1 khi tìm kiếm

}


// Thay đổi tiêu chí sắp xếp
function changeSortType(newSortType) {
    currentSortType = newSortType;
    sessionStorage.setItem('sortOption', newSortType); // Lưu vào session
    renderTestTable();
    // console.log(sessionStorage.getItem('sortOption'));
    // console.log(currentSortType);
}


let currentSortType = sessionStorage.getItem('sortOption') || "Tên bài test"; // Lưu tiêu chí sắp xếp

// Hàm sắp xếp các bài test
function sortTests(tests, sortType) {
    const sortedTests = [...tests]; // Tạo bản sao
    switch (sortType) {
        case "Tên bài test":
            sortedTests.sort((a, b) => {
                const nameA = a && a.testName && typeof a.testName === 'string' ? a.testName.toLowerCase() : '';
                const nameB = b && b.testName && typeof b.testName === 'string' ? b.testName.toLowerCase() : '';
                return nameA.localeCompare(nameB);                
            });
            break;

        case "Thời gian":
            sortedTests.sort((a, b) => (a.playTime || 0) - (b.playTime || 0));
            break;

        case "Số câu hỏi":
            sortedTests.sort((a, b) => (a.questions ? a.questions.length : 0) - (b.questions ? b.questions.length : 0));
            break;

        case "Danh mục":
            sortedTests.sort((a, b) => {
                const catA = renderCategoryNameEmoji(a.categoryId).toLowerCase();
                const catB = renderCategoryNameEmoji(b.categoryId).toLowerCase();
                return catA.localeCompare(catB);
            });

            break;
        default:

        return sortedTests;
    }
    return sortedTests;
}



// =============================================================================
// 7. QUẢN LÝ BÀI TEST (THÊM, SỬA, XÓA)
// =============================================================================
// Xác nhận xóa bài test

function confirmDeleteTest(testId) {
    document.getElementById('confirm-delete-btn').onclick = function () {
        deleteTest(testId);
        
    };
}

// Xóa bài test
function deleteTest(testId) {
    const tests = getTestsFromLocalStorage();
    const testIndex = tests.findIndex(test => test.id === testId);

    if (testIndex > -1) {
        tests.splice(testIndex, 1);
        localStorage.setItem('tests', JSON.stringify(tests));
        renderTestTable();
    }
}

// Hàm chỉnh sửa bài kiểm tra
function editTest(testId) {
    localStorage.setItem('currentTestToEdit', testId);
    window.location.href = './add_test_page.html';

}



// =============================================================================
// 8. KHỞI TẠO VÀ XỬ LÝ SỰ KIỆN
// =============================================================================

// Lắng nghe sự kiện khi người dùng nhập từ khóa tìm kiếm
document.querySelector('.search-box input').addEventListener('input', function () {
    searchTestByName();
});

// Thực hiện tìm kiếm khi nhấn Enter
document.querySelector('.search-box input').addEventListener('keydown', function (event) {
    if (event.key === "Enter") {

        searchTestByName();
    }
});

// Lắng nghe sự kiện thay đổi lựa chọn sắp xếp
document.getElementById("sortProduct").addEventListener("change", function (event) {
    const sortType = event.target.value;
    saveSortOption(sortType);

    const tests = getTestsFromLocalStorage();
    const sortedTests = sortTests(tests, sortType);

    renderTestTable(sortedTests);
});


// Gán các hàm cho window để sử dụng trong HTML
window.editTest = editTest;
window.confirmDeleteTest = confirmDeleteTest;
window.deleteTest = deleteTest;
window.goToPage = goToPage;
window.prevPage = prevPage;
window.nextPage = nextPage;


// Khởi tạo khi trang tải
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

    renderTestTable();
});