
// =============================================================================
// KHAI BÁO BIẾN VÀ KHỞI TẠO
// =============================================================================
// cho trang hiện tại
let currentPage = 1;
// số phần tử của từng trang.
let itemsPerPage = 12;




// =============================================================================
// XỬ LÝ LOCALSTORAGE VÀ DỮ LIỆU
// =============================================================================
// Hàm lấy dữ liệu bài test từ localStorage
function getTestsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tests')) || [];
}

// Hàm lấy tên danh mục và emoji theo categoryId
function getTestCategoryNameWithEmojiById(categoryId) {
    const categories = JSON.parse(localStorage.getItem('Category')) || [];
    const category = categories.find(cat => cat.id === categoryId);
    return category ? `${category.categoryEmoji} ${category.categoryName}` : 'Chưa xác định';
}


// =============================================================================
// HIỂN THỊ TRANG CHỦ
// =============================================================================
// Hàm render dữ liệu bài test
function renderHomePage() {
    const tests = getTestsFromLocalStorage();
    const tableBody = document.querySelector('.quiz-grid');
    tableBody.innerHTML = ''; // Xóa nội dung cũ

    // Phân trang 
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const testsToRender = tests.slice(start, end);

    // Render bài test
    testsToRender.forEach(test => {
        const category = getTestCategoryNameWithEmojiById(test.categoryId);
        const quizItem = document.createElement('div');
        quizItem.classList.add('quiz-item');

        quizItem.innerHTML = `
            <div class="quiz-status live"><i class="fas fa-circle"></i> ${category}</div>
            <div class="quiz-content">
                <img src="${test.image}" alt="Quiz icon" class="quiz-icon">
                <div class="quiz-info">
                    <h3>${test.testName}</h3>
                    <p>${test.questions.length} câu hỏi • ${test.playAmount} lượt chơi</p>
                </div>
                <a href="../user/doTest_page.html" data-bs-toggle="modal" data-bs-target="#note"><button class="play-now-btn" >Chơi</button> </a>
                
            </div>
        `;

        tableBody.appendChild(quizItem);
    });

    paginationPage();  // Render phân trang
}



// =============================================================================
// PHÂN TRANG
// =============================================================================
function paginationPage() {
    const tests = getTestsFromLocalStorage();
    const totalPages = Math.ceil(tests.length / itemsPerPage);
    const pagination = document.querySelector('.pagination');
    let pageHtml = "";

    pageHtml += `<a href="#" class="page-link prev" onclick="prevPage()"><i class="fas fa-chevron-left"></i></a>`;

    for (let i = 1; i <= totalPages; i++) {
        pageHtml += `<a href="#" class="page-link ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</a>`;
    }

    pageHtml += `<a href="#" class="page-link next" onclick="nextPage()"><i class="fas fa-chevron-right"></i></a>`;

    pagination.innerHTML = pageHtml;
}

// Chuyển trang
function goToPage(page) {
    currentPage = page;
    renderHomePage();
}

// Di chuyển đến trang tiếp theo
function nextPage() {
    currentPage++;
    renderHomePage();
}

// Di chuyển về trang trước
function prevPage() {
    currentPage--;
    renderHomePage();
}



// =============================================================================
// LỌC VÀ SẮP XẾP
// =============================================================================
// Xử lý cho 2 nút sắp xếp chuyển màu
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Xóa lớp 'active' khỏi tất cả các nút
        filterButtons.forEach(b => b.classList.remove('active'));

        // Thêm lớp 'active' vào nút đã được bấm
        btn.classList.add('active');

        // Lưu lựa chọn sắp xếp vào sessionStorage
        const sortType = btn.innerText.includes('Lượt chơi tăng dần') ? 'asc' : 'desc';
        sessionStorage.setItem('sortOption', sortType);

        // Gọi render để áp dụng sắp xếp
        renderHomePage();
    });
});

// Hàm sắp xếp tăng / giảm lượt chơi
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tests = getTestsFromLocalStorage();
        let sortedTests = [];

        if (btn.innerText.includes('Lượt chơi tăng dần')) {
            sortedTests = tests.sort((a, b) => a.playAmount - b.playAmount);
        } else if (btn.innerText.includes('Lượt chơi giảm dần')) {
            sortedTests = tests.sort((a, b) => b.playAmount - a.playAmount);
        }

        // Render lại bảng sau khi sắp xếp
        const tableBody = document.querySelector('.quiz-grid');
        tableBody.innerHTML = '';

        sortedTests.forEach(test => {
            const category = getTestCategoryNameWithEmojiById(test.categoryId);
            const quizItem = document.createElement('div');
            quizItem.classList.add('quiz-item');

            quizItem.innerHTML = `
                <div class="quiz-status live"><i class="fas fa-circle"></i> ${category}</div>
                <div class="quiz-content">
                    <img src="${test.image}" alt="Quiz icon" class="quiz-icon">
                    <div class="quiz-info">
                        <h3>${test.testName}</h3>
                        <p>${test.questions.length} câu hỏi • ${test.playAmount} lượt chơi</p>
                    </div>
                    <button class="play-now-btn" href="../user/doTest_page.html">Chơi</button>
                </div>
            `;

            tableBody.appendChild(quizItem);
        });
    });
});




// =============================================================================
// TÌM KIẾM
// =============================================================================
// Hàm tìm kiếm bài test theo tên
document.querySelector('.search-bar .fa-magnifying-glass').addEventListener('click', () => {
    const searchTerm = document.querySelector('.input').value.toLowerCase();
    const tests = getTestsFromLocalStorage();
    const filteredTests = tests.filter(test => test.testName.toLowerCase().includes(searchTerm));
    const tableBody = document.querySelector('.quiz-grid');
    tableBody.innerHTML = ''; // Xóa dữ liệu cũ

    filteredTests.forEach(test => {
        const category = getTestCategoryNameWithEmojiById(test.categoryId);
        const quizItem = document.createElement('div');
        quizItem.classList.add('quiz-item');

        quizItem.innerHTML = `
            <div class="quiz-status live"><i class="fas fa-circle"></i> ${category}</div>
            <div class="quiz-content">
                <img src="${test.image}" alt="Quiz icon" class="quiz-icon">
                <div class="quiz-info">
                    <h3>${test.testName}</h3>
                    <p>${test.questions.length} câu hỏi • ${test.playAmount} lượt chơi</p>
                </div>
               <button class="play-now-btn" href="../user/doTest_page.html">Chơi</button>
            </div>
        `;

        tableBody.appendChild(quizItem);
    });
});


// =============================================================================
// KHỞI TẠO TRANG
// =============================================================================
// Gọi hàm render khi trang tải
document.addEventListener('DOMContentLoaded', function () {
    renderHomePage();
});