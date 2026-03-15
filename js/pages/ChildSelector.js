// ChildSelector Component
import React from 'react';
import { getChildren, addChild, setActiveChild } from '../utils/storage.js';
const h = React.createElement;

const AVATARS = ['🧒', '👧', '👦', '👶', '🧒🏽', '👧🏽'];

export function ChildSelector({ navigate, onSelect }) {
    const [children, setChildren] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [childName, setChildName] = React.useState('');
    const [childClass, setChildClass] = React.useState('1');

    React.useEffect(() => {
        let mounted = true;
        getChildren().then(res => {
            if (mounted) setChildren(res);
        });
        return () => { mounted = false; };
    }, []);

    const handleSelect = async (childId) => {
        await setActiveChild(childId);
        onSelect();
        navigate('/home');
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!childName.trim() || !children) return;
        const avatar = AVATARS[children.length % AVATARS.length];
        const child = await addChild({ name: childName.trim(), class: childClass, avatar });
        
        const updated = await getChildren();
        setChildren(updated);
        setChildName('');
        setShowModal(false);
        await handleSelect(child.id);
    };

    if (children === null) {
        return h('div', { className: 'empty-state page-no-nav' },
            h('div', { className: 'spinner', style: { margin: '0 auto' } })
        );
    }

    return h('div', { className: 'child-selector page-no-nav' },
        h('div', { className: 'child-selector-header' },
            h('h2', null, '👧 बच्चा चुनें'),
            h('p', null, 'कौन पढ़ेगा आज?')
        ),

        h('div', { className: 'child-grid' },
            children.map(child =>
                h('div', {
                    key: child.id,
                    className: 'child-card',
                    onClick: () => handleSelect(child.id),
                },
                    h('div', { className: 'child-avatar' }, child.avatar),
                    h('div', { className: 'child-name' }, child.name),
                    h('div', { className: 'child-class' }, 'कक्षा ' + child.class)
                )
            ),

            h('div', {
                className: 'child-card add-child-card',
                onClick: () => setShowModal(true),
            },
                h('div', { className: 'child-avatar' }, '➕'),
                h('div', { className: 'child-name', style: { color: 'var(--text-muted)' } }, 'नया बच्चा')
            )
        ),

        // Modal
        showModal && h('div', { className: 'modal-overlay', onClick: () => setShowModal(false) },
            h('form', {
                className: 'modal-content',
                onClick: (e) => e.stopPropagation(),
                onSubmit: handleAdd,
            },
                h('h3', { className: 'modal-title' }, '✏️ नया बच्चा जोड़ें'),

                h('div', { className: 'form-group' },
                    h('label', { className: 'form-label' }, 'बच्चे का नाम'),
                    h('input', {
                        className: 'form-input',
                        type: 'text',
                        placeholder: 'जैसे: रानी',
                        value: childName,
                        onChange: (e) => setChildName(e.target.value),
                        autoFocus: true,
                    })
                ),

                h('div', { className: 'form-group' },
                    h('label', { className: 'form-label' }, 'कक्षा'),
                    h('select', {
                        className: 'form-input',
                        value: childClass,
                        onChange: (e) => setChildClass(e.target.value),
                    },
                        h('option', { value: '1' }, 'कक्षा 1'),
                        h('option', { value: '2' }, 'कक्षा 2'),
                        h('option', { value: '3' }, 'कक्षा 3'),
                    )
                ),

                h('div', { className: 'modal-actions' },
                    h('button', { type: 'button', className: 'btn-secondary', onClick: () => setShowModal(false) }, 'रद्द करें'),
                    h('button', { type: 'submit', className: 'btn-primary', disabled: !childName.trim(), style: { flex: 1 } }, 'जोड़ें'),
                )
            )
        )
    );
}
