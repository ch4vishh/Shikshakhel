// HomeScreen Component
import React from 'react';
import { getProgress, getChildren, getActiveChild, BADGES } from '../utils/storage.js';
import { levels, totalLevels, getLevelStatus, getStarsForLevel } from '../data/levels.js';
const h = React.createElement;

export function HomeScreen({ navigate, childId }) {
    const progress = getProgress(childId);
    const children = getChildren();
    const child = children.find(c => c.id === childId) || { name: 'बच्चा', avatar: '🧒' };
    const completedCount = Object.keys(progress.completedLevels).length;

    // Find next unlocked level to play
    const nextLevel = Object.values(levels).find(l => getLevelStatus(l.id, progress) === 'unlocked') ||
                      Object.values(levels).find(l => getLevelStatus(l.id, progress) === 'completed');
    const missionDone = progress.dailyCompleted >= 3;
    const missionProgress = Math.min(progress.dailyCompleted / 3, 1);

    return h('div', { className: 'home page' },
        // Header
        h('div', { className: 'home-header' },
            h('div', { className: 'greeting' },
                h('div', { className: 'greeting-avatar' }, child.avatar),
                h('div', { className: 'greeting-text' },
                    h('h2', null, 'नमस्ते, ' + child.name + '!'),
                    h('p', null, 'आज का मिशन पूरा करो')
                )
            ),
            h('div', { className: 'streak-badge' },
                h('span', { className: 'streak-icon' }, '🔥'),
                h('span', null, progress.streak)
            )
        ),

        // Daily Mission Card
        h('div', { className: 'daily-mission' },
            h('div', { className: 'mission-label' }, '📌 आज का मिशन'),
            h('div', { className: 'mission-title' }, missionDone ? '🎉 मिशन पूरा!' : '3 गेम खेलो'),
            h('div', { className: 'mission-progress' },
                h('div', { className: 'mission-progress-bar' },
                    h('div', { className: 'mission-progress-fill', style: { width: (missionProgress * 100) + '%' } })
                ),
                h('span', { className: 'mission-progress-text' }, progress.dailyCompleted + '/3')
            ),
            !missionDone && nextLevel && h('button', {
                className: 'mission-btn',
                onClick: () => navigate('/game/' + nextLevel.id),
            }, '▶️ खेलना शुरू करो')
        ),

        // Stats
        h('div', { className: 'stats-row' },
            h('div', { className: 'stat-card' },
                h('div', { className: 'stat-icon' }, '⭐'),
                h('div', { className: 'stat-value' }, progress.totalStars),
                h('div', { className: 'stat-label' }, 'तारे')
            ),
            h('div', { className: 'stat-card' },
                h('div', { className: 'stat-icon' }, '✅'),
                h('div', { className: 'stat-value' }, completedCount),
                h('div', { className: 'stat-label' }, 'लेवल')
            ),
            h('div', { className: 'stat-card' },
                h('div', { className: 'stat-icon' }, '🏅'),
                h('div', { className: 'stat-value' }, progress.badges.length),
                h('div', { className: 'stat-label' }, 'बैज')
            )
        ),

        // Badges showcase (if any)
        progress.badges.length > 0 && h('div', { style: { marginBottom: '1.2rem' } },
            h('div', { className: 'section-title' }, '🏆 मेरे बैज'),
            h('div', { style: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' } },
                progress.badges.map(bid =>
                    BADGES[bid] && h('div', {
                        key: bid,
                        style: {
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 'var(--radius-md)',
                            padding: '0.5rem 0.8rem',
                            fontSize: '0.78rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                        }
                    },
                        h('span', null, BADGES[bid].icon),
                        h('span', null, BADGES[bid].name)
                    )
                )
            )
        ),

        // Level Map
        h('div', { className: 'section-title' }, '🗺️ लेवल'),
        h('div', { className: 'level-map' },
            Object.values(levels).map(level => {
                const status = getLevelStatus(level.id, progress);
                const stars = getStarsForLevel(level.id, progress);
                return h('div', {
                    key: level.id,
                    className: 'level-card ' + status,
                    onClick: () => {
                        if (status !== 'locked') navigate('/game/' + level.id);
                    }
                },
                    h('div', { className: 'level-number' },
                        status === 'locked' ? '🔒' : level.id
                    ),
                    h('div', { className: 'level-info' },
                        h('div', { className: 'level-name' }, level.name),
                        h('div', { className: 'level-desc' }, level.desc)
                    ),
                    status === 'completed'
                        ? h('div', { className: 'level-stars' },
                            [1, 2, 3].map(s =>
                                h('span', { key: s, className: s <= stars ? 'earned' : 'empty' }, '⭐')
                            )
                          )
                        : status === 'locked'
                            ? h('span', { className: 'level-lock-icon' }, '🔒')
                            : h('span', { style: { color: 'var(--primary-light)', fontWeight: 700, fontSize: '0.85rem' } }, 'खेलो →')
                );
            })
        )
    );
}
