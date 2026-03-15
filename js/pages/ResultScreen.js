// ResultScreen Component
import React from 'react';
import { completeLevel, BADGES } from '../utils/storage.js';
const h = React.createElement;

export function ResultScreen({ navigate, childId, levelId, score, totalQ, stars, timeSec }) {
    const [result, setResult] = React.useState(null);

    React.useEffect(() => {
        if (childId && levelId && typeof stars === 'number') {
            const res = completeLevel(childId, levelId, stars, timeSec || 0);
            setResult(res);
        }
    }, []);

    const pct = totalQ > 0 ? Math.round((score / totalQ) * 100) : 0;
    const title = stars >= 3 ? 'परफेक्ट! 🏆' : stars >= 2 ? 'बहुत अच्छे! 🎉' : stars >= 1 ? 'अच्छा! 👍' : 'कोशिश जारी रखो! 💪';

    const newBadge = result?.newBadge;
    const badgeInfo = newBadge && BADGES[newBadge];

    const xpGained = (stars || 0) * 10 + 5;
    const totalXP = result?.progress?.totalXP || xpGained;
    const xpForNext = Math.ceil(totalXP / 100) * 100;
    const xpPercent = ((totalXP % 100) / 100) * 100;

    return h('div', { className: 'result page-no-nav' },
        // Confetti
        h('div', { className: 'confetti-container' },
            Array.from({ length: 12 }, (_, i) =>
                h('div', { key: i, className: 'confetti-piece' })
            )
        ),

        h('div', { className: 'result-character' }, stars >= 2 ? '🎊' : '💪'),
        h('h2', { className: 'result-title' }, title),
        h('p', { className: 'result-subtitle' }, score + '/' + totalQ + ' सही — ' + pct + '%'),

        // Stars
        h('div', { className: 'result-stars' },
            [1, 2, 3].map(s =>
                h('span', { key: s, className: 'result-star ' + (s <= (stars || 0) ? 'earned' : 'empty') },
                    s <= (stars || 0) ? '⭐' : '☆'
                )
            )
        ),

        // Stats
        h('div', { className: 'result-stats' },
            h('div', { className: 'result-stat' },
                h('div', { className: 'result-stat-value' }, '+' + xpGained),
                h('div', { className: 'result-stat-label' }, 'XP'),
            ),
            h('div', { className: 'result-stat' },
                h('div', { className: 'result-stat-value' }, (timeSec || 0) + 's'),
                h('div', { className: 'result-stat-label' }, 'समय'),
            ),
            h('div', { className: 'result-stat' },
                h('div', { className: 'result-stat-value' }, '🔥 ' + (result?.progress?.streak || 0)),
                h('div', { className: 'result-stat-label' }, 'स्ट्रीक'),
            )
        ),

        // XP Bar
        h('div', { className: 'xp-bar-section' },
            h('div', { className: 'xp-label' },
                h('span', null, 'XP'),
                h('span', null, totalXP + ' / ' + xpForNext),
            ),
            h('div', { className: 'xp-bar' },
                h('div', { className: 'xp-fill', style: { width: xpPercent + '%' } })
            )
        ),

        // Badge unlock
        badgeInfo && h('div', { className: 'badge-unlock' },
            h('div', { className: 'badge-icon' }, badgeInfo.icon),
            h('div', { className: 'badge-text' },
                h('div', { className: 'badge-label' }, '🔓 नया बैज!'),
                h('div', { className: 'badge-name' }, badgeInfo.name),
            )
        ),

        // Buttons
        h('div', { className: 'result-actions' },
            h('button', {
                className: 'btn-continue',
                onClick: () => {
                    const nextId = (levelId || 0) + 1;
                    navigate('/game/' + nextId);
                },
            }, 'अगला लेवल →'),
            h('button', {
                className: 'btn-home',
                onClick: () => navigate('/home'),
            }, '🏠 होम')
        )
    );
}
