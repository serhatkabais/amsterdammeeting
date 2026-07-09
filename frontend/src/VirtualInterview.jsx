import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const API_BASE = 'http://localhost:8000/api';

export default function VirtualInterview({ companyId, companyName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentTranscript]);

  // Cleanup speech on unmount or company change
  useEffect(() => {
    return () => {
      synthRef.current?.cancel();
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch(e) {}
      }
    };
  }, [companyId]);

  // Reset chat on company change
  useEffect(() => {
    setMessages([]);
    setIsOpen(false);
    setCurrentTranscript('');
  }, [companyId]);

  const initRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please use Chrome or Edge.');
      return null;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;
    return recognition;
  };

  const startListening = () => {
    synthRef.current?.cancel(); // Stop any ongoing speech
    const recognition = initRecognition();
    if (!recognition) return;

    recognitionRef.current = recognition;
    setIsListening(true);
    setCurrentTranscript('');

    let finalTranscript = '';

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interim += transcript;
        }
      }
      setCurrentTranscript(finalTranscript + interim);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error !== 'aborted') {
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      // Don't restart - we handle this in stopListening
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const text = currentTranscript.trim();
    setCurrentTranscript('');

    if (text) {
      const userMsg = { role: 'user', content: text };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      sendToLLM(newMessages);
    }
  };

  const sendToLLM = async (chatHistory) => {
    setIsThinking(true);
    try {
      const res = await fetch(`${API_BASE}/chat/interview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_id: companyId,
          chat_history: chatHistory
        })
      });
      const data = await res.json();
      const aiReply = data.reply || 'Sorry, I could not process that.';
      
      setMessages(prev => [...prev, { role: 'ai', content: aiReply }]);
      speakText(aiReply);
    } catch (err) {
      console.error('Interview chat error:', err);
      setMessages(prev => [...prev, { role: 'ai', content: 'Connection error. Please try again.' }]);
    } finally {
      setIsThinking(false);
    }
  };

  const speakText = (text) => {
    synthRef.current?.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    // Try to find a natural English voice
    const voices = synthRef.current?.getVoices() || [];
    const englishVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) 
      || voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) utterance.voice = englishVoice;
    synthRef.current?.speak(utterance);
  };

  const handleToggle = () => {
    if (!isOpen) {
      // Opening: send initial greeting from company
      if (messages.length === 0) {
        const greeting = { role: 'ai', content: `Hi there! Thanks for reaching out. I'm from ${companyName}. How can I help you today?` };
        setMessages([greeting]);
        setTimeout(() => speakText(greeting.content), 300);
      }
    } else {
      synthRef.current?.cancel();
    }
    setIsOpen(!isOpen);
  };

  // Floating button (closed state)
  if (!isOpen) {
    return (
      <div
        onClick={handleToggle}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00CED1, #20B2AA)',
          border: '3px solid #000',
          boxShadow: '3px 3px 0px #000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9999,
          transition: 'transform 0.2s ease',
          fontSize: '1.6rem'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        title="Start Interview Simulation"
      >
        🎙️
      </div>
    );
  }

  // Expanded chat panel
  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '420px',
      maxHeight: '600px',
      borderRadius: '16px',
      border: '3px solid #000',
      boxShadow: '6px 6px 0px #000',
      backgroundColor: '#1A1816',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 9999,
      overflow: 'hidden',
      animation: 'slideUp 0.3s ease-out'
    }}>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: '1rem 1.25rem',
        background: 'linear-gradient(135deg, #00CED1, #20B2AA)',
        color: '#000',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '3px solid #000'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            backgroundColor: '#000', color: '#00CED1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', fontWeight: 'bold', border: '2px solid #000'
          }}>
            {companyName?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{companyName}</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Interview Simulation</div>
          </div>
        </div>
        <button
          onClick={handleToggle}
          style={{
            background: 'none', border: 'none', color: '#000',
            fontSize: '1.4rem', cursor: 'pointer', fontWeight: 'bold'
          }}
        >✕</button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxHeight: '380px',
        minHeight: '200px'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              maxWidth: '80%',
              padding: '0.65rem 0.9rem',
              borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              backgroundColor: msg.role === 'user' ? '#FFD700' : '#2A2826',
              color: msg.role === 'user' ? '#000' : '#e2e8f0',
              fontSize: '0.85rem',
              lineHeight: '1.4',
              border: msg.role === 'user' ? '2px solid #000' : '1px solid #3a3836',
              boxShadow: msg.role === 'user' ? '2px 2px 0px #000' : 'none'
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* Live transcript */}
        {isListening && currentTranscript && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              maxWidth: '80%', padding: '0.65rem 0.9rem',
              borderRadius: '12px 12px 2px 12px',
              backgroundColor: '#FFD70066', color: '#FFD700',
              fontSize: '0.85rem', lineHeight: '1.4',
              border: '2px dashed #FFD700',
              fontStyle: 'italic'
            }}>
              {currentTranscript}...
            </div>
          </div>
        )}

        {/* Thinking indicator */}
        {isThinking && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '0.65rem 0.9rem', borderRadius: '12px 12px 12px 2px',
              backgroundColor: '#2A2826', color: '#00CED1',
              fontSize: '0.85rem', border: '1px solid #3a3836',
              animation: 'pulse 1.5s infinite'
            }}>
              Thinking...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Push-to-Talk Control */}
      <div style={{
        padding: '0.75rem 1.25rem',
        borderTop: '2px solid #333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        backgroundColor: '#111'
      }}>
        <button
          onMouseDown={startListening}
          onMouseUp={stopListening}
          onMouseLeave={() => { if (isListening) stopListening(); }}
          onTouchStart={(e) => { e.preventDefault(); startListening(); }}
          onTouchEnd={(e) => { e.preventDefault(); stopListening(); }}
          disabled={isThinking}
          style={{
            flex: 1,
            padding: '0.9rem',
            borderRadius: '12px',
            border: isListening ? '3px solid #FF4444' : '3px solid #000',
            backgroundColor: isListening ? '#FF4444' : '#FFD700',
            color: '#000',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            cursor: isThinking ? 'not-allowed' : 'pointer',
            opacity: isThinking ? 0.5 : 1,
            boxShadow: isListening ? '0 0 20px rgba(255,68,68,0.4)' : '3px 3px 0px #000',
            transition: 'all 0.15s ease',
            fontFamily: "'Space Mono', monospace",
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          {isListening ? '🔴 LISTENING...' : isThinking ? '⏳ WAIT...' : '🎤 HOLD TO SPEAK'}
        </button>
      </div>
    </div>
  );
}
