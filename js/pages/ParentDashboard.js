// ParentDashboard Component
import React from 'react';
import { getChildren, getActiveChild, getProgress, BADGES } from '../utils/storage.js';
import { levels, totalLevels } from '../data/levels.js';
const h = React.createElement;

// Mock leaderboard
const LEADERBOARD = [
    { name: 'अनु', score: 120 },
    { name: 'रवि', score: 95 },
    { name: 'सीता', score: 80 },
    { name: 'मोहन', score: 65 },
    { name: 'गीता', score: 50 },
];

export function ParentDashboard({ navigate }) {
    const [data, setData] = React.useState(null);
    const [selectedChild, setSelectedChild] = React.useState(null);

    React.useEffect(() => {
        let mounted = true;
        async function load() {
            const children = await getChildren();
            let active = selectedChild;
            if (!active) {
                active = await getActiveChild() || (children[0] ? children[0].id : null);
                if (mounted) setSelectedChild(active);
            }
            
            if (active) {
                const progress = await getProgress(active);
                if (mounted) setData({ children, child: children.find(c => c.id === active), progress });
            } else {
                if (mounted) setData({ children: [], child: null, progress: null });
            }
        }
        load();
        return () => { mounted = false; };
    }, [selectedChild]);

    if (!data) {
        return h('div', { className: 'page', style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            h('div', { className: 'spinner' })
        );
    }

    const { children, child, progress } = data;

    if (!child || !progress) {
        return h('div', { className: 'parent-dash page' },
            h('div', { className: 'empty-state' },
                h('div', { className: 'empty-state-icon' }, '📊'),
                h('p', { className: 'empty-state-text' }, 'कोई बच्चा नहीं मिला। पहले बच्चा जोड़ें।')
            )
        );
    }

    const completedCount = Object.keys(progress.completedLevels).length;
    const mathPercent = Math.round((completedCount / totalLevels) * 100);
    const evsPercent = 0; // EVS placeholder
    const totalMinutes = Math.round(progress.totalTimePlayed / 60);

    // Build streak calendar (last 28 days)
    const today = new Date();
    const streakDays = [];
    for (let i = 27; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toDateString();
        const isToday = i === 0;
        // Simple heuristic: if lastPlayedDate is within streak range
        const isActive = progress.lastPlayedDate === dateStr ||
            (progress.streak > i && i < progress.streak);
        streakDays.push({ day: d.getDate(), isToday, isActive });
    }

    // Merge child into leaderboard
    const lb = [...LEADERBOARD];
    const childEntry = { name: child.name, score: progress.totalXP, isSelf: true };
    lb.push(childEntry);
    lb.sort((a, b) => b.score - a.score);

    const rankClasses = ['gold', 'silver', 'bronze'];

    return h('div', { className: 'parent-dash page' },
        // Header
        h('div', { className: 'parent-header' },
            h('h2', null, '📊 प्रगति रिपोर्ट'),
            h('span', { className: 'parent-header-icon' }, '👨‍👩‍👧')
        ),

        // Child tabs
        children.length > 1 && h('div', { className: 'parent-child-switch' },
            children.map(c =>
                h('button', {
                    key: c.id,
                    className: 'parent-child-tab' + (c.id === selectedChild ? ' active' : ''),
                    onClick: () => setSelectedChild(c.id),
                }, c.avatar + ' ' + c.name)
            )
        ),

        // Overview cards
        h('div', { className: 'overview-grid' },
            h('div', { className: 'overview-card' },
                h('div', { className: 'overview-icon' }, '⭐'),
                h('div', { className: 'overview-value' }, progress.totalStars),
                h('div', { className: 'overview-label' }, 'कुल तारे'),
            ),
            h('div', { className: 'overview-card' },
                h('div', { className: 'overview-icon' }, '🔥'),
                h('div', { className: 'overview-value' }, progress.streak),
                h('div', { className: 'overview-label' }, 'दिन स्ट्रीक'),
            ),
            h('div', { className: 'overview-card' },
                h('div', { className: 'overview-icon' }, '✅'),
                h('div', { className: 'overview-value' }, completedCount + '/' + totalLevels),
                h('div', { className: 'overview-label' }, 'लेवल पूरे'),
            ),
            h('div', { className: 'overview-card' },
                h('div', { className: 'overview-icon' }, '⏱️'),
                h('div', { className: 'overview-value' }, totalMinutes + ' मि'),
                h('div', { className: 'overview-label' }, 'कुल समय'),
            )
        ),

        // Topic Progress
        h('div', { className: 'section-title' }, '📚 विषय प्रगति'),
        h('div', { className: 'topic-progress' },
            h('div', { className: 'topic-item' },
                h('div', { className: 'topic-icon math' }, '🔢'),
                h('div', { className: 'topic-info' },
                    h('div', { className: 'topic-name' }, 'गणित (Maths)'),
                    h('div', { className: 'topic-bar' },
                        h('div', { className: 'topic-fill math', style: { width: mathPercent + '%' } })
                    )
                ),
                h('span', { className: 'topic-percent' }, mathPercent + '%'),
            ),
            h('div', { className: 'topic-item' },
                h('div', { className: 'topic-icon evs' }, '🌿'),
                h('div', { className: 'topic-info' },
                    h('div', { className: 'topic-name' }, 'पर्यावरण (EVS)'),
                    h('div', { className: 'topic-bar' },
                        h('div', { className: 'topic-fill evs', style: { width: evsPercent + '%' } })
                    )
                ),
                h('span', { className: 'topic-percent' }, evsPercent + '%'),
            )
        ),

        // Streak Calendar
        h('div', { className: 'streak-calendar' },
            h('div', { className: 'streak-cal-title' }, '🔥 स्ट्रीक कैलेंडर (28 दिन)'),
            h('div', { className: 'streak-grid' },
                streakDays.map((d, i) =>
                    h('div', {
                        key: i,
                        className: 'streak-day' + (d.isActive ? ' active' : '') + (d.isToday ? ' today' : ''),
                    }, d.day)
                )
            )
        ),

        // Leaderboard
        h('div', { className: 'leaderboard' },
            h('div', { className: 'leaderboard-title' }, '🏆 गाँव लीडरबोर्ड'),
            lb.slice(0, 6).map((entry, idx) =>
                h('div', { key: idx, className: 'leaderboard-item' },
                    h('div', {
                        className: 'lb-rank ' + (idx < 3 ? rankClasses[idx] : 'normal'),
                    }, idx + 1),
                    h('span', { className: 'lb-name' + (entry.isSelf ? ' self' : '') },
                        entry.name + (entry.isSelf ? ' (आप)' : '')
                    ),
                    h('span', { className: 'lb-score' }, entry.score + ' XP')
                )
            )
        )
    );
}
