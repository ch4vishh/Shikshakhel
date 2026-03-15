// BottomNav Component
import React from 'react';
const h = React.createElement;

export function BottomNav({ route, navigate }) {
    const tabs = [
        { icon: '🏠', label: 'होम', path: '/home' },
        { icon: '📊', label: 'रिपोर्ट', path: '/parent' },
        { icon: '⚙️', label: 'सेटिंग', path: '/settings' },
    ];

    return h('nav', { className: 'bottom-nav' },
        tabs.map(tab =>
            h('button', {
                key: tab.path,
                className: 'nav-item' + (route === tab.path ? ' active' : ''),
                onClick: () => navigate(tab.path),
            },
                h('span', { className: 'nav-icon' }, tab.icon),
                h('span', null, tab.label)
            )
        )
    );
}
