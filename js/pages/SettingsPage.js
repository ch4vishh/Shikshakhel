// SettingsPage Component
import React from 'react';
import { getSettings, saveSettings, clearAllData, getParent } from '../utils/storage.js';
const h = React.createElement;

export function SettingsPage({ navigate, onClear }) {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        let mounted = true;
        async function load() {
            const settings = await getSettings();
            const parent = await getParent();
            if (mounted) setData({ settings, parent });
        }
        load();
        return () => { mounted = false; };
    }, []);

    if (!data) {
        return h('div', { className: 'page', style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            h('div', { className: 'spinner' })
        );
    }

    const { settings, parent } = data;

    const toggleSound = async () => {
        const updated = { ...settings, soundOn: !settings.soundOn };
        setData({ settings: updated, parent });
        await saveSettings(updated);
    };

    const handleClear = async () => {
        if (confirm('क्या आप सारा डेटा मिटाना चाहते हैं? यह वापस नहीं आयेगा!')) {
            await clearAllData();
            onClear();
            navigate('/login');
        }
    };

    return h('div', { className: 'settings-page page' },
        h('h2', null, '⚙️ सेटिंग'),

        // Profile info
        parent && h('div', { className: 'settings-group' },
            h('div', { className: 'settings-item' },
                h('div', { className: 'settings-item-left' },
                    h('span', { className: 'settings-icon' }, '👤'),
                    h('div', null,
                        h('div', { className: 'settings-label' }, parent.name),
                        h('div', { className: 'settings-sublabel' }, parent.phone)
                    )
                )
            )
        ),

        // Sound Toggle
        h('div', { className: 'settings-group' },
            h('div', { className: 'settings-item' },
                h('div', { className: 'settings-item-left' },
                    h('span', { className: 'settings-icon' }, '🔊'),
                    h('div', null,
                        h('div', { className: 'settings-label' }, 'ध्वनि'),
                        h('div', { className: 'settings-sublabel' }, settings.soundOn ? 'चालू' : 'बंद')
                    )
                ),
                h('button', {
                    className: 'toggle' + (settings.soundOn ? ' on' : ''),
                    onClick: toggleSound,
                })
            ),

            h('div', { className: 'settings-item' },
                h('div', { className: 'settings-item-left' },
                    h('span', { className: 'settings-icon' }, '🌐'),
                    h('div', null,
                        h('div', { className: 'settings-label' }, 'भाषा'),
                        h('div', { className: 'settings-sublabel' }, 'हिन्दी')
                    )
                ),
                h('span', { style: { fontSize: '0.8rem', color: 'var(--text-muted)' } }, 'जल्द आ रहा है')
            )
        ),

        // Premium Plan
        h('div', { className: 'settings-group' },
            h('div', { 
                className: 'settings-item', 
                style: { cursor: 'pointer' },
                onClick: () => navigate('/payment')
            },
                h('div', { className: 'settings-item-left' },
                    h('span', { className: 'settings-icon' }, '💎'),
                    h('div', null,
                        h('div', { className: 'settings-label' }, 'शिक्षाखेल प्रो'),
                        h('div', { className: 'settings-sublabel', style: { color: 'var(--accent)' } }, 'प्रीमियम अनलॉक करें')
                    )
                ),
                h('button', {
                    className: 'btn-secondary',
                    style: { flex: 'none', padding: '0.4rem 0.8rem', fontSize: '0.75rem', background: 'var(--accent)', color: '#000', border: 'none' },
                    onClick: (e) => { e.stopPropagation(); navigate('/payment'); },
                }, 'अपग्रेड →')
            )
        ),

        // App Info
        h('div', { className: 'settings-group' },
            h('div', { className: 'settings-item' },
                h('div', { className: 'settings-item-left' },
                    h('span', { className: 'settings-icon' }, '📱'),
                    h('div', null,
                        h('div', { className: 'settings-label' }, 'शिक्षाखेल'),
                        h('div', { className: 'settings-sublabel' }, 'संस्करण 1.0.0 • F-Society')
                    )
                )
            ),

            h('div', { className: 'settings-item' },
                h('div', { className: 'settings-item-left' },
                    h('span', { className: 'settings-icon' }, '👧'),
                    h('div', null,
                        h('div', { className: 'settings-label' }, 'बच्चा बदलें'),
                        h('div', { className: 'settings-sublabel' }, 'दूसरा बच्चा चुनें')
                    )
                ),
                h('button', {
                    className: 'btn-secondary',
                    style: { flex: 'none', padding: '0.4rem 0.8rem', fontSize: '0.75rem' },
                    onClick: () => navigate('/select-child'),
                }, 'बदलें')
            )
        ),

        // Danger zone
        h('div', { className: 'settings-group', style: { marginTop: '1rem' } },
            h('button', {
                className: 'btn-danger',
                onClick: handleClear,
            }, '🗑️ सारा डेटा मिटाएं')
        ),

        // Credits
        h('div', { style: {
            textAlign: 'center',
            marginTop: '2rem',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            lineHeight: '1.6',
        }},
            h('p', null, 'बनाया – F-Society टीम'),
            h('p', null, '🇮🇳 भारत के ग्रामीण बच्चों के लिए'),
        )
    );
}
