// ============================================
// APP.JS – Main React Application (No JSX – uses createElement)
// ============================================
import React from 'react';
import { createRoot } from 'react-dom/client';
import { getParent, getChildren, getActiveChild, setActiveChild, getProgress, getSettings } from './utils/storage.js';
import { SplashScreen } from './pages/SplashScreen.js';
import { LoginScreen } from './pages/LoginScreen.js';
import { ChildSelector } from './pages/ChildSelector.js';
import { HomeScreen } from './pages/HomeScreen.js';
import { GameScreen } from './pages/GameScreen.js';
import { ResultScreen } from './pages/ResultScreen.js';
import { ParentDashboard } from './pages/ParentDashboard.js';
import { SettingsPage } from './pages/SettingsPage.js';
import { BottomNav } from './components/BottomNav.js';

const h = React.createElement;

// Simple hash-based router
function useHashRouter() {
    const [route, setRouteState] = React.useState(window.location.hash.slice(1) || '/');
    const [params, setParams] = React.useState({});

    React.useEffect(() => {
        const onHash = () => {
            const hash = window.location.hash.slice(1) || '/';
            setRouteState(hash);
        };
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    const navigate = React.useCallback((path, navParams = {}) => {
        setParams(navParams);
        window.location.hash = path;
    }, []);

    return { route, navigate, params };
}

function App() {
    const { route, navigate, params } = useHashRouter();
    const [refreshKey, setRefreshKey] = React.useState(0);
    const refresh = () => setRefreshKey(k => k + 1);

    // Determine which page to show
    const parent = getParent();
    const children = getChildren();
    const activeChildId = getActiveChild();

    // Pages that don't show bottom nav
    const noNavPages = ['/', '/login', '/select-child', '/game', '/result'];
    const routeBase = route.split('/').slice(0, 2).join('/');
    const showNav = !noNavPages.some(p => {
        if (p === '/game') return route.startsWith('/game');
        if (p === '/result') return route.startsWith('/result');
        return route === p;
    });

    // Extract level ID from /game/3 etc
    const levelMatch = route.match(/^\/game\/(\d+)$/);
    const levelId = levelMatch ? parseInt(levelMatch[1]) : null;

    let page;
    switch (true) {
        case route === '/':
            page = h(SplashScreen, { navigate });
            break;
        case route === '/login':
            page = h(LoginScreen, { navigate, onLogin: refresh });
            break;
        case route === '/select-child':
            page = h(ChildSelector, { navigate, onSelect: refresh });
            break;
        case route === '/home':
            page = h(HomeScreen, { key: refreshKey, navigate, childId: activeChildId });
            break;
        case route.startsWith('/game/') && levelId:
            page = h(GameScreen, { key: 'game-' + levelId, navigate, levelId, childId: activeChildId });
            break;
        case route === '/result':
            page = h(ResultScreen, { navigate, childId: activeChildId, ...params });
            break;
        case route === '/parent':
            page = h(ParentDashboard, { key: refreshKey, navigate });
            break;
        case route === '/settings':
            page = h(SettingsPage, { navigate, onClear: refresh });
            break;
        default:
            page = h(SplashScreen, { navigate });
    }

    return h('div', { id: 'app-shell', style: { display: 'flex', flexDirection: 'column', minHeight: '100vh' } },
        page,
        showNav && h(BottomNav, { route, navigate })
    );
}

// Mount
const root = createRoot(document.getElementById('root'));
root.render(h(App));
