// SplashScreen Component
import React from 'react';
import { getParent, getActiveChild } from '../utils/storage.js';

const h = React.createElement;

export function SplashScreen({ navigate, isLoading = false }) {
    React.useEffect(() => {
        if (isLoading) return; // Wait until App.js finishes loading core state

        let mounted = true;
        const timer = setTimeout(async () => {
            const parent = await getParent();
            const activeChild = await getActiveChild();
            
            if (!mounted) return;

            if (parent && activeChild) {
                navigate('/home');
            } else if (parent) {
                navigate('/select-child');
            } else {
                navigate('/login');
            }
        }, 2500);
        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, [isLoading, navigate]);

    return h('div', { className: 'splash page-no-nav' },
        h('div', { className: 'splash-particles' },
            h('div', { className: 'splash-particle' }),
            h('div', { className: 'splash-particle' }),
            h('div', { className: 'splash-particle' }),
            h('div', { className: 'splash-particle' }),
            h('div', { className: 'splash-particle' })
        ),
        h('div', { className: 'splash-logo' }, '📚'),
        h('h1', { className: 'splash-title' }, 'शिक्षाखेल'),
        h('p', { className: 'splash-subtitle' }, 'खेल-खेल में पढ़ाई — कक्षा 1 से 3'),
        h('div', { className: 'splash-loader' },
            h('div', { className: 'splash-loader-bar' })
        )
    );
}
