// =============================================================================
// VARIABLES AND INITIALIZATION
// =============================================================================
let currentQuestionIndex = 0;
let selectedAnswers = [];
let timer;
let remainingSeconds;
let quiz = null;
let questions = [];

// =============================================================================
// GETTING DATA FROM LOCAL STORAGE
// =============================================================================

// Get tests from localStorage
function getTestsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tests')) || [];
}

// Get category name and emoji by id
function getCategoryById(categoryId) {
    const categories = JSON.parse(localStorage.getItem('Category')) || [];
    return categories.find(cat => cat.id === categoryId);
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('isLogin') === 'true';
}

// =============================================================================
// QUIZ SELECTION AND INITIALIZATION
// =============================================================================

// Load quiz from localStorage - FIXED to use localStorage instead of URL parameters
function loadQuiz() {
    // Check login status
    if (!isLoggedIn()) {
        window.location.href = './home_page.html';
        alert('Bạn cần đăng nhập để chơi quiz!');
        return;
    }

    // Get quiz ID from localStorage instead of URL parameters
    const quizId = localStorage.getItem('currentQuizId');
    const tests = getTestsFromLocalStorage();
    
    if (quizId) {
        // Load specific quiz using ID from localStorage
        quiz = tests.find(test => test.id === parseInt(quizId));
        // Clear the ID from localStorage after loading
        localStorage.removeItem('currentQuizId');
    } else {
        // Load random quiz
        quiz = tests[Math.floor(Math.random() * tests.length)];
    }

    if (!quiz) {
        console.error('Quiz not found');
        return;
    }

    setupQuiz();
}

// Setup quiz content and timer
function setupQuiz() {
    // Setup quiz header
    document.querySelector('.qf-quiz-title').textContent = quiz.testName;
    
    // Get all sample questions from data_fake.js - assume sample_data is available
    const allSampleQuestions = JSON.parse(localStorage.getItem('sample_data')) || window.sample_data || [];
    
    // Create enough questions for the quiz (at least 20)
    questions = [];
    while (questions.length < 20) {
        if (quiz.questions && quiz.questions.length > 0) {
            // Add quiz's own questions
            questions = questions.concat(quiz.questions);
        }
        
        // Add random questions from sample data if needed
        if (questions.length < 20) {
            const randomQuestion = allSampleQuestions[Math.floor(Math.random() * allSampleQuestions.length)];
            const answers = randomQuestion.answers.map((answer, idx) => {
                return {
                    answer,
                    isCorrect: idx === randomQuestion.correct - 1
                };
            });
            
            questions.push({
                content: randomQuestion.content,
                answers: answers
            });
        }
    }
    
    // Limit to 20 questions
    questions = questions.slice(0, 20);
    
    // Initialize selected answers array
    selectedAnswers = new Array(questions.length).fill(null);
    
    // Initialize pagination buttons
    initializePagination();
    
    // Setup timer
    setupTimer();
    
    // Load first question
    loadQuestion(currentQuestionIndex);
}

// Setup quiz timer
function setupTimer() {
    const playTime = quiz.playTime || 10; // Default 10 minutes if not specified
    const totalSeconds = playTime * 60;
    remainingSeconds = totalSeconds;
    
    document.getElementById('total-time').textContent = formatTime(totalSeconds);
    document.getElementById('remaining-time').textContent = formatTime(remainingSeconds);
    
    // Start the timer
    timer = setInterval(() => {
        remainingSeconds--;
        document.getElementById('remaining-time').textContent = formatTime(remainingSeconds);
        
        if (remainingSeconds <= 0) {
            clearInterval(timer);
            finishQuiz();
        }
    }, 1000);
}

// Format time in MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Initialize pagination buttons
function initializePagination() {
    const pagination = document.querySelector('.qf-pagination');
    pagination.innerHTML = '';
    
    for (let i = 0; i < questions.length; i++) {
        const pageButton = document.createElement('div');
        pageButton.classList.add('qf-page-button');
        pageButton.textContent = i + 1;
        
        if (i === currentQuestionIndex) {
            pageButton.classList.add('active');
        }
        
        pageButton.addEventListener('click', () => {
            navigateToQuestion(i);
        });
        
        pagination.appendChild(pageButton);
    }
}

// Update pagination status
function updatePagination() {
    const pageButtons = document.querySelectorAll('.qf-page-button');
    
    pageButtons.forEach((button, index) => {
        button.classList.remove('active', 'completed');
        
        if (index === currentQuestionIndex) {
            button.classList.add('active');
        } else if (selectedAnswers[index] !== null) {
            button.classList.add('completed');
        }
    });
}

// =============================================================================
// QUESTION NAVIGATION AND DISPLAY
// =============================================================================

// Load question by index
function loadQuestion(index) {
    if (index < 0 || index >= questions.length) {
        return;
    }
    
    currentQuestionIndex = index;
    const question = questions[index];
    
    // Update question header
    document.querySelector('.qf-question-header .qf-question-text').textContent = question.content;
    document.querySelector('.qf-question-header div:first-child').textContent = `Câu hỏi ${index + 1} trên ${questions.length}:`;
    
    // Update options
    const optionsContainer = document.querySelector('.qf-options-container');
    optionsContainer.innerHTML = '';
    
    question.answers.forEach((answer, answerIndex) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('qf-option');
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `opt${answerIndex + 1}`;
        input.name = 'question';
        input.value = answerIndex;
        
        // Check if this answer was previously selected
        if (selectedAnswers[index] === answerIndex) {
            input.checked = true;
        }
        
        input.addEventListener('change', () => {
            if (input.checked) {
                selectedAnswers[index] = answerIndex;
                updatePagination();
            }
        });
        
        const label = document.createElement('label');
        label.setAttribute('for', `opt${answerIndex + 1}`);
        label.textContent = answer.answer;
        
        optionDiv.appendChild(input);
        optionDiv.appendChild(label);
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    updateNavButtons();
    
    // Update pagination
    updatePagination();
}

// Navigate to a specific question
function navigateToQuestion(index) {
    loadQuestion(index);
}

// Update navigation buttons status
function updateNavButtons() {
    const backButton = document.querySelector('.qf-btn-back');
    const nextButton = document.querySelector('.qf-btn-next');
    
    // Handle back button
    if (currentQuestionIndex === 0) {
        backButton.disabled = true;
        backButton.classList.add('disabled');
    } else {
        backButton.disabled = false;
        backButton.classList.remove('disabled');
    }
    
    // Handle next button
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.disabled = true;
        nextButton.classList.add('disabled');
    } else {
        nextButton.disabled = false;
        nextButton.classList.remove('disabled');
    }
}

// =============================================================================
// QUIZ COMPLETION AND SCORING
// =============================================================================

// Finish the quiz and calculate score
function finishQuiz() {
    clearInterval(timer);
    
    // Calculate score
    let correctAnswers = 0;
    
    for (let i = 0; i < questions.length; i++) {
        const selectedAnswerIndex = selectedAnswers[i];
        
        if (selectedAnswerIndex !== null && questions[i].answers[selectedAnswerIndex].isCorrect) {
            correctAnswers++;
        }
    }
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    // Update modal with results
    document.querySelector('.score').textContent = `Điểm của bạn: ${score}%`;
    document.querySelector('.detail-item:nth-child(1) span:last-child').textContent = questions.length;
    document.querySelector('.detail-item:nth-child(2) span:last-child').textContent = correctAnswers;
    document.querySelector('.detail-item:nth-child(3) span:last-child').textContent = questions.length - correctAnswers;
    
    // Show modal
    const doneModal = new bootstrap.Modal(document.getElementById('done'));
    doneModal.show();
}

// =============================================================================
// EVENT LISTENERS
// =============================================================================

// Set up event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load quiz
    loadQuiz();
    
    // Next button click
    document.querySelector('.qf-btn-next').addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            loadQuestion(currentQuestionIndex + 1);
        }
    });
    
    // Back button click
    document.querySelector('.qf-btn-back').addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            loadQuestion(currentQuestionIndex - 1);
        }
    });
    
    // Submit button click
    document.querySelector('.qf-btn-submit').addEventListener('click', () => {
        finishQuiz();
    });
    
    // Logout functionality
    window.logout = function() {
        localStorage.setItem('isLogin', 'false');
        window.location.href = '../../index.html';
    };
});