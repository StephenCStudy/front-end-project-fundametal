// =============================================================================
// 1. KHỞI TẠO DANH MỤC 
// =============================================================================


//  * Khởi tạo selcet danh mục với dữ liệu từ local
 
function createCategorySelect() {
    const categorySelect = document.getElementById("category");  // lấy select có id là category từ trang add_test_page 
    
    categorySelect.innerHTML = "";   // Xóa tất cả các tùy chọn hiện có
    
    const categoryList = JSON.parse(localStorage.getItem('Category')) || [];    // Lấy danh sách danh mục từ localStorage



    // Thêm các phần tử vào select
    categoryList.forEach(category => {     // chạy qua từng danh mục trong danh sách từ locallocal
        const optionElement = document.createElement("option");  // tạo mới một option 
        optionElement.textContent = category.categoryName;  // gán tên danh mục vào thẻ option mới vừa tạo.
        optionElement.value = category.id; // gán id danh mục làm giá trị cho option ( value của option)
        categorySelect.appendChild(optionElement); // thêm option vào select
    });
}



// =============================================================================
// 2. CÁC BIẾN TOÀN CỤC
// =============================================================================

// Mảng để lưu trữ câu hỏi tạm thời
let questionCollection = [];

let currentQuestionEditIndex = -1; // Để theo dõi câu hỏi đang được chỉnh sửa

// Lưu ID bài kiểm tra hiện tại nếu đang chỉnh sửa
let currentTestId = null;

// Kiểm tra xem có bài kiểm tra nào được lưu trong localStorage để chỉnh sửa không
function checkForTestToEdit() {
    const testToEdit = localStorage.getItem('currentTestToEdit');
    if (testToEdit) { // Nếu có, chuyển đổi nó thành số nguyên
        currentTestId = parseInt(testToEdit);
        // Xóa khỏi localStorage sau khi đã lấy
        localStorage.removeItem('currentTestToEdit');
        return true;
    }

    return false;
}



// =============================================================================
// 3. CÁC HÀM THÔNG BÁO
// =============================================================================

/**
 * Hiển thị thông báo lỗi sử dụng modal
 */
function displayErrorMessage(message) {
    document.getElementById('errorModalMessage').textContent = message; // Cập nhật nội dung thông báo lỗi cho modal id là errorModalMessage
    const errorModalInstance = new bootstrap.Modal(document.getElementById('errorModal')); // Tạo một modal mới với id là errorModal
    errorModalInstance.show();
}


/**
 * Hiển thị thông báo thành công sử dụng modal
 */
function displaySuccessMessage(message) {
    document.getElementById('successModalMessage').textContent = message; // Cập nhật nội dung thông báo thành công cho modal id là successModalMessage
    const successModalInstance = new bootstrap.Modal(document.getElementById('successModal')); // Tạo một modal mới với id là successModal
    successModalInstance.show();
}




// =============================================================================
// 4. CÁC HÀM KIỂM TRA 
// =============================================================================

/**
 * Kiểm tra đầu vào giới hạn thời gian
 */
function setupTimeValidation() {
    document.getElementById("time-limit").addEventListener("change", function() {
        const timeValue = parseInt(this.value); // Lấy giá trị thời gian từ input và chuyển đổi thành số nguyên
        if (timeValue < 1) {
            this.value = 1;
            displayErrorMessage("Thời gian tối thiểu là 1 phút");
        } else if (timeValue > 60) {
            this.value = 60;
            displayErrorMessage("Thời gian tối đa là 60 phút");
        }
        
    });
}




// =============================================================================
// 5. CÁC HÀM BIỂU MẪU CÂU HỎI 
// =============================================================================

/**
 * Đặt lại tất cả các giá trị biểu mẫu trong modal câu hỏi là rỗng.
 */
function resetQuestionForm() {
    document.getElementById("question").value = "";
    document.getElementById("textAnswer01").value = "";
    document.getElementById("textAnswer02").value = "";
    document.getElementById("textAnswer03").value = "";
    document.getElementById("textAnswer04").value = "";
    

    // Bỏ chọn tất cả các checkbox
    document.getElementById("checkTrueAnwers01").checked = false;
    document.getElementById("checkTrueAnwers02").checked = false;
    document.getElementById("checkTrueAnwers03").checked = false;
    document.getElementById("checkTrueAnwers04").checked = false;
}

/**
 * Thiết lập các checkbox để đảm bảo chỉ một câu trả lời có thể được chọn là đúng
 */
function setupAnswerCheckboxes() {
    const answerCheckboxes = [
        document.getElementById("checkTrueAnwers01"),
        document.getElementById("checkTrueAnwers02"),
        document.getElementById("checkTrueAnwers03"),
        document.getElementById("checkTrueAnwers04")
    ];


    answerCheckboxes.forEach((checkbox, index) => { // Duyệt qua từng checkbox
        // Thêm sự kiện thay đổi cho mỗi checkbox
        checkbox.addEventListener("change", function() {
            if (this.checked) { // Nếu checkbox này được chọn
                // Bỏ chọn tất cả các checkbox khác
                answerCheckboxes.forEach((cb, idx) => { // Duyệt qua tất cả các checkbox khác    (cb là checkbox hiện tại)
                    // Nếu checkbox này không phải là checkbox hiện tại thì bỏ chọn nó
                    if (idx !== index) {
                        cb.checked = false;
                    }
                });

            }
        });
    });

}

/**
 *khi nhấn vào biểu tượng thùng rác, xóa nội dung đầu vào và bỏ chọn checkbox. 
 */
function DeleAnswer() {
    document.querySelectorAll('.fa-trash-can').forEach((icon, index) => { // Duyệt qua tất cả các biểu tượng thùng rác
        icon.addEventListener('click', function() {

            // Xóa nội dung đầu vào và bỏ chọn checkbox.
            document.getElementById(`textAnswer0${index+1}`).value = ""; //index + 1 là để lấy id của các ô nhập câu trả lời từ 1 đến 4 (index bắt đầu từ 0)
            document.getElementById(`checkTrueAnwers0${index+1}`).checked = false;
        });

    });
}



// =============================================================================
// 6. CÁC HÀM QUẢN LÝ CÂU HỎI 
// =============================================================================

/**
 * khi nhấn vào nút thêm câu hỏi, mở modal và đặt lại các trường đầu vào.
 * Đặt lại currentQuestionEditIndex về -1 để chỉ ra rằng không có câu hỏi nào đang được chỉnh sửa.
 */
function AddQuestion() {
    document.getElementById("add-question").addEventListener("click", function() {
        resetQuestionForm();

        currentQuestionEditIndex = -1; // Đặt lại currentQuestionEditIndex khi thêm mới
    });

}

/**
 *khi nhấn vào nút lưu câu hỏi, thu thập dữ liệu từ các trường đầu vào và kiểm tra tính hợp lệ của chúng
 */
function SaveQuestion() {
    document.querySelector(".modal-footer .btn-primary").addEventListener("click", function() {
        const questionContent = document.getElementById("question").value;
        

        // Kiểm tra câu hỏi rỗng
        if (!questionContent.trim()) {
            displayErrorMessage("Vui lòng nhập câu hỏi");
            return;

        }
        
        // cho các id câu trả lời vào mảng answerFields
        const answerFields = [
            document.getElementById("textAnswer01"),
            document.getElementById("textAnswer02"),
            document.getElementById("textAnswer03"),
            document.getElementById("textAnswer04")

        ];
        
        const answerList = []; // Mảng chứa các câu trả lời và xác nhận

        let hasCorrectAnswerSelected = false; // Biến để kiểm tra xem có câu trả lời đúng nào được chọn hay không
        

        // Lấy các phần tử checkbox
        const correctAnswerCheckboxes = [
            document.getElementById("checkTrueAnwers01"),
            document.getElementById("checkTrueAnwers02"),
            document.getElementById("checkTrueAnwers03"),
            document.getElementById("checkTrueAnwers04")

        ];
        
        answerFields.forEach((field, index) => { // Duyệt qua từng câu trả lời trong mảng answerFields
            // Nếu mảng không rỗng, thêm vào answerList


            if (field.value.trim()) { // Kiểm tra xem câu trả lời có giá trị hay không
                const isCorrectAnswer = correctAnswerCheckboxes[index].checked; // Kiểm tra xem checkbox có được chọn hay không
                if (isCorrectAnswer) { // Nếu câu trả lời là đúng
                    hasCorrectAnswerSelected = true;
                }
                
                answerList.push({ // Thêm câu trả lời vào answerList
                    id: index + 1, // ID câu trả lời (1-4)
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
            content: questionContent, // biến câu hỏi lấy từ id question
            answers: answerList  // Mảng chứa các câu trả lời và xác nhận

        };
        

        // Nếu đang chỉnh sửa câu hỏi, cập nhật nó, nếu không thì thêm mới
        if (currentQuestionEditIndex !== -1) { // biến ban đầu là -1, nếu không thì là đang chỉnh sửa câu hỏi
            questionCollection[currentQuestionEditIndex] = questionObject; // Cập nhật câu hỏi trong mảng vào vị trí hiện tại
            currentQuestionEditIndex = -1; // Đặt lại sau khi chỉnh sửa
            displaySuccessMessage("Câu hỏi đã được cập nhật thành công!");

        } else {
            questionCollection.push(questionObject);  // Thêm câu hỏi mới vào mảng
            displaySuccessMessage("Câu hỏi đã được thêm thành công!");

        }
        
        // Đóng modal và hiển thị lại bảng câu hỏi
        const closeModalButton = document.querySelector(".modal-footer .btn-secondary");
        closeModalButton.click();
        
        renderQuestionList();
    });
}

/**
 * redner danh sách câu hỏi trong bảng
 */
function renderQuestionList() {
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
    // currentQuestionEditIndex ban đầu là -1, (biến toàn cục) 
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
            document.getElementById(`textAnswer0${idx+1}`).value = answer.answer;  // Điền vào ô nhập câu trả lời
            // Nếu câu trả lời là đúng, đánh dấu checkbox
            document.getElementById(`checkTrueAnwers0${idx+1}`).checked = answer.isCorrect;
        }
    });
    
    // Mở modal chỉnh sửa câu hỏi
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
 * Xóa câu hỏi khỏi khỏi danh sách
 */
window.removeQuestion = function(index) {
    questionCollection.splice(index, 1);
    renderQuestionList();
    displaySuccessMessage("Câu hỏi đã được xóa thành công!");
};



// =============================================================================
// 7. CÁC HÀM QUẢN LÝ BÀI KIỂM TRA 
// =============================================================================

/**
 * khi nhấn vào nút lưu bài kiểm tra, thu thập dữ liệu từ các trường đầu vào và kiểm tra tính hợp lệ của chúng
 */
function SaveTest() {
    document.querySelector(".bookmarkBtn").addEventListener("click", function() {
        // Lấy giá trị từ ô nhập tên bài kiểm tra
        const testTitle = document.getElementById("test-name").value; 
        // Lấy giá trị thời gian từ ô nhập thời gian
        const testDuration = parseInt(document.getElementById("time-limit").value);
        // Lấy giá trị danh mục từ ô chọn danh mục
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
            image: "https://as1.ftcdn.net/v2/jpg/03/91/06/82/1000_F_391068222_eOeQFmaRo8q1INpa6LWO1vdCORl0Z6p3.jpg"
        };
        
        // Lấy các bài kiểm tra hiện có từ localStorage
        let testDatabase = JSON.parse(localStorage.getItem("tests")) || [];
        
        if (currentTestId) {
            // Cập nhật bài kiểm tra hiện có
            const existingTestIndex = testDatabase.findIndex(test => test.id === currentTestId);  // Tìm chỉ mục của bài kiểm tra hiện có trong mảng
            if (existingTestIndex !== -1) {  // Nếu tìm thấy bài kiểm tra
                // Cập nhật thông tin bài kiểm tra
                testData.id = currentTestId;
                testData.playAmount = testDatabase[existingTestIndex].playAmount; // Giữ số lần chơi ban đầu
                testDatabase[existingTestIndex] = testData;
                displaySuccessMessage("Bài kiểm tra đã được cập nhật thành công!");
                
                // Đặt thời gian chờ để chuyển hướng sau khi hiển thị modal thành công
                setTimeout(() => {
                    window.location.href = "./test_page.html";
                }, 3000); // Chuyển hướng sau 3 giây
            }
        } else {
            // Thêm bài kiểm tra mới
            testData.id = testDatabase.length > 0 ? Math.max(...testDatabase.map(test => test.id)) + 1 : 1;  // Tạo ID mới cho bài kiểm tra (nếu không có bài kiểm tra nào thì ID là 1)
            testDatabase.push(testData);
            displaySuccessMessage("Bài kiểm tra mới đã được thêm thành công!");
            
            // Đặt thời gian chờ để chuyển hướng sau khi hiển thị modal thành công
            setTimeout(() => {
                window.location.href = "./test_page.html";
            }, 3000); // Chuyển hướng sau 3 giây
        }
        
        // Lưu vào localStorage
        localStorage.setItem("tests", JSON.stringify(testDatabase));
    });
}

/**
 * Tải dữ liệu bài kiểm tra nếu đang chỉnh sửa bài kiểm tra hiện có
 */
function loadExistingTestData() {
    if (checkForTestToEdit()) { // Kiểm tra xem có bài kiểm tra nào để chỉnh sửa không
        // Nếu có, lấy ID bài kiểm tra từ biến toàn cục currentTestId


        const testDatabase = JSON.parse(localStorage.getItem("tests")) || [];
        const existingTest = testDatabase.find(test => test.id === currentTestId);
        
        if (existingTest) { // Nếu tìm thấy bài kiểm tra
            // Điền thông tin bài kiểm tra
            document.getElementById("test-name").value = existingTest.testName;
            document.getElementById("time-limit").value = existingTest.playTime;
            
            // Chọn danh mục
            document.getElementById("category").value = existingTest.categoryId;
            
            // Tải câu hỏi
            questionCollection = [...existingTest.questions]; // Sử dụng toán tử spread để tạo bản sao mảng
            renderQuestionList();
            
            // Cập nhật tiêu đề trang nếu ở chế độ chỉnh sửa
            document.querySelector("h3.title").textContent = "Edit Test";
        } else {
            displayErrorMessage("Không tìm thấy bài kiểm tra!");
            setTimeout(() => {
                window.location.href = "./test_page.html";
            }, 3000); // Chuyển hướng sau 3 giây
        }
    }
}


// =============================================================================
// 8. KHỞI TẠO CÁC THÀNH PHẦN UI
// =============================================================================


// Khởi tạo chính
// mục đích là để đảm bảo rằng các thành phần UI được khởi tạo và sự kiện được thiết lập sau khi tài liệu đã được tải hoàn toàn.
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo các thành phần UI
    createCategorySelect();
    setupTimeValidation();
    setupAnswerCheckboxes();
    DeleAnswer();
    
    // Thiết lập trình xử lý sự kiện
    AddQuestion();
    SaveQuestion();
    SaveTest();
    
    // Tải dữ liệu nếu đang chỉnh sửa
    loadExistingTestData();
    
    // Hiển thị danh sách câu hỏi
    renderQuestionList();
});

