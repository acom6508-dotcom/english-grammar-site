// Quiz Functionality with localStorage

(function() {
  'use strict';

  const quizContainer = document.getElementById('quiz-content');
  const resultsContainer = document.getElementById('quiz-results');
  const progressBar = document.getElementById('progress-bar');
  const currentQuestionEl = document.getElementById('current-question');
  const totalQuestionsEl = document.getElementById('total-questions');
  const scoreValueEl = document.getElementById('score-value');
  const scoreTotalEl = document.getElementById('score-total');
  const resultsMessageEl = document.getElementById('results-message');
  const retryBtn = document.getElementById('retry-btn');

  if (!quizContainer) return;

  // Get quiz data from JSON
  const quizDataEl = document.getElementById('quiz-data');
  if (!quizDataEl) {
    console.error('Quiz data not found');
    return;
  }

  let quizData;
  try {
    quizData = JSON.parse(quizDataEl.textContent);
  } catch (e) {
    console.error('Failed to parse quiz data:', e);
    quizContainer.innerHTML = '<p class="error">Failed to load quiz. Please refresh the page.</p>';
    return;
  }

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    quizContainer.innerHTML = '<p class="error">No quiz questions available.</p>';
    return;
  }

  // Quiz state
  let currentQuestion = 0;
  let score = 0;
  let userAnswers = [];
  const quizId = window.location.pathname;

  // Initialize quiz
  function init() {
    // Check for saved progress
    const savedProgress = loadProgress();
    if (savedProgress) {
      currentQuestion = savedProgress.currentQuestion || 0;
      score = savedProgress.score || 0;
      userAnswers = savedProgress.userAnswers || [];
    }

    totalQuestionsEl.textContent = quizData.questions.length;
    scoreTotalEl.textContent = quizData.questions.length;
    
    showQuestion();
  }

  // Show current question
  function showQuestion() {
    if (currentQuestion >= quizData.questions.length) {
      showResults();
      return;
    }

    const question = quizData.questions[currentQuestion];
    currentQuestionEl.textContent = currentQuestion + 1;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
    progressBar.style.width = progress + '%';

    // Build question HTML
    let html = '<div class="quiz-question">';
    html += '<h3 class="question-text">' + escapeHtml(question.question) + '</h3>';
    html += '<div class="quiz-options">';

    question.options.forEach(function(option, index) {
      const optionId = 'option-' + currentQuestion + '-' + index;
      const isSelected = userAnswers[currentQuestion] === index;
      
      html += '<div class="quiz-option' + (isSelected ? ' selected' : '') + '">';
      html += '<input type="radio" id="' + optionId + '" name="question-' + currentQuestion + '" value="' + index + '"' + (isSelected ? ' checked' : '') + ' class="option-input">';
      html += '<label for="' + optionId + '" class="option-label">' + escapeHtml(option) + '</label>';
      html += '</div>';
    });

    html += '</div>';
    html += '<div id="feedback" class="quiz-feedback hidden"></div>';
    html += '<div class="quiz-actions">';
    
    if (currentQuestion > 0) {
      html += '<button class="btn btn-secondary" id="prev-btn">← Previous</button>';
    } else {
      html += '<div></div>';
    }
    
    html += '<button class="btn btn-primary" id="next-btn" disabled>Next →</button>';
    html += '</div>';
    html += '</div>';

    quizContainer.innerHTML = html;

    // Add event listeners
    const options = quizContainer.querySelectorAll('.quiz-option');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    options.forEach(function(option) {
      option.addEventListener('click', function() {
        const input = this.querySelector('input');
        input.checked = true;
        handleAnswer(parseInt(input.value));
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', nextQuestion);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', previousQuestion);
    }

    // If answer was previously selected, enable next button
    if (userAnswers[currentQuestion] !== undefined) {
      nextBtn.disabled = false;
      showFeedback(question, userAnswers[currentQuestion]);
    }
  }

  // Handle answer selection
  function handleAnswer(selectedIndex) {
    const question = quizData.questions[currentQuestion];
    const options = quizContainer.querySelectorAll('.quiz-option');
    const nextBtn = document.getElementById('next-btn');

    // Remove previous selections
    options.forEach(function(opt) {
      opt.classList.remove('selected', 'correct', 'incorrect');
    });

    // Mark selected option
    options[selectedIndex].classList.add('selected');

    // Save answer
    userAnswers[currentQuestion] = selectedIndex;
    saveProgress();

    // Show feedback
    showFeedback(question, selectedIndex);

    // Enable next button
    if (nextBtn) {
      nextBtn.disabled = false;
    }
  }

  // Show feedback for answer
  function showFeedback(question, selectedIndex) {
    const feedback = document.getElementById('feedback');
    const options = quizContainer.querySelectorAll('.quiz-option');
    const isCorrect = selectedIndex === question.correctAnswer;

    // Highlight correct and incorrect answers
    options[question.correctAnswer].classList.add('correct');
    if (!isCorrect) {
      options[selectedIndex].classList.add('incorrect');
    }

    // Show feedback message
    if (feedback) {
      feedback.classList.remove('hidden');
      feedback.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'incorrect');
      
      if (isCorrect) {
        feedback.innerHTML = '<strong>✓ Correct!</strong> ' + (question.explanation || 'Well done!');
      } else {
        feedback.innerHTML = '<strong>✗ Incorrect.</strong> ' + (question.explanation || 'The correct answer is: ' + escapeHtml(question.options[question.correctAnswer]));
      }
    }
  }

  // Go to next question
  function nextQuestion() {
    const question = quizData.questions[currentQuestion];
    const selectedAnswer = userAnswers[currentQuestion];

    if (selectedAnswer === undefined) {
      alert('Please select an answer before continuing.');
      return;
    }

    // Calculate score
    if (selectedAnswer === question.correctAnswer) {
      // Only add to score if this is the first time answering correctly
      if (userAnswers[currentQuestion] === selectedAnswer && 
          (!userAnswers[currentQuestion + '_scored'])) {
        score++;
        userAnswers[currentQuestion + '_scored'] = true;
      }
    }

    currentQuestion++;
    saveProgress();
    showQuestion();
  }

  // Go to previous question
  function previousQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion();
    }
  }

  // Show results
  function showResults() {
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');

    // Calculate final score (recount to be sure)
    score = 0;
    quizData.questions.forEach(function(question, index) {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });

    scoreValueEl.textContent = score;
    
    // Determine message based on score
    const percentage = (score / quizData.questions.length) * 100;
    let message = '';
    
    if (percentage >= 90) {
      message = 'Excellent! You have mastered this topic! 🎉';
    } else if (percentage >= 70) {
      message = 'Great job! You have a good understanding of the material. 👏';
    } else if (percentage >= 50) {
      message = 'Good effort! Review the material to improve your understanding. 📚';
    } else {
      message = 'Keep practicing! Review the lessons and try again. 💪';
    }

    resultsMessageEl.textContent = message;

    // Clear saved progress
    clearProgress();

    // Update progress bar to 100%
    progressBar.style.width = '100%';
  }

  // Retry quiz
  if (retryBtn) {
    retryBtn.addEventListener('click', function() {
      currentQuestion = 0;
      score = 0;
      userAnswers = [];
      clearProgress();
      
      quizContainer.classList.remove('hidden');
      resultsContainer.classList.add('hidden');
      
      init();
    });
  }

  // LocalStorage functions
  function saveProgress() {
    try {
      const progress = {
        currentQuestion: currentQuestion,
        score: score,
        userAnswers: userAnswers,
        timestamp: Date.now()
      };
      localStorage.setItem('quiz_progress_' + quizId, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }

  function loadProgress() {
    try {
      const saved = localStorage.getItem('quiz_progress_' + quizId);
      if (saved) {
        const progress = JSON.parse(saved);
        // Check if progress is less than 24 hours old
        if (Date.now() - progress.timestamp < 24 * 60 * 60 * 1000) {
          return progress;
        }
      }
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
    return null;
  }

  function clearProgress() {
    try {
      localStorage.removeItem('quiz_progress_' + quizId);
    } catch (e) {
      console.error('Failed to clear progress:', e);
    }
  }

  // Utility function to escape HTML
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize quiz
  init();

})();
