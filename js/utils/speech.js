// ============================================
// SPEECH.JS – Web Speech API wrapper for Hindi TTS
// ============================================

export function speakHindi(text) {
    if (!window.speechSynthesis) {
        console.warn("Web Speech API not supported in this browser.");
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language to Hindi
    utterance.lang = 'hi-IN';
    
    // Adjust pitch and rate for a friendly, child-like tone
    utterance.pitch = 1.2;
    utterance.rate = 0.9;

    // Optional: try to find a native Hindi voice if available
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang === 'hi-IN' || v.lang === 'hi_IN');
    if (hindiVoice) {
        utterance.voice = hindiVoice;
    }

    window.speechSynthesis.speak(utterance);
}
