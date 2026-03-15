// GameScreen Component
import React from 'react';
import { getProgress } from '../utils/storage.js';
import { levels } from '../data/levels.js';
import { questions } from '../data/questions.js';
import { speakHindi } from '../utils/speech.js';
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
    
    // For Place Value tap-to-place mechanic
    const [slottedAnswer, setSlottedAnswer] = React.useState(null);
    const [startTime] = React.useState(Date.now());
    const [character] = React.useState(CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]);
    const [shuffledOptions, setShuffledOptions] = React.useState([]);

    const currentQ = levelQuestions[currentIdx];

    // Shuffle options when question changes
    React.useEffect(() => {
        if (currentQ) {
            setShuffledOptions([...currentQ.options].sort(() => Math.random() - 0.5));
            speakHindi(currentQ.hindi || currentQ.text);
        }
    }, [currentIdx, currentQ]);

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
            speakHindi(ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)]);
        } else {
            setFeedback('wrong');
            speakHindi(WRONG_MSG[Math.floor(Math.random() * WRONG_MSG.length)]);
        }

        // Move to next after delay
        setTimeout(() => {
            if (currentIdx + 1 < totalQ) {
                setCurrentIdx(i => i + 1);
                setSelected(null);
                setSlottedAnswer(null);
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

        // Question Area
        h('div', { className: 'game-question' },
            h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' } },
                h('button', { 
                    onClick: () => speakHindi(currentQ.hindi || currentQ.text),
                    style: { background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', cursor: 'pointer', boxShadow: 'var(--sh-sm)' }
                }, '🔊')
            ),

            // Number Bonds Visual UI
            currentQ.type === 'number_bonds' ? h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: '2rem', fontWeight: 800, margin: '1rem 0' } },
                ...currentQ.text.split(' ').map((part, idx) => {
                    if (part === '?') return h('div', { key: idx, style: { background: 'rgba(255,255,255,0.1)', border: '2px dashed var(--accent)', borderRadius: 'var(--r-md)', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' } }, '?');
                    if (part === '+' || part === '=') return h('span', { key: idx, style: { color: 'var(--text-300)' } }, part);
                    return h('div', { key: idx, style: { background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 'var(--r-md)', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-inset)' } }, part);
                })
            ) : 

            // Place Value Visual UI
            currentQ.type === 'place_value' && currentQ.text.includes(':') ? h('div', null,
                h('h2', { className: 'question-text', style: { fontSize: '1.5rem', marginBottom: '1rem' } }, currentQ.hindi.split('में')[0] + ' में:'),
                h('div', { style: { display: 'flex', justifyContent: 'center', gap: '0.5rem', fontSize: '3rem', fontWeight: 800, letterSpacing: '4px', background: 'var(--glass)', padding: '1rem 2rem', borderRadius: 'var(--r-lg)', display: 'inline-block' } }, 
                    currentQ.text.split(': ')[1]
                )
            ) :

            // EVS Image Grid Visual UI
            currentQ.type === 'evs_picture' ? h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' } },
                shuffledOptions.map((opt, idx) => {
                    let cls = 'option-btn', bg = 'var(--glass)';
                    if (selected !== null) {
                        if (opt === currentQ.answer) { cls += ' correct'; bg = '#10B981'; }
                        else if (opt === selected) { cls += ' wrong'; bg = '#EF4444'; }
                        else cls += ' disabled';
                    }
                    return h('button', {
                        key: idx,
                        className: cls,
                        style: { height: '120px', fontSize: '4rem', background: bg, border: '2px solid var(--glass-border)', borderRadius: 'var(--r-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' },
                        onClick: () => handleAnswer(opt),
                        disabled: selected !== null,
                    }, opt);
                })
            ) :

            // Default Text UI
            h('h2', { className: 'question-text' }, currentQ.hindi || currentQ.text),

            h('p', { className: 'question-hint', style: { marginTop: '1rem', color: 'var(--text-400)' } },
                currentQ.type === 'addition' ? 'जोड़ो (Add)' :
                currentQ.type === 'subtraction' ? 'घटाओ (Subtract)' :
                currentQ.type === 'number_bonds' ? 'खाली बॉक्स भरो (Fill the box)' :
                currentQ.type === 'place_value' ? 'सही अंक बॉक्स में रखो (Place the digit)' :
                currentQ.type === 'comparison' ? 'तुलना करो (Compare)' :
                currentQ.type === 'counting' ? 'पैटर्न पूरा करो (Complete pattern)' :
                currentQ.type === 'evs_picture' ? 'सही चित्र पहचानो (Tap the picture)' : ''
            ),

            // Drop Slot for Place Value (renders below the hint)
            currentQ.type === 'place_value' && h('div', { className: 'place-value-slot-container', style: { margin: '1.5rem auto', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--r-lg)', border: '2px dashed var(--glass-border)', maxWidth: '200px', textAlign: 'center' } },
                h('div', { style: { fontSize: '0.85rem', color: 'var(--text-400)', marginBottom: '0.5rem' } }, 'उत्तर यहाँ रखें'),
                h('div', { 
                    className: slottedAnswer !== null ? (selected ? (slottedAnswer === currentQ.answer ? 'correct-bounce' : 'wrong-shake') : 'pop-in') : '',
                    style: { width: '80px', height: '80px', margin: '0 auto', background: slottedAnswer !== null ? 'var(--primary)' : 'rgba(255,255,255,0.05)', border: slottedAnswer !== null ? 'none' : '2px dashed var(--text-400)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', cursor: selected === null ? 'pointer' : 'default', transition: 'all 0.3s' },
                    onClick: () => { if(selected === null) setSlottedAnswer(null); }
                }, slottedAnswer !== null ? slottedAnswer : '')
            )
        ),

        // Options (hide for EVS because they are already rendered in the grid)
        currentQ.type !== 'evs_picture' && h('div', { className: 'options-grid' },
            shuffledOptions.map((opt, idx) => {
                let cls = 'option-btn';
                
                // For place value, we disable the option if it's currently slotted
                let isSlotted = currentQ.type === 'place_value' && slottedAnswer === opt;
                if (isSlotted) cls += ' disabled';

                if (selected !== null) {
                    if (opt === currentQ.answer) cls += ' correct';
                    else if (opt === selected || isSlotted) cls += ' wrong';
                    else cls += ' disabled';
                }
                return h('button', {
                    key: idx,
                    className: cls,
                    style: { opacity: isSlotted ? 0.3 : 1, transform: isSlotted ? 'scale(0.9)' : 'none' },
                    onClick: () => {
                        if (currentQ.type === 'place_value') {
                            setSlottedAnswer(opt);
                            // Auto-submit when placed
                            handleAnswer(opt);
                        } else {
                            handleAnswer(opt);
                        }
                    },
                    disabled: selected !== null || isSlotted,
                }, opt);
            })
        ),

        // Feedback emoji overlay
        feedback && h('div', { className: 'feedback-overlay' },
            h('div', { className: 'feedback-emoji' }, feedback === 'correct' ? '✅' : '❌')
        )
    );
}
