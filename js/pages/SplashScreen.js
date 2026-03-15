// SplashScreen Component
import React from 'react';
const h = React.createElement;

export function SplashScreen({ navigate }) {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            // Check if already logged in
            const parent = localStorage.getItem('shikshakhel_parent');
            const activeChild = localStorage.getItem('shikshakhel_active_child');
            if (parent && activeChild) {
                navigate('/home');
            } else if (parent) {
                navigate('/select-child');
            } else {
                navigate('/login');
            }
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return h('div', { className: 'splash page-no-nav' },
        h('div', { className: 'splash-particles' },
            h('div', { className: 'splash-particle' }),
            h('div', { className: 'splash-particle' }),
            h('div', { className: 'splash-particle' }),
            h('div', { className: 'splash-particle' }),
            h('div', { className: 'splash-particle' }),
        ),
        h('div', { className: 'splash-logo' }, '📚'),
        h('h1', { className: 'splash-title' }, 'शिक्षाखेल'),
        h('p', { className: 'splash-subtitle' }, 'खेल-खेल में पढ़ाई — कक्षा 1 से 3'),
        h('div', { className: 'splash-loader' },
            h('div', { className: 'splash-loader-bar' })
        )
    );
}
