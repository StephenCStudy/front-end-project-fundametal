let currentPage = 1;
let itemsPerPage = 6; // Mỗi trang sẽ hiển thị 6 phần tử

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

    // Phân trang: Cắt mảng theo trang hiện tại
    const start = (currentPage - 1) * itemsPerPage;
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
    
    // Kiểm tra xem input có trống không
    if (categoryName.trim() === "") {
        categoryNameError.style.display = 'block';
        return;
    } 
    categoryNameError.style.display = 'none';

    // Kiểm tra xem danh mục đã tồn tại chưa
    if (categories.some(cat => cat.categoryName === categoryName)) {
        categoryNameError.style.display = 'block';
        return;
    }

    const newCategory = {
        id: categories.length + 1,  // Tạo ID mới
        categoryName,
        categoryEmoji
    };

    categories.push(newCategory);
    saveCategoriesToLocalStorage(categories);
    renderCategoryTable();
    document.getElementById("addCateName").value = ""; // Xóa dữ liệu
    document.getElementById("addCateEmoji").value = ""; // Xóa dữ liệu emoji 
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
        saveButton.onclick = function() {
            category.categoryName = document.getElementById('categoryName').value;
            category.categoryEmoji = document.getElementById('emoji').value;
            saveCategoriesToLocalStorage(categories);
            renderCategoryTable();  // Render lại bảng sau khi sửa
        };
    }
}

// Xác nhận xóa danh mục
function confirmDelete(categoryId) {
    document.getElementById('confirm-delete-btn').onclick = function() {
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
function paginationPage() {
    let pageHtml = "";
    pageHtml += `<li class="page-item prev" onclick="prevPage()">
                    <a class="page-link" id="prev-page">
                        <i class="fas fa-chevron-left"></i> <!-- Mũi tên trái -->
                    </a>
                 </li>`;
    for (let i = 1; i <= Math.ceil(getCategoriesFromLocalStorage().length / itemsPerPage); i++) {
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
    isActivePage(currentPage);
}

// Điều chỉnh trang khi người dùng nhấn vào một trang
function goToPage(page) {
    currentPage = page;
    renderCategoryTable();
    isActivePage(page); // Giữ màu nền sáng cho trang đã chọn
}

// Di chuyển sang trang tiếp theo
function nextPage() {
    if (currentPage < Math.ceil(getCategoriesFromLocalStorage().length / itemsPerPage)) {
        currentPage++;
        renderCategoryTable();
        isActivePage(currentPage); // Giữ màu nền sáng cho trang đã chọn
    }
}

// Di chuyển về trang trước
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderCategoryTable();
        isActivePage(currentPage); // Giữ màu nền sáng cho trang đã chọn
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

    // Vô hiệu hóa nút Previous/Next nếu cần
    if (page === 1) {
        document.getElementById("prev-page").classList.add("disabled");
    } else {
        document.getElementById("prev-page").classList.remove("disabled");
    }

    if (page === Math.ceil(getCategoriesFromLocalStorage().length / itemsPerPage)) {
        document.getElementById("next-page").classList.add("disabled");
    } else {
        document.getElementById("next-page").classList.remove("disabled");
    }
}

// Gọi hàm render khi trang tải
window.addEventListener('DOMContentLoaded', function() {
    renderCategoryTable();
});
