



// ===== KHỞI TẠO DANH MỤC =====
/**
 * Khởi tạo dropdown danh mục với dữ liệu từ localStorage
 */
function initializeCategoryDropdown() {
    const categorySelect = document.getElementById("category");
    // Xóa tất cả các tùy chọn hiện có
    categorySelect.innerHTML = "";

    // Lấy danh sách danh mục từ localStorage
    const categoryList = JSON.parse(localStorage.getItem('Category')) || [];

    // Thêm các phần tử vào dropdown
    categoryList.forEach(category => {
        const optionElement = document.createElement("option");
        optionElement.textContent = category.categoryName;
        optionElement.value = category.id; // Lưu trữ id danh mục trong giá trị
        categorySelect.appendChild(optionElement);
    });
}

// ===== BIẾN TOÀN CỤC =====
// Mảng để lưu trữ câu hỏi tạm thời
let questionCollection = [];
let currentQuestionEditIndex = -1; // Để theo dõi câu hỏi đang được chỉnh sửa

// Lấy id từ URL nếu đang chỉnh sửa bài kiểm tra hiện có
const urlParameters = new URLSearchParams(window.location.search);
const testEditId = urlParameters.get('id');











// ===== CÁC HÀM THÔNG BÁO =====
/**
 * Hiển thị thông báo lỗi sử dụng modal
 */
function displayErrorMessage(message) {
    document.getElementById('errorModalMessage').textContent = message;
    const errorModalInstance = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModalInstance.show();
}

/**
 * Hiển thị thông báo thành công sử dụng modal
 */
function displaySuccessMessage(message) {
    document.getElementById('successModalMessage').textContent = message;
    const successModalInstance = new bootstrap.Modal(document.getElementById('successModal'));
    successModalInstance.show();
}

















// ===== CÁC HÀM KIỂM TRA =====
/**
 * Kiểm tra đầu vào giới hạn thời gian
 */
function setupTimeValidation() {
    document.getElementById("time-limit").addEventListener("change", function() {
        const timeValue = parseInt(this.value);
        if (timeValue < 1) {
            this.value = 1;
            displayErrorMessage("Thời gian tối thiểu là 1 phút");
        } else if (timeValue > 60) {
            this.value = 60;
            displayErrorMessage("Thời gian tối đa là 60 phút");
        }
    });
}

















// ===== CÁC HÀM BIỂU MẪU CÂU HỎI =====
/**
 * Đặt lại tất cả các trường biểu mẫu trong modal câu hỏi
 */
function resetQuestionForm() {
    document.getElementById("question").value = "";
    document.getElementById("textAnswer01").value = "";
    document.getElementById("textAnswer02").value = "";
    document.getElementById("textAnswer03").value = "";
    document.getElementById("textAnswer04").value = "";
    
    // Bỏ chọn tất cả các hộp kiểm
    document.getElementById("checkTrueAnwers01").checked = false;
    document.getElementById("checkTrueAnwers02").checked = false;
    document.getElementById("checkTrueAnwers03").checked = false;
    document.getElementById("checkTrueAnwers04").checked = false;
}

/**
 * Thiết lập các hộp kiểm để đảm bảo chỉ một câu trả lời có thể được chọn là đúng
 */
function setupAnswerCheckboxes() {
    const answerCheckboxes = [
        document.getElementById("checkTrueAnwers01"),
        document.getElementById("checkTrueAnwers02"),
        document.getElementById("checkTrueAnwers03"),
        document.getElementById("checkTrueAnwers04")
    ];

    answerCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                // Bỏ chọn các hộp kiểm khác
                answerCheckboxes.forEach((cb, idx) => {
                    if (idx !== index) {
                        cb.checked = false;
                    }
                });
            }
        });
    });
}

/**
 * Thiết lập trình xử lý sự kiện cho các nút xóa câu trả lời
 */
function setupAnswerClearButtons() {
    document.querySelectorAll('.fa-trash-can').forEach((icon, index) => {
        icon.addEventListener('click', function() {
            // Xóa nội dung đầu vào và bỏ chọn hộp kiểm tương ứng
            document.getElementById(`textAnswer0${index+1}`).value = "";
            document.getElementById(`checkTrueAnwers0${index+1}`).checked = false;
        });
    });
}
























// ===== CÁC HÀM QUẢN LÝ CÂU HỎI =====
/**
 * Khởi tạo hành vi nút "Thêm câu hỏi"
 */
function setupAddQuestionButton() {
    document.getElementById("add-question").addEventListener("click", function() {
        resetQuestionForm();
        currentQuestionEditIndex = -1; // Đặt lại currentQuestionEditIndex khi thêm mới
    });
}

/**
 * Lưu câu hỏi từ biểu mẫu modal
 */
function setupSaveQuestionButton() {
    document.querySelector(".modal-footer .btn-primary").addEventListener("click", function() {
        const questionContent = document.getElementById("question").value;
        
        // Kiểm tra câu hỏi không rỗng
        if (!questionContent.trim()) {
            displayErrorMessage("Vui lòng nhập câu hỏi");
            return;
        }
        
        // Thu thập câu trả lời
        const answerFields = [
            document.getElementById("textAnswer01"),
            document.getElementById("textAnswer02"),
            document.getElementById("textAnswer03"),
            document.getElementById("textAnswer04")
        ];
        
        const answerList = [];
        let hasCorrectAnswerSelected = false;
        
        // Lấy các phần tử hộp kiểm
        const correctAnswerCheckboxes = [
            document.getElementById("checkTrueAnwers01"),
            document.getElementById("checkTrueAnwers02"),
            document.getElementById("checkTrueAnwers03"),
            document.getElementById("checkTrueAnwers04")
        ];
        
        answerFields.forEach((field, index) => {
            if (field.value.trim()) {
                const isCorrectAnswer = correctAnswerCheckboxes[index].checked;
                if (isCorrectAnswer) {
                    hasCorrectAnswerSelected = true;
                }
                
                answerList.push({
                    answer: field.value.trim(),
                    isCorrect: isCorrectAnswer
                });
            }
        });
        
        // Kiểm tra câu trả lời
        if (answerList.length < 2) {
            displayErrorMessage("Phải có ít nhất 2 câu trả lời");
            return;
        }
        
        if (!hasCorrectAnswerSelected) {
            displayErrorMessage("Phải có ít nhất 1 câu trả lời đúng");
            return;
        }
        
        // Tạo đối tượng câu hỏi
        const questionObject = {
            content: questionContent,
            answers: answerList
        };
        
        // Nếu đang chỉnh sửa câu hỏi, cập nhật nó, nếu không thì thêm mới
        if (currentQuestionEditIndex !== -1) {
            questionCollection[currentQuestionEditIndex] = questionObject;
            currentQuestionEditIndex = -1; // Đặt lại sau khi chỉnh sửa
            displaySuccessMessage("Câu hỏi đã được cập nhật thành công!");
        } else {
            questionCollection.push(questionObject);
            displaySuccessMessage("Câu hỏi đã được thêm thành công!");
        }
        
        // Đóng modal và hiển thị lại bảng câu hỏi
        const closeModalButton = document.querySelector(".modal-footer .btn-secondary");
        closeModalButton.click();
        
        displayQuestionsList();
    });
}

/**
 * Hiển thị câu hỏi trong bảng
 */
function displayQuestionsList() {
    const questionsTableBody = document.querySelector(".questions-table tbody");
    questionsTableBody.innerHTML = "";
    
    questionCollection.forEach((question, index) => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${question.content}</td>
            <td class="action-buttons">
                <button class="btn btn-warning" onclick="editQuestionItem(${index})">Edit</button>
                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteQuestionModal" onclick="confirmQuestionDeletion(${index})">Delete</button>
            </td>
        `;
        questionsTableBody.appendChild(tableRow);
    });
}

/**
 * Mở biểu mẫu chỉnh sửa câu hỏi
 */
window.editQuestionItem = function(index) {
    const questionItem = questionCollection[index];
    currentQuestionEditIndex = index; // Lưu chỉ mục của câu hỏi đang được chỉnh sửa
    
    // Điền modal với dữ liệu câu hỏi
    document.getElementById("question").value = questionItem.content;
    
    // Đặt lại tất cả câu trả lời
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`textAnswer0${i}`).value = "";
        document.getElementById(`checkTrueAnwers0${i}`).checked = false;
    }
    
    // Điền vào câu trả lời hiện có
    questionItem.answers.forEach((answer, idx) => {
        if (idx < 4) {
            document.getElementById(`textAnswer0${idx+1}`).value = answer.answer;
            document.getElementById(`checkTrueAnwers0${idx+1}`).checked = answer.isCorrect;
        }
    });
    
    // Mở modal
    const questionModal = new bootstrap.Modal(document.getElementById('addQuestionModal'));
    questionModal.show();
};

/**
 * Thiết lập xác nhận xóa câu hỏi
 */
window.confirmQuestionDeletion = function(index) {
    document.getElementById('confirm-delete-question-btn').onclick = function() {
        removeQuestion(index);
    };
};

/**
 * Xóa câu hỏi khỏi bộ sưu tập
 */
window.removeQuestion = function(index) {
    questionCollection.splice(index, 1);
    displayQuestionsList();
    displaySuccessMessage("Câu hỏi đã được xóa thành công!");
};



























// ===== CÁC HÀM QUẢN LÝ BÀI KIỂM TRA =====
/**
 * Xử lý sự kiện nhấp vào nút lưu bài kiểm tra
 */
function setupSaveTestButton() {
    document.querySelector(".bookmarkBtn").addEventListener("click", function() {
        const testTitle = document.getElementById("test-name").value;
        const testDuration = parseInt(document.getElementById("time-limit").value);
        const selectedCategoryId = parseInt(document.getElementById("category").value);
        
        // Kiểm tra đầu vào
        if (!testTitle.trim()) {
            displayErrorMessage("Vui lòng nhập tên bài kiểm tra");
            return;
        }
        
        if (isNaN(testDuration) || testDuration < 1 || testDuration > 60) {
            displayErrorMessage("Thời gian phải từ 1 đến 60 phút");
            return;
        }
        
        if (!selectedCategoryId) {
            displayErrorMessage("Vui lòng chọn một danh mục");
            return;
        }
        
        if (questionCollection.length === 0) {
            displayErrorMessage("Vui lòng thêm ít nhất 1 câu hỏi");
            return;
        }
        
        // Tạo bài kiểm tra mới hoặc cập nhật hiện có
        const testData = {
            testName: testTitle,
            playTime: testDuration,
            categoryId: selectedCategoryId,
            questions: questionCollection,
            playAmount: 0, // Mặc định cho bài kiểm tra mới
            image: "https://www.w3schools.com/html/html5.gif"
        };
        
        // Lấy các bài kiểm tra hiện có từ localStorage
        let testDatabase = JSON.parse(localStorage.getItem("tests")) || [];
        
        if (testEditId) {
            // Cập nhật bài kiểm tra hiện có
            const existingTestIndex = testDatabase.findIndex(test => test.id == testEditId);
            if (existingTestIndex !== -1) {
                testData.id = parseInt(testEditId);
                testData.playAmount = testDatabase[existingTestIndex].playAmount; // Giữ số lần chơi ban đầu
                testDatabase[existingTestIndex] = testData;
                displaySuccessMessage("Bài kiểm tra đã được cập nhật thành công!");
                
                // Đặt thời gian chờ để chuyển hướng sau khi hiển thị modal thành công
                setTimeout(() => {
                    window.location.href = "./test_page.html";
                }, 1500);
            }
        } else {
            // Thêm bài kiểm tra mới
            testData.id = testDatabase.length > 0 ? Math.max(...testDatabase.map(test => test.id)) + 1 : 1;
            testDatabase.push(testData);
            displaySuccessMessage("Bài kiểm tra mới đã được thêm thành công!");
            
            // Đặt thời gian chờ để chuyển hướng sau khi hiển thị modal thành công
            setTimeout(() => {
                window.location.href = "./test_page.html";
            }, 1500);
        }
        
        // Lưu vào localStorage
        localStorage.setItem("tests", JSON.stringify(testDatabase));
    });
}

/**
 * Tải dữ liệu bài kiểm tra nếu đang chỉnh sửa bài kiểm tra hiện có
 */
function loadExistingTestData() {
    if (testEditId) {
        const testDatabase = JSON.parse(localStorage.getItem("tests")) || [];
        const existingTest = testDatabase.find(test => test.id == testEditId);
        
        if (existingTest) {
            // Điền thông tin bài kiểm tra
            document.getElementById("test-name").value = existingTest.testName;
            document.getElementById("time-limit").value = existingTest.playTime;
            
            // Chọn danh mục
            document.getElementById("category").value = existingTest.categoryId;
            
            // Tải câu hỏi
            questionCollection = [...existingTest.questions]; // Sử dụng toán tử spread để tạo bản sao mảng
            displayQuestionsList();
            
            // Cập nhật tiêu đề trang nếu ở chế độ chỉnh sửa
            document.querySelector("h3.title").textContent = "Edit Test";
        } else {
            displayErrorMessage("Không tìm thấy bài kiểm tra!");
            setTimeout(() => {
                window.location.href = "./test_page.html";
            }, 1500);
        }
    }
}



























// ===== KHỞI TẠO =====
/**
 * Khởi tạo modal Bootstrap
 */
function initializeModals() {
    // Khởi tạo tất cả modal Bootstrap
    const errorModalElement = document.getElementById('errorModal');
    if (errorModalElement) {
        new bootstrap.Modal(errorModalElement);
    }
    
    const successModalElement = document.getElementById('successModal');
    if (successModalElement) {
        new bootstrap.Modal(successModalElement);
    }
    
    const deleteModalElement = document.getElementById('deleteQuestionModal');
    if (deleteModalElement) {
        new bootstrap.Modal(deleteModalElement);
    }
    
    const addQuestionModalElement = document.getElementById('addQuestionModal');
    if (addQuestionModalElement) {
        new bootstrap.Modal(addQuestionModalElement);
    }
}

// Khởi tạo chính
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo các thành phần UI
    initializeModals();
    initializeCategoryDropdown();
    setupTimeValidation();
    setupAnswerCheckboxes();
    setupAnswerClearButtons();
    
    // Thiết lập trình xử lý sự kiện
    setupAddQuestionButton();
    setupSaveQuestionButton();
    setupSaveTestButton();
    
    // Tải dữ liệu nếu đang chỉnh sửa
    loadExistingTestData();
    
    // Hiển thị danh sách câu hỏi
    displayQuestionsList();
});