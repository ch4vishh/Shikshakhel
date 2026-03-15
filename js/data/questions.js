// ============================================
// QUESTIONS.JS – 55 Math questions for Class 1-3
// ============================================

export const questions = [
    // ---- ADDITION (up to 20) ----
    { id: 1, type: 'addition', text: '2 + 3 = ?', hindi: '2 + 3 = ?', options: [4, 5, 6, 3], answer: 5, difficulty: 1 },
    { id: 2, type: 'addition', text: '4 + 1 = ?', hindi: '4 + 1 = ?', options: [5, 6, 3, 4], answer: 5, difficulty: 1 },
    { id: 3, type: 'addition', text: '5 + 5 = ?', hindi: '5 + 5 = ?', options: [8, 10, 11, 9], answer: 10, difficulty: 1 },
    { id: 4, type: 'addition', text: '3 + 4 = ?', hindi: '3 + 4 = ?', options: [6, 8, 7, 5], answer: 7, difficulty: 1 },
    { id: 5, type: 'addition', text: '6 + 2 = ?', hindi: '6 + 2 = ?', options: [7, 9, 8, 6], answer: 8, difficulty: 1 },
    { id: 6, type: 'addition', text: '7 + 3 = ?', hindi: '7 + 3 = ?', options: [9, 11, 10, 8], answer: 10, difficulty: 1 },
    { id: 7, type: 'addition', text: '8 + 4 = ?', hindi: '8 + 4 = ?', options: [11, 13, 12, 10], answer: 12, difficulty: 2 },
    { id: 8, type: 'addition', text: '9 + 5 = ?', hindi: '9 + 5 = ?', options: [13, 15, 14, 12], answer: 14, difficulty: 2 },
    { id: 9, type: 'addition', text: '6 + 7 = ?', hindi: '6 + 7 = ?', options: [12, 14, 13, 11], answer: 13, difficulty: 2 },
    { id: 10, type: 'addition', text: '8 + 9 = ?', hindi: '8 + 9 = ?', options: [16, 18, 17, 15], answer: 17, difficulty: 2 },
    { id: 11, type: 'addition', text: '7 + 6 = ?', hindi: '7 + 6 = ?', options: [14, 12, 13, 11], answer: 13, difficulty: 2 },
    { id: 12, type: 'addition', text: '9 + 9 = ?', hindi: '9 + 9 = ?', options: [17, 19, 18, 16], answer: 18, difficulty: 2 },
    { id: 13, type: 'addition', text: '11 + 5 = ?', hindi: '11 + 5 = ?', options: [15, 17, 16, 14], answer: 16, difficulty: 3 },
    { id: 14, type: 'addition', text: '12 + 8 = ?', hindi: '12 + 8 = ?', options: [18, 21, 20, 19], answer: 20, difficulty: 3 },

    // ---- SUBTRACTION (up to 20) ----
    { id: 15, type: 'subtraction', text: '5 - 2 = ?', hindi: '5 - 2 = ?', options: [2, 4, 3, 1], answer: 3, difficulty: 1 },
    { id: 16, type: 'subtraction', text: '7 - 3 = ?', hindi: '7 - 3 = ?', options: [3, 5, 4, 2], answer: 4, difficulty: 1 },
    { id: 17, type: 'subtraction', text: '9 - 4 = ?', hindi: '9 - 4 = ?', options: [6, 4, 5, 3], answer: 5, difficulty: 1 },
    { id: 18, type: 'subtraction', text: '8 - 5 = ?', hindi: '8 - 5 = ?', options: [4, 2, 3, 1], answer: 3, difficulty: 1 },
    { id: 19, type: 'subtraction', text: '10 - 6 = ?', hindi: '10 - 6 = ?', options: [5, 3, 4, 2], answer: 4, difficulty: 1 },
    { id: 20, type: 'subtraction', text: '10 - 3 = ?', hindi: '10 - 3 = ?', options: [6, 8, 7, 5], answer: 7, difficulty: 1 },
    { id: 21, type: 'subtraction', text: '12 - 5 = ?', hindi: '12 - 5 = ?', options: [6, 8, 7, 5], answer: 7, difficulty: 2 },
    { id: 22, type: 'subtraction', text: '15 - 8 = ?', hindi: '15 - 8 = ?', options: [6, 8, 7, 9], answer: 7, difficulty: 2 },
    { id: 23, type: 'subtraction', text: '14 - 6 = ?', hindi: '14 - 6 = ?', options: [7, 9, 8, 6], answer: 8, difficulty: 2 },
    { id: 24, type: 'subtraction', text: '18 - 9 = ?', hindi: '18 - 9 = ?', options: [8, 10, 9, 7], answer: 9, difficulty: 2 },
    { id: 25, type: 'subtraction', text: '16 - 7 = ?', hindi: '16 - 7 = ?', options: [8, 10, 9, 7], answer: 9, difficulty: 2 },
    { id: 26, type: 'subtraction', text: '20 - 11 = ?', hindi: '20 - 11 = ?', options: [8, 10, 9, 7], answer: 9, difficulty: 3 },

    // ---- NUMBER BONDS ----
    { id: 27, type: 'number_bonds', text: '2 + ? = 5', hindi: '2 + ? = 5', options: [2, 4, 3, 1], answer: 3, difficulty: 1 },
    { id: 28, type: 'number_bonds', text: '? + 4 = 7', hindi: '? + 4 = 7', options: [2, 4, 3, 5], answer: 3, difficulty: 1 },
    { id: 29, type: 'number_bonds', text: '6 + ? = 10', hindi: '6 + ? = 10', options: [3, 5, 4, 2], answer: 4, difficulty: 1 },
    { id: 30, type: 'number_bonds', text: '? + 3 = 8', hindi: '? + 3 = 8', options: [4, 6, 5, 3], answer: 5, difficulty: 1 },
    { id: 31, type: 'number_bonds', text: '7 + ? = 12', hindi: '7 + ? = 12', options: [4, 6, 5, 3], answer: 5, difficulty: 2 },
    { id: 32, type: 'number_bonds', text: '? + 6 = 13', hindi: '? + 6 = 13', options: [6, 8, 7, 5], answer: 7, difficulty: 2 },
    { id: 33, type: 'number_bonds', text: '8 + ? = 15', hindi: '8 + ? = 15', options: [6, 8, 7, 5], answer: 7, difficulty: 2 },
    { id: 34, type: 'number_bonds', text: '? + 9 = 17', hindi: '? + 9 = 17', options: [7, 9, 8, 6], answer: 8, difficulty: 2 },
    { id: 35, type: 'number_bonds', text: '5 + ? = 14', hindi: '5 + ? = 14', options: [8, 10, 9, 7], answer: 9, difficulty: 3 },
    { id: 36, type: 'number_bonds', text: '? + 7 = 18', hindi: '? + 7 = 18', options: [10, 12, 11, 9], answer: 11, difficulty: 3 },

    // ---- PLACE VALUE ----
    { id: 37, type: 'place_value', text: 'दहाई अंक बताओ: 34', hindi: '34 में दहाई अंक कौन सा है?', options: [4, 34, 3, 7], answer: 3, difficulty: 1 },
    { id: 38, type: 'place_value', text: 'इकाई अंक बताओ: 56', hindi: '56 में इकाई अंक कौन सा है?', options: [5, 56, 6, 11], answer: 6, difficulty: 1 },
    { id: 39, type: 'place_value', text: 'दहाई अंक बताओ: 72', hindi: '72 में दहाई अंक कौन सा है?', options: [2, 72, 7, 9], answer: 7, difficulty: 1 },
    { id: 40, type: 'place_value', text: 'इकाई अंक बताओ: 89', hindi: '89 में इकाई अंक कौन सा है?', options: [8, 89, 9, 17], answer: 9, difficulty: 1 },
    { id: 41, type: 'place_value', text: '40 + 5 = ?', hindi: '40 + 5 = ?', options: [44, 50, 45, 54], answer: 45, difficulty: 2 },
    { id: 42, type: 'place_value', text: '30 + 7 = ?', hindi: '30 + 7 = ?', options: [73, 37, 307, 47], answer: 37, difficulty: 2 },
    { id: 43, type: 'place_value', text: '60 + 3 = ?', hindi: '60 + 3 = ?', options: [36, 63, 603, 93], answer: 63, difficulty: 2 },
    { id: 44, type: 'place_value', text: '50 + 9 = ?', hindi: '50 + 9 = ?', options: [95, 59, 509, 69], answer: 59, difficulty: 2 },
    { id: 45, type: 'place_value', text: 'सैकड़ा अंक बताओ: 245', hindi: '245 में सैकड़ा अंक कौन सा है?', options: [4, 5, 2, 24], answer: 2, difficulty: 3 },
    { id: 46, type: 'place_value', text: 'दहाई अंक बताओ: 378', hindi: '378 में दहाई अंक कौन सा है?', options: [3, 8, 7, 37], answer: 7, difficulty: 3 },

    // ---- COMPARISON ----
    { id: 47, type: 'comparison', text: 'कौन बड़ा है? 5 या 3', hindi: 'कौन बड़ा है? 5 या 3', options: [3, 5, 8, 2], answer: 5, difficulty: 1 },
    { id: 48, type: 'comparison', text: 'कौन छोटा है? 9 या 4', hindi: 'कौन छोटा है? 9 या 4', options: [9, 13, 4, 5], answer: 4, difficulty: 1 },
    { id: 49, type: 'comparison', text: 'कौन बड़ा है? 12 या 18', hindi: 'कौन बड़ा है? 12 या 18', options: [12, 18, 30, 6], answer: 18, difficulty: 2 },
    { id: 50, type: 'comparison', text: 'कौन छोटा है? 25 या 19', hindi: 'कौन छोटा है? 25 या 19', options: [25, 19, 44, 6], answer: 19, difficulty: 2 },

    // ---- COUNTING / PATTERNS ----
    { id: 51, type: 'counting', text: 'अगला नंबर: 2, 4, 6, ?', hindi: 'अगला नंबर: 2, 4, 6, ?', options: [7, 9, 8, 10], answer: 8, difficulty: 1 },
    { id: 52, type: 'counting', text: 'अगला नंबर: 5, 10, 15, ?', hindi: 'अगला नंबर: 5, 10, 15, ?', options: [18, 25, 20, 16], answer: 20, difficulty: 2 },
    { id: 53, type: 'counting', text: 'अगला नंबर: 3, 6, 9, ?', hindi: 'अगला नंबर: 3, 6, 9, ?', options: [11, 15, 12, 10], answer: 12, difficulty: 2 },
    { id: 54, type: 'counting', text: 'पीछे गिनो: 10, 8, 6, ?', hindi: 'पीछे गिनो: 10, 8, 6, ?', options: [5, 3, 4, 2], answer: 4, difficulty: 2 },
    { id: 55, type: 'counting', text: 'अगला नंबर: 1, 4, 7, ?', hindi: 'अगला नंबर: 1, 4, 7, ?', options: [8, 11, 10, 9], answer: 10, difficulty: 3 },

    // ---- EVS PICTURE QUIZ (Emojis/Placeholders) ----
    { id: 56, type: 'evs_picture', text: 'इनमें से फल कौन सा है?', hindi: 'इनमें से फल कौन सा है?', options: ['🍎', '🥦', '🚗', '🐶'], answer: '🍎', difficulty: 1 },
    { id: 57, type: 'evs_picture', text: 'पानी में कौन रहता है?', hindi: 'पानी में कौन रहता है?', options: ['🦁', '🦅', '🐟', '🐱'], answer: '🐟', difficulty: 1 },
    { id: 58, type: 'evs_picture', text: 'इनमें से वाहन कौन सा है?', hindi: 'इनमें से वाहन कौन सा है?', options: ['🌺', '🚲', '🍔', '📱'], answer: '🚲', difficulty: 1 },
    { id: 59, type: 'evs_picture', text: 'हमारे शरीर का अंग कौन सा है?', hindi: 'हमारे शरीर का अंग कौन सा है?', options: ['✏️', '👀', '⚽', '🎸'], answer: '👀', difficulty: 1 },
    { id: 60, type: 'evs_picture', text: 'आसमान में क्या चमकता है?', hindi: 'आसमान में क्या चमकता है?', options: ['☀️', '🌲', '🏠', '🍎'], answer: '☀️', difficulty: 1 },
];

export function getQuestionById(id) {
    return questions.find(q => q.id === id) || null;
}
