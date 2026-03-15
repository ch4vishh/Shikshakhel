// LoginScreen Component
import React from 'react';
import { saveParent } from '../utils/storage.js';
const h = React.createElement;

export function LoginScreen({ navigate, onLogin }) {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !phone.trim()) return;
        saveParent({ name: name.trim(), phone: phone.trim(), createdAt: new Date().toISOString() });
        onLogin();
        navigate('/select-child');
    };

    return h('div', { className: 'login page-no-nav' },
        h('form', { className: 'login-card', onSubmit: handleSubmit },
            h('div', { className: 'login-icon' }, '👋'),
            h('h2', { className: 'login-title' }, 'नमस्ते!'),
            h('p', { className: 'login-desc' }, 'अपना नाम और मोबाइल नंबर डालें'),

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
                    onChange: (e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)),
                    autoComplete: 'tel',
                })
            ),

            h('button', {
                className: 'btn-primary',
                type: 'submit',
                disabled: !name.trim() || phone.length < 10,
            }, 'शुरू करें →')
        )
    );
}
