// LoginScreen Component
import React from 'react';
import { saveParent } from '../utils/storage.js';
const h = React.createElement;

export function LoginScreen({ navigate, onLogin }) {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [step, setStep] = React.useState('phone'); // 'phone' | 'otp'
    const [otp, setOtp] = React.useState('');
    const [verifying, setVerifying] = React.useState(false);

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || phone.length < 10) return;
        setStep('otp');
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (otp.length !== 4) return;
        
        setVerifying(true);
        // Mock network delay
        await new Promise(r => setTimeout(r, 1000));
        
        await saveParent({ name: name.trim(), phone: phone.trim(), createdAt: new Date().toISOString() });
        setVerifying(false);
        onLogin();
        navigate('/select-child');
    };

    return h('div', { className: 'login page-no-nav' },
        h('form', { className: 'login-card', onSubmit: step === 'phone' ? handlePhoneSubmit : handleOtpSubmit },
            h('div', { className: 'login-icon' }, step === 'phone' ? '👋' : '🔐'),
            h('h2', { className: 'login-title' }, step === 'phone' ? 'नमस्ते!' : 'OTP दर्ज करें'),
            h('p', { className: 'login-desc' }, 
                step === 'phone' ? 'अपना नाम और मोबाइल नंबर डालें' : `हमनें ${phone} पर 4-अंकों का OTP भेजा है (MOCK: type any 4 digits)`
            ),

            step === 'phone' && h(React.Fragment, null,
                h('div', { className: 'form-group' },
                    h('label', { className: 'form-label' }, 'आपका नाम'),
                    h('input', {
                        className: 'form-input',
                        type: 'text',
                        placeholder: 'जैसे: राम कुमार',
                        value: name,
                        onChange: (e) => setName(e.target.value),
                        autoComplete: 'name',
                    })
                ),

                h('div', { className: 'form-group' },
                    h('label', { className: 'form-label' }, 'मोबाइल नंबर'),
                    h('input', {
                        className: 'form-input',
                        type: 'tel',
                        placeholder: '9876543210',
                        value: phone,
                        onChange: (e) => setPhone(e.target.value.replace(/\\D/g, '').slice(0, 10)),
                        autoComplete: 'tel',
                    })
                )
            ),

            step === 'otp' && h('div', { className: 'form-group' },
                h('label', { className: 'form-label', style: { textAlign: 'center' } }, 'OTP (4 अंक)'),
                h('input', {
                    className: 'form-input',
                    type: 'tel',
                    placeholder: '1234',
                    value: otp,
                    style: { textAlign: 'center', letterSpacing: '8px', fontSize: '1.5rem' },
                    onChange: (e) => setOtp(e.target.value.replace(/\\D/g, '').slice(0, 4)),
                    autoFocus: true,
                })
            ),

            h('button', {
                className: 'btn-primary',
                type: 'submit',
                disabled: step === 'phone' ? (!name.trim() || phone.length < 10) : (otp.length !== 4 || verifying),
            }, verifying ? 'वेरीफाई हो रहा है...' : (step === 'phone' ? 'OTP भेजें →' : 'वेरीफाई करें ✅')),

            step === 'otp' && h('button', {
                type: 'button',
                className: 'btn-secondary',
                style: { width: '100%', marginTop: '1rem', background: 'transparent', border: 'none', color: 'var(--primary-light)' },
                onClick: () => { setStep('phone'); setOtp(''); }
            }, '← नंबर बदलें')
        )
    );
}
