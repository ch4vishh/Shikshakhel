// InstallPrompt Component
import React from 'react';
const h = React.createElement;

export function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const handler = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Hide if already installed
        window.addEventListener('appinstalled', () => {
            setIsVisible(false);
            setDeferredPrompt(null);
        });

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        setIsVisible(false);
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        // We've used the prompt, and can't use it again, throw it away
        setDeferredPrompt(null);
    };

    if (!isVisible) return null;

    return h('div', { className: 'install-banner', style: {
        position: 'fixed',
        bottom: '80px', // Above bottom nav
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 2rem)',
        maxWidth: '440px',
        background: 'var(--glass)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        border: '1px solid var(--accent)',
        borderRadius: 'var(--r-md)',
        padding: '0.8rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--sh-glow)',
        zIndex: 1000
    } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '0.8rem' } },
            h('span', { style: { fontSize: '1.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' } }, '📱'),
            h('div', null,
                h('div', { style: { fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-100)' } }, 'ऐप इंस्टॉल करें'),
                h('div', { style: { fontSize: '0.7rem', color: 'var(--text-300)' } }, 'तेज़ और बिना इंटरनेट के खेलने के लिए')
            )
        ),
        h('div', { style: { display: 'flex', gap: '0.5rem' } },
            h('button', { 
                onClick: () => setIsVisible(false),
                style: { background: 'transparent', border: 'none', color: 'var(--text-400)', fontSize: '1.2rem', padding: '0 0.5rem' }
            }, '✕'),
            h('button', {
                className: 'btn-primary',
                style: { padding: '0.4rem 0.8rem', fontSize: '0.8rem', flex: 'none' },
                onClick: handleInstallClick
            }, 'इंस्टॉल')
        )
    );
}
