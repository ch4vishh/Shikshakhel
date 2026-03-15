// GameScreen Component
import React from 'react';
import { getProgress } from '../utils/storage.js';
import { levels } from '../data/levels.js';
import { questions } from '../data/questions.js';
const h = React.createElement;

const CHARACTERS = ['🦊', '🐼', '🦁', '🐸', '🐵', '🐰'];
const ENCOURAGE = ['शाबाश! 🎉', 'बहुत अच्छे! 👏', 'सही जवाब! ✅', 'वाह! 🌟'];
const WRONG_MSG = ['कोई बात नहीं! 💪', 'फिर कोशिश करो! 🔄', 'अगली बार सही होगा! 😊'];

export function GameScreen({ navigate, levelId, childId }) {
    const level = levels[levelId];
    const levelQuestions = level ? level.questionIds.map(id => questions.find(q => q.id === id)).filter(Boolean) : [];
    const totalQ = levelQuestions.length;

    const [currentIdx, setCurrentIdx] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [selected, setSelected] = React.useState(null);
    const [feedback, setFeedback] = React.useState(null); // 'correct' | 'wrong'
    const [startTime] = React.useState(Date.now());
    const [character] = React.useState(CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]);
    const [shuffledOptions, setShuffledOptions] = React.useState([]);

    const currentQ = levelQuestions[currentIdx];

    // Shuffle options when question changes
    React.useEffect(() => {
        if (currentQ) {
            setShuffledOptions([...currentQ.options].sort(() => Math.random() - 0.5));
        }
    }, [currentIdx]);

    if (!level || !currentQ) {
        return h('div', { className: 'game page-no-nav', style: { alignItems: 'center', justifyContent: 'center' } },
            h('p', null, 'लेवल लोड नहीं हुआ'),
            h('button', { className: 'btn-primary', style: { maxWidth: '200px', marginTop: '1rem' }, onClick: () => navigate('/home') }, 'वापस जाओ')
        );
    }

    const handleAnswer = (opt) => {
        if (selected !== null) return; // Already answered
        setSelected(opt);

        if (opt === currentQ.answer) {
            setFeedback('correct');
            setScore(s => s + 1);
        } else {
            setFeedback('wrong');
        }

        // Move to next after delay
        setTimeout(() => {
            if (currentIdx + 1 < totalQ) {
                setCurrentIdx(i => i + 1);
                setSelected(null);
                setFeedback(null);
            } else {
                // Game finished
                const timeSec = Math.round((Date.now() - startTime) / 1000);
                const finalScore = score + (opt === currentQ.answer ? 1 : 0);
                let stars = 0;
                if (finalScore >= (level.starThresholds[2] || totalQ)) stars = 3;
                else if (finalScore >= (level.starThresholds[1] || Math.ceil(totalQ * 0.7))) stars = 2;
                else if (finalScore >= (level.starThresholds[0] || Math.ceil(totalQ * 0.5))) stars = 1;

                navigate('/result', { levelId, score: finalScore, totalQ, stars, timeSec });
            }
        }, 1200);
    };

    const progressPct = ((currentIdx) / totalQ) * 100;

    const speechText = feedback === 'correct'
        ? ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)]
        : feedback === 'wrong'
            ? WRONG_MSG[Math.floor(Math.random() * WRONG_MSG.length)]
            : level.name;

    return h('div', { className: 'game page-no-nav' },
        // Top bar
        h('div', { className: 'game-topbar' },
            h('button', { className: 'game-close', onClick: () => navigate('/home') }, '✕'),
            h('div', { className: 'game-progress-bar' },
                h('div', { className: 'game-progress-fill', style: { width: progressPct + '%' } })
            ),
            h('span', { className: 'game-question-count' }, (currentIdx + 1) + '/' + totalQ)
        ),

        // Character
        h('div', { className: 'game-character' },
            h('div', { className: 'character-emoji' }, character),
            h('div', { className: 'character-speech' },
                h('span', null, speechText)
            )
        ),

        // Question
        h('div', { className: 'game-question' },
            h('h2', { className: 'question-text' }, currentQ.hindi || currentQ.text),
            h('p', { className: 'question-hint' },
                currentQ.type === 'addition' ? 'जोड़ो' :
                currentQ.type === 'subtraction' ? 'घटाओ' :
                currentQ.type === 'number_bonds' ? 'खाली जगह भरो' :
                currentQ.type === 'place_value' ? 'स्थानीय मान' :
                currentQ.type === 'comparison' ? 'तुलना करो' :
                currentQ.type === 'counting' ? 'गिनती पैटर्न' : ''
            )
        ),

        // Options
        h('div', { className: 'options-grid' },
            shuffledOptions.map((opt, idx) => {
                let cls = 'option-btn';
                if (selected !== null) {
                    if (opt === currentQ.answer) cls += ' correct';
                    else if (opt === selected) cls += ' wrong';
                    else cls += ' disabled';
                }
                return h('button', {
                    key: idx,
                    className: cls,
                    onClick: () => handleAnswer(opt),
                    disabled: selected !== null,
                }, opt);
            })
        ),

        // Feedback emoji overlay
        feedback && h('div', { className: 'feedback-overlay' },
            h('div', { className: 'feedback-emoji' }, feedback === 'correct' ? '✅' : '❌')
        )
    );
}
