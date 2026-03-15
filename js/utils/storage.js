// ============================================
// STORAGE.JS – localforage (IndexedDB) helpers
// ============================================

const KEYS = {
    PARENT: 'shikshakhel_parent',
    CHILDREN: 'shikshakhel_children',
    ACTIVE_CHILD: 'shikshakhel_active_child',
    PROGRESS: 'shikshakhel_progress',
    SETTINGS: 'shikshakhel_settings',
};

// --- Helpers ---
async function get(key, defaultValue = null) {
    try {
        const val = await localforage.getItem(key);
        return val !== null ? val : defaultValue;
    } catch (e) {
        console.error("localforage get error:", e);
        return defaultValue;
    }
}

async function set(key, value) {
    try {
        await localforage.setItem(key, value);
    } catch (e) {
        console.error("localforage set error:", e);
    }
}

// --- Parent ---
export async function getParent() { return get(KEYS.PARENT); }
export async function saveParent(data) { await set(KEYS.PARENT, data); }

// --- Children ---
export async function getChildren() { return get(KEYS.CHILDREN, []); }
export async function saveChildren(children) { await set(KEYS.CHILDREN, children); }

export async function addChild(child) {
    const children = await getChildren();
    child.id = Date.now().toString(36);
    children.push(child);
    await saveChildren(children);
    return child;
}

// --- Active Child ---
export async function getActiveChild() { return get(KEYS.ACTIVE_CHILD); }
export async function setActiveChild(childId) { await set(KEYS.ACTIVE_CHILD, childId); }

// --- Progress (per child) ---
function progressKey(childId) { return KEYS.PROGRESS + '_' + childId; }

export async function getProgress(childId) {
    const defaultProgress = {
        completedLevels: {},
        totalStars: 0,
        totalXP: 0,
        streak: 0,
        lastPlayedDate: null,
        badges: [],
        totalTimePlayed: 0,
        dailyCompleted: 0,
    };
    return get(progressKey(childId), defaultProgress);
}

export async function saveProgress(childId, progress) {
    await set(progressKey(childId), progress);
}

export async function completeLevel(childId, levelId, stars, timeSec) {
    const progress = await getProgress(childId);
    const prevStars = progress.completedLevels[levelId]?.stars || 0;

    progress.completedLevels[levelId] = {
        stars: Math.max(prevStars, stars),
        completedAt: new Date().toISOString(),
    };

    // Update totals
    const addedStars = Math.max(0, stars - prevStars);
    progress.totalStars += addedStars;
    progress.totalXP += stars * 10 + 5;
    progress.totalTimePlayed += timeSec;
    progress.dailyCompleted += 1;

    // Update streak
    const today = new Date().toDateString();
    if (progress.lastPlayedDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (progress.lastPlayedDate === yesterday) {
            progress.streak += 1;
        } else if (progress.lastPlayedDate !== today) {
            progress.streak = 1;
        }
        progress.lastPlayedDate = today;
    }

    // Badge logic
    const badges = progress.badges;
    const existingBadgesLength = badges.length;

    if (progress.streak >= 3 && !badges.includes('streak_3')) badges.push('streak_3');
    if (progress.streak >= 7 && !badges.includes('streak_7')) badges.push('streak_7');
    if (progress.totalStars >= 10 && !badges.includes('star_10')) badges.push('star_10');
    if (progress.totalStars >= 30 && !badges.includes('star_30')) badges.push('star_30');
    if (Object.keys(progress.completedLevels).length >= 5 && !badges.includes('level_5')) badges.push('level_5');
    if (Object.keys(progress.completedLevels).length >= 15 && !badges.includes('level_all')) badges.push('level_all');

    // Get newly earned badge
    const newBadge = badges.length > existingBadgesLength ? badges[badges.length - 1] : null;

    await saveProgress(childId, progress);
    return { progress, newBadge, addedStars };
}

// --- Settings ---
export async function getSettings() {
    return get(KEYS.SETTINGS, { soundOn: true, language: 'hi' });
}

export async function saveSettings(settings) { await set(KEYS.SETTINGS, settings); }

// --- Clear all ---
export async function clearAllData() {
    try {
        const keys = await localforage.keys();
        for (const key of keys) {
            if (Object.values(KEYS).includes(key) || key.startsWith(KEYS.PROGRESS)) {
                await localforage.removeItem(key);
            }
        }
    } catch (e) {
        console.error("Error clearing localforage:", e);
    }
}

// --- Badges metadata ---
export const BADGES = {
    streak_3: { icon: '🔥', name: '3 दिन स्ट्रीक', nameEn: '3-Day Streak' },
    streak_7: { icon: '💎', name: '7 दिन स्ट्रीक', nameEn: '7-Day Streak' },
    star_10: { icon: '⭐', name: '10 तारे', nameEn: '10 Stars' },
    star_30: { icon: '🌟', name: '30 तारे', nameEn: '30 Stars' },
    level_5: { icon: '🏅', name: '5 लेवल पूरे', nameEn: '5 Levels Done' },
    level_all: { icon: '🏆', name: 'सब लेवल पूरे!', nameEn: 'All Levels!' },
};
