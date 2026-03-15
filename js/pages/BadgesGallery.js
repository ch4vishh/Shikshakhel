// BadgesGallery Component
import React from 'react';
import { getProgress, BADGES } from '../utils/storage.js';
const h = React.createElement;

export function BadgesGallery({ navigate, childId }) {
    const [progress, setProgress] = React.useState(null);

    React.useEffect(() => {
        let mounted = true;
        async function load() {
            if (childId) {
                const p = await getProgress(childId);
                if (mounted) setProgress(p);
            }
        }
        load();
        return () => { mounted = false; };
    }, [childId]);

    if (!progress) {
        return h('div', { className: 'page', style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            h('div', { className: 'spinner' })
        );
    }

    const earnedBadges = progress.badges || [];
    const allBadgeKeys = Object.keys(BADGES);

    return h('div', { className: 'badges-page page' },
        // Top bar with back button
        h('div', { className: 'game-topbar', style: { marginBottom: '1.5rem', justifyContent: 'flex-start', gap: '1rem' } },
            h('button', { className: 'game-close', onClick: () => navigate('/home') }, '←'),
            h('h2', { style: { margin: 0, fontSize: '1.2rem', color: 'var(--text-100)' } }, '🏆 मेरे बैज')
        ),

        h('p', { style: { color: 'var(--text-300)', textAlign: 'center', marginBottom: '2rem' } }, 
            'आपने ' + earnedBadges.length + '/' + allBadgeKeys.length + ' बैज जीते हैं!'
        ),

        h('div', { className: 'badges-grid', style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' } },
            allBadgeKeys.map(key => {
                const isEarned = earnedBadges.includes(key);
                const badgeInfo = BADGES[key];
                
                return h('div', {
                    key: key,
                    className: 'badge-card ' + (isEarned ? 'earned' : 'locked'),
                    style: {
                        background: 'var(--glass)',
                        backdropFilter: 'blur(14px) saturate(1.3)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--r-lg)',
                        padding: '1.5rem 1rem',
                        textAlign: 'center',
                        position: 'relative',
                        boxShadow: isEarned ? 'var(--sh-glow)' : 'var(--sh-inset)',
                        opacity: isEarned ? 1 : 0.6,
                        filter: isEarned ? 'none' : 'grayscale(1)',
                    }
                },
                    h('div', { style: { fontSize: '3rem', filter: isEarned ? 'drop-shadow(0 4px 12px rgba(245,158,11,0.5))' : 'none', marginBottom: '0.8rem' } }, 
                        isEarned ? badgeInfo.icon : '🔒'
                    ),
                    h('div', { style: { fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-100)', marginBottom: '0.3rem' } }, 
                        badgeInfo.name
                    ),
                    h('div', { style: { fontSize: '0.65rem', color: 'var(--text-400)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 } }, 
                        badgeInfo.nameEn
                    )
                );
            })
        )
    );
}
