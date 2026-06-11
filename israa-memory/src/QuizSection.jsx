import React, { useState } from 'react';

// مصفوفة الأسئلة
const quizQuestions = [
  {
    id: 1,
    question: "مين احلى كتوت؟",
    options: ["أنا 🙋‍♀️", "مش أنا 🙅‍♀️"],
    correctAnswer: "أنا 🙋‍♀️"
  },
  {
    id: 2,
    question: "مين اشطر وحده؟",
    options: ["أنا 🙋‍♀️", "مش أنا 🙅‍♀️"],
    correctAnswer: "أنا 🙋‍♀️"
  },
  {
    id: 3,
    question: "مين امزز بت؟",
    options: ["أنا 🙋‍♀️", "مش أنا 🙅‍♀️"],
    correctAnswer: "أنا 🙋‍♀️"
  },
  {
    id: 4,
    question: "مين البت الحتحقق احلامها؟",
    options: ["أنا 🙋‍♀️", "مش أنا 🙅‍♀️"],
    correctAnswer: "أنا 🙋‍♀️"
  },
  {
    id: 5,
    question: "مين البت البحبوها الناس؟",
    options: ["أنا 🙋‍♀️", "مش أنا 🙅‍♀️"],
    correctAnswer: "أنا 🙋‍♀️"
  }
];

// مكوّن واجهة المستخدم
const QuizSection = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswer = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option
    });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-pink-50 min-h-screen pt-12">
      <h2 className="text-2xl font-bold text-pink-500 mb-8 flex items-center gap-2">
        🌸 أسئلة سريعة 🌸
      </h2>

      <div className="w-full max-w-md space-y-4">
        {quizQuestions.map((q) => (
          <div key={q.id} className="bg-white p-5 rounded-3xl shadow-sm text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">{q.question}</h3>
            <div className="flex justify-center gap-4">
              {q.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(q.id, option)}
                  className={`px-6 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                    selectedAnswers[q.id] === option
                      ? option === q.correctAnswer
                        ? 'bg-pink-400 text-white shadow-md transform scale-105'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizSection;