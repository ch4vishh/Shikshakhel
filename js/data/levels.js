// ============================================
// LEVELS.JS – 15 levels with progressive difficulty
// ============================================

export const levels = {
    1:  { id: 1,  name: 'जोड़ना सीखो',        nameEn: 'Learn Addition',    desc: 'छोटे जोड़ (1-5)',         type: 'addition',      difficulty: 1, questionIds: [1, 2, 4, 5],         starThresholds: [2, 3, 4] },
    2:  { id: 2,  name: 'और जोड़ो!',          nameEn: 'More Addition',     desc: 'जोड़ (5-10)',             type: 'addition',      difficulty: 1, questionIds: [3, 5, 6, 11],        starThresholds: [2, 3, 4] },
    3:  { id: 3,  name: 'घटाना सीखो',         nameEn: 'Learn Subtraction', desc: 'छोटे घटाव (1-10)',       type: 'subtraction',   difficulty: 1, questionIds: [15, 16, 17, 18],     starThresholds: [2, 3, 4] },
    4:  { id: 4,  name: 'और घटाओ!',           nameEn: 'More Subtraction',  desc: 'घटाव (10-20)',           type: 'subtraction',   difficulty: 1, questionIds: [19, 20, 21, 22],     starThresholds: [2, 3, 4] },
    5:  { id: 5,  name: 'मिसिंग नंबर',        nameEn: 'Number Bonds',      desc: 'खाली जगह भरो',           type: 'number_bonds',  difficulty: 1, questionIds: [27, 28, 29, 30],     starThresholds: [2, 3, 4] },
    6:  { id: 6,  name: 'बड़ा-छोटा',          nameEn: 'Compare Numbers',   desc: 'कौन बड़ा, कौन छोटा?',   type: 'comparison',    difficulty: 1, questionIds: [47, 48, 49, 50],     starThresholds: [2, 3, 4] },
    7:  { id: 7,  name: 'गिनती पैटर्न',       nameEn: 'Counting Patterns', desc: 'अगला नंबर बताओ',         type: 'counting',      difficulty: 1, questionIds: [51, 52, 53, 54],     starThresholds: [2, 3, 4] },
    8:  { id: 8,  name: 'बड़ा जोड़',           nameEn: 'Harder Addition',   desc: 'जोड़ (10+)',              type: 'addition',      difficulty: 2, questionIds: [7, 8, 9, 10],        starThresholds: [2, 3, 4] },
    9:  { id: 9,  name: 'बड़ा घटाव',          nameEn: 'Harder Subtraction',desc: 'घटाव (10+)',             type: 'subtraction',   difficulty: 2, questionIds: [22, 23, 24, 25],     starThresholds: [2, 3, 4] },
    10: { id: 10, name: 'नंबर बॉन्ड चैलेंज', nameEn: 'Bond Challenge',    desc: 'बड़े नंबर बॉन्ड',        type: 'number_bonds',  difficulty: 2, questionIds: [31, 32, 33, 34],     starThresholds: [2, 3, 4] },
    11: { id: 11, name: 'स्थानीय मान',        nameEn: 'Place Value',       desc: 'इकाई और दहाई',           type: 'place_value',   difficulty: 1, questionIds: [37, 38, 39, 40],     starThresholds: [2, 3, 4] },
    12: { id: 12, name: 'मान मिलाओ',          nameEn: 'Build Numbers',     desc: 'दहाई + इकाई = ?',        type: 'place_value',   difficulty: 2, questionIds: [41, 42, 43, 44],     starThresholds: [2, 3, 4] },
    13: { id: 13, name: 'मास्टर जोड़',         nameEn: 'Master Addition',   desc: 'सबसे कठिन जोड़',         type: 'addition',      difficulty: 3, questionIds: [10, 12, 13, 14],     starThresholds: [2, 3, 4] },
    14: { id: 14, name: 'सैकड़ा मान',         nameEn: 'Hundreds Place',    desc: 'सैकड़ा, दहाई, इकाई',     type: 'place_value',   difficulty: 3, questionIds: [45, 46, 41, 43],     starThresholds: [2, 3, 4] },
    15: { id: 15, name: 'फाइनल बॉस!',        nameEn: 'Final Challenge',   desc: 'मिक्स सवाल',             type: 'mixed',         difficulty: 3, questionIds: [14, 26, 35, 36, 55], starThresholds: [3, 4, 5] },
};

export const totalLevels = Object.keys(levels).length;

export function getLevelStatus(levelId, progress) {
    if (!progress) return 'locked';
    if (progress.completedLevels && progress.completedLevels[levelId]) return 'completed';
    // Level 1 is always unlocked; others need previous level complete
    if (levelId === 1) return 'unlocked';
    if (progress.completedLevels && progress.completedLevels[levelId - 1]) return 'unlocked';
    return 'locked';
}

export function getStarsForLevel(levelId, progress) {
    if (!progress || !progress.completedLevels) return 0;
    return progress.completedLevels[levelId]?.stars || 0;
}
