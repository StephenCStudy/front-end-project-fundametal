// Lấy dữ liệu danh mục từ localStorage
function getCategoriesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('Category')) || [];
}

// Lưu dữ liệu danh mục vào localStorage
function saveCategoriesToLocalStorage(categories) {
    localStorage.setItem('Category', JSON.stringify(categories));
}

// Render bảng danh mục
function renderCategoryTable() {
    const categories = getCategoriesFromLocalStorage();
    const tableBody = document.querySelector('.data-table tbody');
    tableBody.innerHTML = '';

    //phân trang
    const start = (getCurrentPage() - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const categoriesToRender = categories.slice(start, end);



    categoriesToRender.forEach(category => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${category.id}</td>
            <td><span>${category.categoryEmoji}</span> ${category.categoryName}</td>
            <td class="actions">
                <button class="btn-edit" data-bs-toggle="modal" data-bs-target="#editCate" onclick="editCategory(${category.id})">Sửa</button>
                <button class="btn-delete" data-bs-toggle="modal" data-bs-target="#deleteCate" onclick="confirmDelete(${category.id})">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    paginationPage();  // Render phân trang
}


















// Thêm danh mục mới
function addCategory(categoryName, categoryEmoji) {
    let categoryNameError = document.getElementById('categoryNameError');
    const categories = getCategoriesFromLocalStorage();
    // Kiểm tra input rỗng
    if (categoryName.trim() === "") {
        categoryNameError.style.display = 'block';
        return;
    }
    categoryNameError.style.display = 'none';
    // Kiểm tra danh mục đã tồn tại
    if (categories.some(cat => cat.categoryName === categoryName)) {
        categoryNameError.style.display = 'block';
        return;
    }
    const newCategory = {
        id: categories.length + 1,
        categoryName,
        categoryEmoji
    };
    // --- Lưu danh mục ---
    categories.push(newCategory);
    saveCategoriesToLocalStorage(categories);
    renderCategoryTable();

    // --- Tạo bài test mặc định tương ứng ---
    let tests = JSON.parse(localStorage.getItem('tests')) || [];

    const newTest = {
        id: tests.length + 1,
        testName: categoryName,
        categoryId: newCategory.id,
        playTime: 15,
        questions: []
    };

    tests.push(newTest);
    localStorage.setItem('tests', JSON.stringify(tests));

    // Xóa dữ liệu nhập
    document.getElementById("addCateName").value = "";
    document.getElementById("addCateEmoji").value = "";
}

























// Sửa danh mục
function editCategory(categoryId) {
    const categories = getCategoriesFromLocalStorage();
    const category = categories.find(cat => cat.id === categoryId);

    if (category) {
        // Đảm bảo điền đúng dữ liệu vào modal
        document.getElementById('categoryName').value = category.categoryName;
        document.getElementById('emoji').value = category.categoryEmoji;
        document.getElementById('categoryNameError').style.display = 'none';

        const saveButton = document.querySelector('.btn-primary');
        saveButton.onclick = function () {
            category.categoryName = document.getElementById('categoryName').value;
            category.categoryEmoji = document.getElementById('emoji').value;
            saveCategoriesToLocalStorage(categories);
            renderCategoryTable();  // Render lại bảng sau khi sửa
        };
    }
}

































// Xác nhận xóa danh mục
function confirmDelete(categoryId) {
    document.getElementById('confirm-delete-btn').onclick = function () {
        deleteCategory(categoryId);  // Xóa danh mục
    };
}

// Xóa danh mục
function deleteCategory(categoryId) {
    const categories = getCategoriesFromLocalStorage();
    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);

    if (categoryIndex > -1) {
        categories.splice(categoryIndex, 1);  // Xóa danh mục khỏi mảng
        saveCategoriesToLocalStorage(categories);
        renderCategoryTable();  // Render lại bảng sau khi xóa
    }
}





























// Hàm phân trang
let currentPage = 1;
let itemsPerPage = 6; // Mỗi trang sẽ hiển thị 6 phần tử


// Lưu và lấy trang hiện tại trong sessionStorage
function saveCurrentPage(page) {
    sessionStorage.setItem('currentPage', page); // Lưu trang hiện tại vào sessionStorage
}
function getCurrentPage() {
    return parseInt(sessionStorage.getItem('currentPage')) || 1; // Lấy trang hiện tại từ sessionStorage
}


// Hàm phân trang
function paginationPage() {
    let pageHtml = "";
    const totalPages = Math.ceil(getCategoriesFromLocalStorage().length / itemsPerPage);

    pageHtml += `<li class="page-item prev" onclick="prevPage()">
                    <a class="page-link" id="prev-page">
                        <i class="fas fa-chevron-left"></i> <!-- Mũi tên trái -->
                    </a>
                 </li>`;
    // Tạo các nút trang từ 1 đến totalPages
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
    // Kiểm tra trang hiện tại và làm cho nút Previous/Next bị vô hiệu khi cần
    isActivePage(getCurrentPage());
}

// Điều chỉnh trang khi người dùng nhấn vào một trang
function goToPage(page) {
    saveCurrentPage(page);  // Lưu trang vào sessionStorage
    renderCategoryTable();  // Render lại bảng với trang hiện tại
    isActivePage(page); // Giữ màu nền sáng cho trang đã chọn
}


// Di chuyển sang trang tiếp theo
function nextPage() {
    const totalPages = Math.ceil(getCategoriesFromLocalStorage().length / itemsPerPage);
    if (getCurrentPage() < totalPages) {
        saveCurrentPage(getCurrentPage() + 1);  // Lưu trang tiếp theo vào sessionStorage
        renderCategoryTable();
        isActivePage(getCurrentPage());
    }
}


// Di chuyển về trang trước
function prevPage() {
    if (getCurrentPage() > 1) {
        saveCurrentPage(getCurrentPage() - 1);  // Lưu trang trước vào sessionStorage
        renderCategoryTable();
        isActivePage(getCurrentPage());
    }
}


// Kiểm tra trang hiện tại và làm cho nút Previous/Next bị vô hiệu khi cần
function isActivePage(page) {
    const pageLinks = document.querySelectorAll(".page-nav");

    // Xóa lớp 'active' khỏi tất cả các trang
    pageLinks.forEach(link => link.classList.remove("active"));

    // Thêm lớp 'active' vào trang hiện tại
    const currentPageLink = document.querySelector(`.page-nav[data-page="${page}"]`);
    if (currentPageLink) {
        currentPageLink.classList.add("active"); // Giữ màu nền sáng cho trang hiện tại
    }

    const totalPages = Math.ceil(getCategoriesFromLocalStorage().length / itemsPerPage);

    // Vô hiệu hóa nút Previous/Next nếu cần
    if (page === 1) {
        document.getElementById("prev-page").classList.add("disabled");
    } else {
        document.getElementById("prev-page").classList.remove("disabled");
    }

    if (page === totalPages) {
        document.getElementById("next-page").classList.add("disabled");
    } else {
        document.getElementById("next-page").classList.remove("disabled");
    }
}



















// Gọi hàm render khi trang tải
window.addEventListener('DOMContentLoaded', function () {
    renderCategoryTable();
});
