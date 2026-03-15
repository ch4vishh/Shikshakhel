// PaymentPage Component
import React from 'react';
import { getParent } from '../utils/storage.js';
const h = React.createElement;

export function PaymentPage({ navigate }) {
    const [parent, setParent] = React.useState(null);
    const [processing, setProcessing] = React.useState(false);

    React.useEffect(() => {
        let mounted = true;
        getParent().then(p => {
            if (mounted) setParent(p);
        });
        return () => { mounted = false; };
    }, []);

    const handleMockPayment = (plan) => {
        setProcessing(true);
        // Simulate external payment gateway opening
        setTimeout(() => {
            alert(`Razorpay Checkout: ${plan.name} (₹${plan.price})\nThis is a mock integration.`);
            setProcessing(false);
            navigate('/home');
        }, 1500);
    };

    if (!parent) return h('div', { className: 'spinner' });

    return h('div', { className: 'payment-page page' },
        h('div', { className: 'game-topbar', style: { marginBottom: '1rem', justifyContent: 'flex-start', gap: '1rem' } },
            h('button', { className: 'game-close', onClick: () => navigate(-1) }, '←'),
            h('h2', { style: { margin: 0, fontSize: '1.2rem' } }, 'प्रीमियम प्लान')
        ),
        
        h('div', { style: { textAlign: 'center', marginBottom: '2rem' } },
            h('div', { style: { fontSize: '3rem', marginBottom: '0.5rem' } }, '💎'),
            h('h3', { style: { fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)' } }, 'शिक्षाखेल प्रो'),
            h('p', { style: { color: 'var(--text-300)', fontSize: '0.9rem', marginTop: '0.5rem' } }, 'सभी प्रीमियम लेवल और फीचर्स अनलॉक करें। विज्ञापन मुक्त।')
        ),

        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '1.2rem' } },
            // Daily Plan
            h('div', { className: 'plan-card', style: {
                background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 'var(--r-lg)', padding: '1.5rem', position: 'relative'
            } },
                h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' } },
                    h('div', null,
                        h('div', { style: { fontWeight: 800, fontSize: '1.1rem' } }, 'डेली पास (Daily)'),
                        h('div', { style: { color: 'var(--text-400)', fontSize: '0.8rem' } }, '24 घंटे के लिए')
                    ),
                    h('div', { style: { fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-light)' } }, '₹5')
                ),
                h('button', { 
                    className: 'btn-primary', 
                    style: { width: '100%', padding: '0.8rem' },
                    disabled: processing,
                    onClick: () => handleMockPayment({ name: 'Daily Pass', price: 5 })
                }, processing ? 'प्रोसेसिंग...' : '₹5 का भुगतान करें')
            ),

            // Monthly Plan
            h('div', { className: 'plan-card', style: {
                background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(124,58,237,0.1))', 
                border: '1.5px solid var(--accent)', borderRadius: 'var(--r-lg)', padding: '1.5rem', position: 'relative',
                boxShadow: 'var(--sh-glow)'
            } },
                h('div', { style: { position: 'absolute', top: '-10px', right: '20px', background: 'var(--accent)', color: '#000', fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '10px', textTransform: 'uppercase' } }, 'लोकप्रिय'),
                
                h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' } },
                    h('div', null,
                        h('div', { style: { fontWeight: 800, fontSize: '1.1rem' } }, 'मासिक प्लान (Monthly)'),
                        h('div', { style: { color: 'var(--text-400)', fontSize: '0.8rem' } }, 'पूरे 30 दिन के लिए')
                    ),
                    h('div', { style: { fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' } }, '₹99')
                ),
                h('button', { 
                    style: { width: '100%', padding: '0.8rem', background: 'linear-gradient(135deg, #FCD34D, #F59E0B)', color: '#000', border: 'none', borderRadius: 'var(--r-md)', fontWeight: 800, fontSize: '1rem' },
                    disabled: processing,
                    onClick: () => handleMockPayment({ name: 'Monthly Plan', price: 99 })
                }, processing ? 'प्रोसेसिंग...' : '₹99 का भुगतान करें')
            )
        )
    );
}
