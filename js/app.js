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

// ---- Error Boundary ----
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        console.error('Shikshakhel Error:', error, info);
    }
    render() {
        if (this.state.hasError) {
            return h('div', {
                style: {
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: '2rem', textAlign: 'center',
                    background: '#0F0A1E', color: '#F8F5FF',
                    fontFamily: "'Baloo 2', sans-serif",
                }
            },
                h('div', { style: { fontSize: '3rem', marginBottom: '1rem' } }, '😵'),
                h('h2', { style: { marginBottom: '0.5rem' } }, 'कुछ गड़बड़ हो गई!'),
                h('p', { style: { fontSize: '0.85rem', color: '#B8A9D4', marginBottom: '1rem' } },
                    String(this.state.error)),
                h('button', {
                    onClick: () => {
                        this.setState({ hasError: false, error: null });
                        window.location.hash = '/home';
                    },
                    style: {
                        padding: '0.8rem 1.5rem', background: '#6C3CE1',
                        border: 'none', borderRadius: '12px', color: 'white',
                        fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                    }
                }, '🏠 होम जाओ')
            );
        }
        return this.props.children;
    }
}

// Simple hash-based router
function useHashRouter() {
    const [route, setRouteState] = React.useState(window.location.hash.slice(1) || '/');
    const paramsRef = React.useRef({});

    React.useEffect(() => {
        const onHash = () => {
            const hash = window.location.hash.slice(1) || '/';
            setRouteState(hash);
        };
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    const navigate = React.useCallback((path, navParams = {}) => {
        paramsRef.current = navParams;
        window.location.hash = path;
    }, []);

    return { route, navigate, params: paramsRef.current };
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
    const showNav = !(
        route === '/' ||
        route === '/login' ||
        route === '/select-child' ||
        route.startsWith('/game') ||
        route === '/result'
    );

    // Extract level ID from /game/3 etc
    const levelMatch = route.match(/^\/game\/(\d+)$/);
    const levelId = levelMatch ? parseInt(levelMatch[1]) : null;

    let page;
    if (route === '/') {
        page = h(SplashScreen, { navigate });
    } else if (route === '/login') {
        page = h(LoginScreen, { navigate, onLogin: refresh });
    } else if (route === '/select-child') {
        page = h(ChildSelector, { navigate, onSelect: refresh });
    } else if (route === '/home') {
        page = h(HomeScreen, { key: refreshKey, navigate, childId: activeChildId });
    } else if (levelId !== null) {
        page = h(GameScreen, { key: 'game-' + levelId, navigate, levelId, childId: activeChildId });
    } else if (route === '/result') {
        page = h(ResultScreen, { navigate, childId: activeChildId, ...params });
    } else if (route === '/parent') {
        page = h(ParentDashboard, { key: refreshKey, navigate });
    } else if (route === '/settings') {
        page = h(SettingsPage, { navigate, onClear: refresh });
    } else {
        page = h(SplashScreen, { navigate });
    }

    return h('div', { id: 'app-shell', style: { display: 'flex', flexDirection: 'column', minHeight: '100vh' } },
        h(ErrorBoundary, { key: route },
            page
        ),
        showNav && h(BottomNav, { route, navigate })
    );
}

// Mount
const root = createRoot(document.getElementById('root'));
root.render(h(App));
