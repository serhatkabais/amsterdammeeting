import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import html2pdf from 'html2pdf.js';
import VirtualInterview from './VirtualInterview';
import './App.css';

// SVG Decorative Icons with a Groovy '68 Vibe
const PeaceIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v20" />
    <path d="M12 12l7 7" />
    <path d="M12 12L5 19" />
  </svg>
);

const FlowerIcon = ({ size = 32, color = "var(--accent-yellow)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="var(--border-color)" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" fill="#000" />
    <circle cx="12" cy="5" r="3.5" />
    <circle cx="12" cy="19" r="3.5" />
    <circle cx="5" cy="12" r="3.5" />
    <circle cx="19" cy="12" r="3.5" />
    <circle cx="7" cy="7" r="3.5" />
    <circle cx="17" cy="17" r="3.5" />
    <circle cx="7" cy="17" r="3.5" />
    <circle cx="17" cy="7" r="3.5" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ExternalLink = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const SparklesIcon = ({ size = 20, color = "var(--accent-yellow)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="var(--border-color)" strokeWidth="1.5">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
  </svg>
);

// Translation Dictionary
const translations = {
  tr: {
    title: "EDTECH RADAR NL",
    subtitle: "Serhat Kabaiş & Duygu Gezer İletişim Portalı | Otonom Tarayıcı & LLM Mektup Üreticisi",
    tabCompanies: "Firmalar",
    tabRag: "RAG Bilgi Deposu",
    searchPlaceholder: "Firma veya odak alanı ara...",
    headerTitle: "Hollandalı EdTech Ortak Adayları",
    all: "Tümü",

    contactedBtn: "✔️ İletişime Geçildi",
    markContactedBtn: "İletişimi İşaretle",
    cityFilter: "Şehir:",
    targetFilter: "Kime Uygun:",
    targetSerhat: "🧑 Serhat",
    targetDuygu: "👩 Duygu",
    targetBoth: "🤝 İkisi de",
    targetNara: "🌐 Nara XR",

    categoryFilter: "Kategori:",
    webSiteBtn: "Web Sitesi",
    whyRecHeader: "Neden Tavsiye Ediyoruz?",
    backBtn: "Geri Dön",

    emailInfo: "RAG veri tabanındaki profillerinizi ve şirketin taranan site içeriğini harmanlayarak, abartıdan uzak, gerçekçi ve samimi B1-B2 seviyesinde bir İngilizce görüşme talebi mektubu oluşturun.",
    generateEmailBtn: "Görüşme Talebi Mektubu Üret (AI)",
    strategyHeader: "Şirkete Özel Görüşme & Hazırlık Stratejisi (Türkçe)",
    
    ragTitle: "RAG Bilgi Deposu Yönetimi",
    ragInfo: "Aşağıdaki alanlar yapay zekaya (LLM) mektup oluştururken besleneceği kişisel profillerinizi ve Hollanda seyahat hedeflerini içerir.",
    serhatRagHeader: "Serhat Kabaiş Profil Verileri",
    duyguRagHeader: "Duygu Gezer Profil Verileri",
    netherlandsGoalsHeader: "Hollanda Seyahati & İş Birliği Hedefleri",
    saveRagBtn: "Değişiklikleri RAG'e Kaydet",
    nameTitle: "İsim & Ünvan",
    educationTitle: "Eğitim Durumu",
    websiteTitle: "Kişisel Web Sitesi",
    pedagogyTitle: "Eğitim Metodolojisi & Yaklaşımı",
    anthroTitle: "Dijital Antropoloji & Etnografi Görüşü",
    tubitakTitle: "TÜBİTAK 4009 & Atölye Detayları",
    experienceTitle: "Profesyonel Deneyim Özet",
    booksTitle: "Öne Çıkan Kitaplar / Seriler",
    goalsTitle: "Gelecek Planı (Taşınma & Oturum Hedefi)",
    purposeTitle: "Seyahat & Piyasa Araştırması Amacı",
    offeringsTitle: "Sunulan İş Birliği Modelleri & Ürünler",
    crawlingText: "Web sitesi taranıyor ve analiz ediliyor...",
    noCrawledText: "Firma sitesinden veri alınamadı.",
    webScraperHeader: "Otonom Web Tarayıcı",
    refreshScrape: "Yeniden Tara",

    corrHeader: "📬 İletişim Geçmişi",
    corrSentLabel: "Gönderilen Mail",
    corrReceivedLabel: "Alınan Cevap",
    corrAddSent: "Gönderilen Mail Ekle",
    corrAddReceived: "Alınan Cevap Ekle",
    corrDateLabel: "Tarih",
    corrContentPlaceholder: "Mail içeriğini buraya yapıştırın...",
    corrSaveBtn: "Kaydet",
    corrCancelBtn: "İptal",
    corrEmpty: "Henüz iletişim kaydı yok. İlk mailinizi ekleyin.",
    corrDeleteConfirm: "Bu mesajı silmek istediğinize emin misiniz?",

    analysisHeader: "📊 Durum Analizi",
    analysisBtn: "Yazışmaları Analiz Et (AI)",
    analysisEmpty: "Analiz için önce İletişim Geçmişine en az bir mesaj ekleyin.",
    analysisLoading: "Yapay zeka yazışmaları analiz ediyor...",

    notesHeader: "🎙️ Şirketle İlgili Notlarım",
    notesStartRec: "Kayıt Başlat",
    notesStopRec: "Kaydı Durdur",
    notesRecording: "Dinliyorum...",
    notesFormatBtn: "LLM ile Düzenle",
    notesSaveBtn: "Notu Kaydet",
    notesFormatting: "Not düzenleniyor...",
    notesEmpty: "Henüz not yok. Mikrofon butonuna tıklayarak ses kaydı yapın.",
    notesTranscriptLabel: "Ham Transkript",
    notesFormattedLabel: "Düzenlenmiş Not"
  },
  en: {
    title: "EDTECH RADAR NL",
    subtitle: "Serhat Kabaiş & Duygu Gezer Outreach Portal | Autonomous Scraper & LLM Generator",
    tabCompanies: "Companies",
    tabRag: "RAG Knowledge Base",
    searchPlaceholder: "Search company or focus area...",
    headerTitle: "Dutch EdTech Partner Candidates",
    all: "All",

    contactedBtn: "✔️ Contacted",
    markContactedBtn: "Mark Contacted",
    cityFilter: "City:",
    targetFilter: "Target:",
    targetSerhat: "🧑 Serhat",
    targetDuygu: "👩 Duygu",
    targetBoth: "🤝 Both",
    targetNara: "🌐 Nara XR",

    categoryFilter: "Category:",
    webSiteBtn: "Website",
    whyRecHeader: "Why Recommended?",
    backBtn: "Go Back",

    emailInfo: "Generate an outreach email integrating the RAG profile data and the crawled company content.",
    generateEmailBtn: "Generate Outreach Email (AI)",
    strategyHeader: "Company Specific Strategy (Turkish)",

    ragTitle: "RAG Knowledge Base Management",
    ragInfo: "These fields contain profiles and Netherlands visit goals used by the AI to customize the emails.",
    serhatRagHeader: "Serhat Kabaiş Profile Data",
    duyguRagHeader: "Duygu Gezer Profile Data",
    netherlandsGoalsHeader: "Netherlands Visit & Collaboration Goals",
    saveRagBtn: "Save RAG Updates",
    nameTitle: "Name & Title",
    educationTitle: "Education",
    websiteTitle: "Personal Website",
    pedagogyTitle: "Pedagogical Philosophy",
    anthroTitle: "Digital Anthropology Vision",
    tubitakTitle: "TUBITAK 4009 Details",
    experienceTitle: "Professional Experience",
    booksTitle: "Published Books / Series",
    goalsTitle: "Future Goals (Relocation etc.)",
    purposeTitle: "Purpose of Visit",
    offeringsTitle: "Collaboration Offerings",
    crawlingText: "Crawling and analyzing website...",
    noCrawledText: "Could not fetch data from company website.",
    webScraperHeader: "Autonomous Web Scraper",
    refreshScrape: "Refresh Scrape",

    corrHeader: "📬 Communication History",
    corrSentLabel: "Sent Email",
    corrReceivedLabel: "Received Reply",
    corrAddSent: "Add Sent Email",
    corrAddReceived: "Add Received Reply",
    corrDateLabel: "Date",
    corrContentPlaceholder: "Paste the email content here...",
    corrSaveBtn: "Save",
    corrCancelBtn: "Cancel",
    corrEmpty: "No communication records yet. Add your first email.",
    corrDeleteConfirm: "Are you sure you want to delete this message?",

    analysisHeader: "📊 Status Analysis",
    analysisBtn: "Analyze Correspondence (AI)",
    analysisEmpty: "Add at least one message to Communication History first.",
    analysisLoading: "AI is analyzing the correspondence...",

    notesHeader: "🎙️ My Notes About This Company",
    notesStartRec: "Start Recording",
    notesStopRec: "Stop Recording",
    notesRecording: "Listening...",
    notesFormatBtn: "Format with LLM",
    notesSaveBtn: "Save Note",
    notesFormatting: "Formatting note...",
    notesEmpty: "No notes yet. Click the microphone button to record.",
    notesTranscriptLabel: "Raw Transcript",
    notesFormattedLabel: "Formatted Note"
  }
};


// Dynamic Company Logo Component with Clearbit -> Google Favicon -> Initial Fallbacks
const CompanyLogo = ({ domain, name, size = 56 }) => {
  const cleanDomain = domain ? domain.replace('https://', '').replace('http://', '').split('/')[0] : '';
  const [imgUrl, setImgUrl] = useState(`https://logo.clearbit.com/${cleanDomain}`);
  const [fallbackMode, setFallbackMode] = useState(0); // 0: clearbit, 1: google favicon, 2: retro initials

  // Re-evaluate if domain changes
  useEffect(() => {
    const freshDomain = domain ? domain.replace('https://', '').replace('http://', '').split('/')[0] : '';
    setImgUrl(`https://logo.clearbit.com/${freshDomain}`);
    setFallbackMode(0);
  }, [domain]);

  const handleImageError = () => {
    if (fallbackMode === 0) {
      // Fallback 1: Google Favicon (high-res fallback)
      setImgUrl(`https://www.google.com/s2/favicons?sz=128&domain=${cleanDomain}`);
      setFallbackMode(1);
    } else if (fallbackMode === 1) {
      // Fallback 2: Custom Retro initials circle
      setFallbackMode(2);
    }
  };

  if (fallbackMode === 2 || !cleanDomain) {
    const firstLetter = name ? name.charAt(0).toUpperCase() : 'E';
    const bgColors = ['var(--accent-yellow)', 'var(--accent-orange)', 'var(--accent-teal)', 'var(--accent-purple)', 'var(--accent-sage)'];
    const hash = name ? name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
    const bgColor = bgColors[hash % bgColors.length];

    return (
      <div style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: bgColor,
        border: '3px solid var(--border-color)',
        boxShadow: '3px 3px 0px #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        fontWeight: 'bold',
        fontSize: `${size * 0.45}px`,
        fontFamily: 'Plus Jakarta Sans, sans-serif'
      }}>
        {firstLetter}
      </div>
    );
  }

  return (
    <img 
      src={imgUrl} 
      alt={`${name} Logo`} 
      onError={handleImageError}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '16px',
        objectFit: 'contain',
        backgroundColor: '#FFF', // White padding so logos pop on dark bg
        padding: '6px',
        border: '3px solid var(--border-color)',
        boxShadow: '3px 3px 0px #000'
      }}
    />
  );
};

function App() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [currentTab, setCurrentTab] = useState('companies'); // 'companies' or 'rag'
  const [ragProfile, setRagProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lang, setLang] = useState('tr'); // 'tr' or 'en'

  const [contactedIds, setContactedIds] = useState([]);
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedTarget, setSelectedTarget] = useState('All');


  
  // RAG Editor State
  const [ragEditData, setRagEditData] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  // Email Generator State
  const [emailLoading, setEmailLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [customEmailNotes, setCustomEmailNotes] = useState('');

  // Strategy Generator State
  const [preGeneratedReports, setPreGeneratedReports] = useState({});

  // Crawler State
  const [crawlStats, setCrawlStats] = useState(null);
  const [crawlerLoading, setCrawlerLoading] = useState(false);

  // Correspondence State
  const [correspondence, setCorrespondence] = useState({ messages: [], analysis: '', notes: [] });
  const [showMessageForm, setShowMessageForm] = useState(null); // null | 'sent' | 'received'
  const [newMessageContent, setNewMessageContent] = useState('');
  const [newMessageDate, setNewMessageDate] = useState(new Date().toISOString().split('T')[0]);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  // Voice Notes State
  const [isRecording, setIsRecording] = useState(false);
  const [rawTranscript, setRawTranscript] = useState('');
  const [formattedNote, setFormattedNote] = useState('');
  const [voiceNoteLoading, setVoiceNoteLoading] = useState(false);
  const [recognitionRef] = useState({ current: null });


  const t = translations[lang];

  const getTargetUI = (targetValue) => {
    if (targetValue === 'Duygu') return { text: t.targetDuygu, color: '#f8c291' }; // Pastel Orange
    if (targetValue === 'Serhat') return { text: t.targetSerhat, color: '#82ccdd' }; // Pastel Blue
    if (targetValue === 'Both') return { text: t.targetBoth, color: '#b8e994' }; // Pastel Green
    if (targetValue === 'Nara XR') return { text: t.targetNara, color: '#2ed573' }; // Fresh Green
    return { text: targetValue, color: '#f1f2f6' };
  };


  // Category mapping helper
  const categories = ['All', 'AI & Pedagogy', 'STEAM & Immersive Tech', 'Language & Storytelling', 'Ecosystem Leaders'];

  const getCompanyCategory = (id) => {
    const aiIds = ['nolai_lab', 'classroomscreen', 'wizenoze_corp', 'revisely', 'studygo', 'mr_chadd', 'nextgen_ai', 'chatlicense', 'mediawegwijs'];
    const steamIds = ['springlab', 'bodyscratch', 'classigogo', 'futuremindz', 'cma_science', 'changefied', 'warp_vr', 'bomberbot', 'atermon', 'ijsfontein', 'edumersive', 'prowise', 'snappet'];
    const langIds = ['mytoori', 'greenscreenbox', 'taaly', 'lingo_llama', 'bookabooka', 'jungle_the_bungle', 'ludooka', 'booqio', 'letterschool', 'squla', 'kidskonnect'];
    const ecoIds = ['feedbackfruits', 'itorium', 'iamprogrez', 'zwijsen', 'malmberg', 'heutink'];

    if (aiIds.includes(id)) return 'AI & Pedagogy';
    if (steamIds.includes(id)) return 'STEAM & Immersive Tech';
    if (langIds.includes(id)) return 'Language & Storytelling';
    if (ecoIds.includes(id)) return 'Ecosystem Leaders';
    return 'Other';
  };

  // Dynamic API base resolution to prevent host mismatch/CORS issues on Windows
  const API_BASE = window.location.port === '5173' 
    ? 'http://127.0.0.1:8000/api' 
    : '/api';

  
  // Load pre-generated reports
  useEffect(() => {
    fetch(`${API_BASE}/strategy/reports`)
      .then(res => res.json())
      .then(data => setPreGeneratedReports(data))
      .catch(err => console.error(err));
  }, []);

  // Load tracker
  useEffect(() => {
    fetch(`${API_BASE}/tracker`)
      .then(res => {
        if (!res.ok) return {};
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data.contacted)) {
          setContactedIds(data.contacted);
        }
      })
      .catch(err => console.error("Error loading tracker:", err));
  }, []);

  const toggleContacted = (id, e) => {
    if(e) e.stopPropagation();
    const isContacted = contactedIds.includes(id);
    const newState = !isContacted;
    
    // Optimistic UI update
    setContactedIds(prev => newState ? [...prev, id] : prev.filter(cId => cId !== id));

    fetch(`${API_BASE}/tracker`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company_id: id, contacted: newState })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success' && data.contacted) {
        setContactedIds(data.contacted);
      }
    })
    .catch(err => console.error(err));
  };

  // Load companies safely
  useEffect(() => {
    fetch(`${API_BASE}/companies`)
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setCompanies(data);
        } else {
          console.error("Expected array but got:", data);
        }
      })
      .catch(err => console.error("Error loading companies:", err));
  }, []);

  // Load RAG profile safely
  useEffect(() => {
    fetch(`${API_BASE}/rag/profile`)
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => {
        if (data && typeof data === 'object' && !data.detail) {
          setRagProfile(data);
          setRagEditData(data);
        }
      })
      .catch(err => console.error("Error loading RAG profile:", err));
  }, []);

  // Load website crawler stats and correspondence when selected company changes
  useEffect(() => {
    setCustomEmailNotes('');
    if (selectedCompanyId) {
      const company = companies.find(c => c.id === selectedCompanyId);
      if (company && company.website) {
        setCrawlerLoading(true);
        fetch(`${API_BASE}/crawler/fetch?company_id=${company.id}&url=${encodeURIComponent(company.website)}`)
          .then(res => res.json())
          .then(data => {
            setCrawlStats(data);
            setCrawlerLoading(false);
          })
          .catch(err => {
            console.error("Error loading crawler stats:", err);
            setCrawlerLoading(false);
          });
      }

      // Fetch correspondence
      fetch(`${API_BASE}/correspondence/${selectedCompanyId}`)
        .then(res => {
          if (!res.ok) throw new Error("API error");
          return res.json();
        })
        .then(data => {
          if (data) {
            setCorrespondence(data);
          }
        })
        .catch(err => {
          console.error("Error loading correspondence:", err);
          setCorrespondence({ messages: [], analysis: '', notes: [] });
        });
    } else {
      setCrawlStats(null);
      setGeneratedEmail('');
      setCorrespondence({ messages: [], analysis: '', notes: [] });
    }
  }, [selectedCompanyId, companies]);

  // Handle RAG Profile Save
  const handleSaveRag = (e) => {
    e.preventDefault();
    setSaveStatus(t.saving);
    fetch(`${API_BASE}/rag/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ragEditData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setRagProfile(ragEditData);
          setSaveStatus(t.saveSuccess);
          setTimeout(() => setSaveStatus(''), 3000);
        } else {
          setSaveStatus(t.saveError);
        }
      })
      .catch(err => {
        console.error(err);
        setSaveStatus(t.serverError);
      });
  };

  // Refresh Scraper
  const handleRefreshScrape = () => {
    if (!selectedCompanyId) return;
    const company = companies.find(c => c.id === selectedCompanyId);
    if (!company || !company.website) return;
    setCrawlerLoading(true);
    fetch(`${API_BASE}/crawler/fetch?company_id=${company.id}&url=${encodeURIComponent(company.website)}&force_refresh=true`)
      .then(res => res.json())
      .then(data => {
        setCrawlStats(data);
        setCrawlerLoading(false);
      })
      .catch(err => {
        console.error("Error refreshing crawler stats:", err);
        setCrawlerLoading(false);
      });
  };

  // Generate Outreach Email
  const handleGenerateEmail = (forceScrape = false) => {
    setEmailLoading(true);
    setGeneratedEmail('');
    fetch(`${API_BASE}/email/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company_id: selectedCompanyId,
        force_refresh: forceScrape,
        custom_notes: customEmailNotes
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.email_content) {
          setGeneratedEmail(data.email_content);
        } else {
          setGeneratedEmail("Failed to generate email.");
        }
        setEmailLoading(false);
      })
      .catch(err => {
        console.error(err);
        setGeneratedEmail("Error: Request failed.");
        setEmailLoading(false);
      });
  };

  // Download PDF
  const handleDownloadPdf = (companyName) => {
    const element = document.getElementById('strategy-report-content');
    if (!element) return;
    
    const opt = {
      margin:       [10, 10, 10, 10],
      filename:     `${companyName}_Gorusme_Stratejisi.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Save a new correspondence message (sent or received)
  const handleSaveMessage = (e) => {
    e.preventDefault();
    if (!newMessageContent.trim() || !selectedCompanyId || !showMessageForm) return;

    fetch(`${API_BASE}/correspondence/${selectedCompanyId}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: showMessageForm,
        content: newMessageContent,
        date: newMessageDate
      })
    })
      .then(res => res.json())
      .then(newMsg => {
        setCorrespondence(prev => ({
          ...prev,
          messages: [...(prev.messages || []), newMsg]
        }));
        setNewMessageContent('');
        setShowMessageForm(null);
      })
      .catch(err => console.error("Error saving message:", err));
  };

  // Delete a correspondence message
  const handleDeleteMessage = (msgId) => {
    if (!window.confirm(t.corrDeleteConfirm)) return;
    if (!selectedCompanyId) return;

    fetch(`${API_BASE}/correspondence/${selectedCompanyId}/message/${msgId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        setCorrespondence(prev => ({
          ...prev,
          messages: (prev.messages || []).filter(m => m.id !== msgId)
        }));
      })
      .catch(err => console.error("Error deleting message:", err));
  };

  // Run LLM Status Analysis
  const handleAnalyzeCorrespondence = () => {
    if (!selectedCompanyId) return;
    setAnalysisLoading(true);

    fetch(`${API_BASE}/correspondence/${selectedCompanyId}/analyze?lang=${lang}`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.analysis) {
          setCorrespondence(prev => ({
            ...prev,
            analysis: data.analysis
          }));
        }
        setAnalysisLoading(false);
      })
      .catch(err => {
        console.error("Error analyzing correspondence:", err);
        setAnalysisLoading(false);
      });
  };

  // Toggle Voice Recording using Web Speech API
  const handleToggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Browser speech recognition is not supported in this browser. Try Chrome or Edge.");
        return;
      }

      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'tr-TR'; // Default to Turkish recording as requested

      let finalTrans = '';
      rec.onresult = (event) => {
        let interimTrans = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTrans += event.results[i][0].transcript + ' ';
          } else {
            interimTrans += event.results[i][0].transcript;
          }
        }
        setRawTranscript(finalTrans + interimTrans);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      rec.onerror = (e) => {
        console.error("Speech recognition error:", e);
        setIsRecording(false);
      };

      recognitionRef.current = rec;
      rec.start();
      setIsRecording(true);
    }
  };

  // Clean and format voice notes using LLM
  const handleFormatVoiceNote = () => {
    if (!rawTranscript.trim() || !selectedCompanyId) return;
    setVoiceNoteLoading(true);

    fetch(`${API_BASE}/correspondence/${selectedCompanyId}/voice-note?lang=${lang}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        raw_transcript: rawTranscript
      })
    })
      .then(res => res.json())
      .then(newNote => {
        setCorrespondence(prev => ({
          ...prev,
          notes: [...(prev.notes || []), newNote]
        }));
        setRawTranscript('');
        setFormattedNote(newNote.formatted_text);
        setVoiceNoteLoading(false);
      })
      .catch(err => {
        console.error("Error formatting voice note:", err);
        setVoiceNoteLoading(false);
      });
  };


  // Filtered companies list with defensive checks to prevent runtime crashes
  const uniqueCities = ['All', ...new Set(companies.map(c => (c.location || '').split(',')[0].trim()).filter(Boolean))];

  const filteredCompanies = companies.filter(c => {
    const focusText = (lang === 'tr' ? c.focus_area_tr : c.focus_area_en) || '';
    const nameText = c.name || '';
    const matchesSearch = nameText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         focusText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || getCompanyCategory(c.id) === selectedCategory;
    const matchesCity = selectedCity === 'All' || (c.location || '').includes(selectedCity);
    
    // Target logic: If 'Serhat' is selected, show 'Serhat' AND 'Both'. Same for Duygu.
    let matchesTarget = true;
    if (selectedTarget !== 'All') {
      matchesTarget = c.tags && c.tags.includes(selectedTarget);
    }
    
    return matchesSearch && matchesCategory && matchesCity && matchesTarget;
  });

  const selectedCompany = companies.find(c => c.id === selectedCompanyId);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hippie waves at top */}
      <div className="peace-wave"></div>
      
      {/* Header */}
      <header style={{
        padding: '1.5rem 2rem',
        borderBottom: 'var(--border-thick)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg-panel)',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => { setSelectedCompanyId(null); setCurrentTab('companies'); }}>
          <FlowerIcon size={36} />
          <div>
            <h1 style={{ fontSize: '1.8rem', letterSpacing: '-0.5px', textTransform: 'uppercase' }}>
              {t.title}
            </h1>
            <p className="text-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {t.subtitle}
            </p>
          </div>
        </div>
        
        {/* Navigation tabs & Language toggle */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Language Switcher */}
          <div style={{
            display: 'flex',
            border: '2px solid var(--border-color)',
            borderRadius: '50px',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-inner)',
            marginRight: '0.5rem'
          }}>
            <button 
              style={{
                border: 'none',
                padding: '0.35rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: lang === 'tr' ? 'var(--accent-yellow)' : 'transparent',
                color: lang === 'tr' ? '#000' : 'var(--text-muted)'
              }}
              onClick={() => setLang('tr')}
            >
              TR
            </button>
            <button 
              style={{
                border: 'none',
                padding: '0.35rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: lang === 'en' ? 'var(--accent-yellow)' : 'transparent',
                color: lang === 'en' ? '#000' : 'var(--text-muted)'
              }}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>

          <button 
            className="neo-button" 
            style={{ 
              backgroundColor: currentTab === 'companies' ? 'var(--accent-yellow)' : 'transparent',
              color: currentTab === 'companies' ? '#000' : 'var(--text-light)',
              boxShadow: currentTab === 'companies' ? 'var(--box-shadow-flat)' : 'none',
              transform: currentTab === 'companies' ? 'translate(-2px, -2px)' : 'none'
            }}
            onClick={() => { setCurrentTab('companies'); setSelectedCompanyId(null); }}
          >
            {t.tabCompanies}
          </button>
          <button 
            className="neo-button" 
            style={{ 
              backgroundColor: currentTab === 'rag' ? 'var(--accent-purple)' : 'transparent',
              color: currentTab === 'rag' ? '#FFF' : 'var(--text-light)',
              boxShadow: currentTab === 'rag' ? 'var(--box-shadow-flat)' : 'none',
              transform: currentTab === 'rag' ? 'translate(-2px, -2px)' : 'none'
            }}
            onClick={() => setCurrentTab('rag')}
          >
            {t.tabRag}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2rem' }}>
        {currentTab === 'companies' ? (
          // Tab 1: Companies Grid or Detail
          !selectedCompanyId ? (
            <div>
              {/* Search and Filters */}
              <div className="neo-card" style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', width: '100%', alignItems: 'center' }}>
                    
                    {/* Search */}
                    <div style={{ flex: '1 1 200px', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '0.8rem', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</div>
                      <input 
                        type="text" 
                        placeholder={t.searchPlaceholder} 
                        className="neo-input" 
                        style={{ paddingLeft: '2.2rem', width: '100%', boxSizing: 'border-box' }}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    {/* Category Dropdown */}
                    <div style={{ flex: '1 1 150px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <select 
                        className="neo-input" 
                        style={{ width: '100%', cursor: 'pointer', boxSizing: 'border-box' }}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat === 'All' ? (lang === 'tr' ? "Tüm Kategoriler" : "All Categories") : cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Target Dropdown */}
                    <div style={{ flex: '1 1 150px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <select 
                        className="neo-input" 
                        style={{ width: '100%', cursor: 'pointer', boxSizing: 'border-box' }}
                        value={selectedTarget}
                        onChange={(e) => setSelectedTarget(e.target.value)}
                      >
                        {['All', 'Serhat', 'Duygu', 'Nara XR'].map(tgt => {
                          const tgtText = tgt === 'All' ? (lang === 'tr' ? "Tüm Kişiler" : "All Targets") : getTargetUI(tgt).text;
                          return <option key={tgt} value={tgt}>{tgtText}</option>;
                        })}
                      </select>
                    </div>

                    {/* City Dropdown */}
                    <div style={{ flex: '1 1 150px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <select 
                        className="neo-input" 
                        style={{ width: '100%', cursor: 'pointer', boxSizing: 'border-box' }}
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                      >
                        {uniqueCities.map(city => (
                          <option key={city} value={city}>{city === 'All' ? (lang === 'tr' ? "Tüm Şehirler" : "All Cities") : city}</option>
                        ))}
                      </select>
                    </div>

                  </div>
                </div>

              </div>

              {/* Companies Grid */}
              <div className="grid-container">
                {filteredCompanies.map(c => {
                  const category = getCompanyCategory(c.id);
                  const getCategoryColor = (cat) => {
                    if (cat === 'AI & Pedagogy') return 'var(--accent-yellow)';
                    if (cat === 'STEAM & Immersive Tech') return 'var(--accent-orange)';
                    if (cat === 'Language & Storytelling') return 'var(--accent-teal)';
                    return 'var(--accent-purple)';
                  };

                  return (
                    <div 
                      key={c.id} 
                      className="neo-card" 
                      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
                      onClick={() => setSelectedCompanyId(c.id)}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                        {/* CATEGORY & LOCATION */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <span style={{ 
                            fontSize: '0.7rem', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.5px', 
                            color: getCategoryColor(category),
                            fontWeight: '700'
                          }}>
                            {category}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem', flexShrink: 0 }}>
                            <MapPinIcon /> {c.location?.split(',')[0]}
                          </span>
                        </div>

                        {/* LOGO, NAME & TARGET TAGS */}
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <CompanyLogo domain={c.website} name={c.name} size={64} />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, minWidth: 0 }}>
                            <h3 style={{ fontSize: '1.25rem', margin: 0, lineHeight: '1.2' }}>{c.name}</h3>
                            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                              {c.tags && c.tags.map(tag => (
                                <span key={tag} style={{ 
                                  fontSize: '0.65rem', 
                                  padding: '0.15rem 0.4rem', 
                                  borderRadius: '12px', 
                                  backgroundColor: 'var(--bg-inner)',
                                  color: getTargetUI(tag).color,
                                  border: `1px solid ${getTargetUI(tag).color}40`,
                                  display: 'flex', alignItems: 'center'
                                }}>
                                  {getTargetUI(tag).text}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* FOCUS AREA */}
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0, lineHeight: '1.5', flex: 1 }}>
                          {lang === 'tr' ? c.focus_area_tr : c.focus_area_en}
                        </p>

                        {/* CONTACTED BUTTON */}
                        <button 
                          className="neo-button"
                          onClick={(e) => toggleContacted(c.id, e)}
                          style={{ 
                            width: '100%',
                            padding: '0.5rem', 
                            fontSize: '0.8rem', 
                            borderRadius: '8px',
                            backgroundColor: contactedIds.includes(c.id) ? 'var(--accent-teal)' : 'var(--bg-inner)',
                            color: contactedIds.includes(c.id) ? '#000' : 'var(--text-light)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '0.5rem'
                          }}
                          title="Toggle Contacted Status"
                        >
                          {contactedIds.includes(c.id) ? t.contactedBtn : t.markContactedBtn}
                        </button>
                      </div>

                      <div style={{ borderTop: '2px solid var(--bg-inner)', paddingTop: '1rem', marginTop: '1rem' }}>
                        <p className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-yellow)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <SparklesIcon size={16} /> {t.whyRecHeader}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.3rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {lang === 'tr' ? c.why_recommended_tr : c.why_recommended_en}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // Company Detail View
            <>
            <div>
              {/* Back button */}
              <button 
                className="neo-button" 
                style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--accent-orange)' }}
                onClick={() => setSelectedCompanyId(null)}
              >
                <ChevronLeft /> {t.backBtn}
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }} className="detail-layout">
                {/* Left Side: Information Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div className="neo-card" style={{ borderColor: 'var(--accent-yellow)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <span className="neo-pill">{getCompanyCategory(selectedCompany?.id)}</span>
                      {selectedCompany?.tags && selectedCompany.tags.map(tag => (
                        <span key={tag} className="neo-pill" style={{ backgroundColor: getTargetUI(tag).color, marginRight: '4px' }}>
                          {getTargetUI(tag).text}
                        </span>
                      ))}
                      <a href={selectedCompany?.website} target="_blank" rel="noopener noreferrer" className="neo-button" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                        {t.webSiteBtn} <ExternalLink />
                      </a>
                    </div>
                    
                    {/* Detail page Logo & Name Header (Extra Large logo size 140px) */}
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <CompanyLogo domain={selectedCompany?.website} name={selectedCompany?.name} size={140} />
                        <h2 style={{ fontSize: '2.5rem', margin: 0, lineHeight: '1.1' }}>{selectedCompany?.name}</h2>
                      </div>
                      <button 
                        className="neo-button"
                        onClick={() => toggleContacted(selectedCompany?.id)}
                        style={{ 
                          padding: '0.6rem 1rem', 
                          fontSize: '0.9rem', 
                          backgroundColor: contactedIds.includes(selectedCompany?.id) ? 'var(--accent-teal)' : 'var(--bg-inner)',
                          color: contactedIds.includes(selectedCompany?.id) ? '#000' : 'var(--text-light)',
                          border: contactedIds.includes(selectedCompany?.id) ? '2px solid #000' : '2px dashed var(--border-color)'
                        }}
                      >
                        {contactedIds.includes(selectedCompany?.id) ? t.contactedBtn : t.markContactedBtn}
                      </button>
                    </div>

                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                      {lang === 'tr' ? selectedCompany?.focus_area_tr : selectedCompany?.focus_area_en}
                    </p>

                    {/* Meta Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--bg-inner)', padding: '1rem', borderRadius: '12px', border: '2px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CalendarIcon />
                        <div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.foundingYear}</p>
                          <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{selectedCompany?.founding_year || 'Bilinmiyor'}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPinIcon />
                        <div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.location}</p>
                          <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{selectedCompany?.location}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <UserIcon />
                        <div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.employeeCount}</p>
                          <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{selectedCompany?.employee_count}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <GlobeIcon />
                        <div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.emailContact}</p>
                          <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{selectedCompany?.contact_email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Why recommended */}
                  <div className="neo-card" style={{ borderColor: 'var(--accent-teal)' }}>
                    <h3 style={{ color: 'var(--accent-teal)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <SparklesIcon color="var(--accent-teal)" /> {t.whyRecHeader}
                    </h3>
                    <p style={{ lineHeight: '1.5', fontSize: '0.95rem' }}>
                      {lang === 'tr' ? selectedCompany?.why_recommended_tr : selectedCompany?.why_recommended_en}
                    </p>
                  </div>

                  {/* SWOT (Strengths and Weaknesses) */}
                  <div className="neo-card" style={{ borderColor: 'var(--accent-purple)' }}>
                    <h3 style={{ color: 'var(--accent-purple)', marginBottom: '1rem' }}>{t.swotHeader}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <p style={{ fontWeight: 'bold', color: 'var(--accent-sage)', fontSize: '0.9rem', textTransform: 'uppercase' }}>{t.swotStrengths}</p>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.2rem', lineHeight: '1.4' }}>
                          {lang === 'tr' ? selectedCompany?.strengths_tr : selectedCompany?.strengths_en}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontWeight: 'bold', color: 'var(--accent-orange)', fontSize: '0.9rem', textTransform: 'uppercase' }}>{t.swotWeaknesses}</p>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.2rem', lineHeight: '1.4' }}>
                          {lang === 'tr' ? selectedCompany?.weaknesses_tr : selectedCompany?.weaknesses_en}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Web Scraper & Email Generator */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>


                  {/* Email Generator panel */}
                  <div className="neo-card" style={{ borderStyle: 'dashed' }}>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <PeaceIcon color="var(--accent-yellow)" /> {t.emailHeader}
                    </h3>
                    <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                        {lang === 'tr' ? 'Mektup Taslak Notları (İsteğe Bağlı)' : 'Email Draft Notes (Optional)'}
                      </label>
                      <textarea
                        className="neo-textarea"
                        rows="3"
                        placeholder={lang === 'tr' ? "Yapay zekanın bu taslak için odaklanmasını istediğiniz özel detayları girin (örn: 'Assos köy okulları projesinden bahset', 'Duygu\\'nun çizerlik yeteneğine odaklan')..." : "Add specific instructions/notes for this draft (e.g. 'mention Assos village schools project', 'focus on Duygu\\'s illustration skills')..."}
                        value={customEmailNotes}
                        onChange={(e) => setCustomEmailNotes(e.target.value)}
                        style={{ fontSize: '0.85rem', lineHeight: '1.4', background: 'var(--bg-inner)' }}
                      />
                    </div>

                    {!generatedEmail && !emailLoading && (
                      <button 
                        className="neo-button" 
                        style={{ width: '100%', padding: '1rem' }}
                        onClick={() => handleGenerateEmail(false)}
                      >
                        {t.generateEmailBtn}
                      </button>
                    )}

                    {emailLoading && (
                      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{
                          display: 'inline-block',
                          width: '40px',
                          height: '40px',
                          border: '4px solid var(--accent-yellow)',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                          marginBottom: '1rem'
                        }}></div>
                        <p className="text-mono" style={{ color: 'var(--accent-yellow)' }}>Psychedelic AI Wave in Action...</p>
                        <style>{`
                          @keyframes spin {
                            to { transform: rotate(360deg); }
                          }
                        `}</style>
                      </div>
                    )}

                    {generatedEmail && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <textarea 
                          className="neo-textarea" 
                          rows="15" 
                          readOnly 
                          value={generatedEmail}
                          style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.85rem', lineHeight: '1.5', backgroundColor: '#1A1816' }}
                        />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <button className="neo-button" style={{ flex: 1 }} onClick={handleCopyEmail}>
                            {copied ? t.copied : t.copyBtn}
                          </button>
                          <button 
                            className="neo-button" 
                            style={{ backgroundColor: 'var(--bg-inner)', color: '#FFF' }} 
                            onClick={() => handleGenerateEmail(true)}
                          >
                            {t.regenerateBtn}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 📬 İletişim Geçmişi Kutusu */}
                  <div className="neo-card" style={{ borderColor: 'var(--accent-teal)' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {t.corrHeader}
                    </h3>

                    {/* Timeline message list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                      {(!correspondence.messages || correspondence.messages.length === 0) ? (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', margin: '1rem 0' }}>
                          {t.corrEmpty}
                        </p>
                      ) : (
                        correspondence.messages.map(msg => (
                          <div 
                            key={msg.id} 
                            style={{ 
                              padding: '1rem', 
                              borderRadius: '8px', 
                              border: '1px solid var(--border-color)',
                              backgroundColor: msg.type === 'sent' ? 'rgba(254, 211, 48, 0.08)' : 'rgba(46, 213, 115, 0.08)',
                              position: 'relative'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <span style={{ 
                                fontSize: '0.75rem', 
                                fontWeight: 'bold', 
                                color: msg.type === 'sent' ? 'var(--accent-yellow)' : 'var(--accent-teal)' 
                              }}>
                                {msg.type === 'sent' ? `📤 ${t.corrSentLabel}` : `📥 ${t.corrReceivedLabel}`}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{msg.date}</span>
                            </div>
                            <p style={{ fontSize: '0.85rem', whiteSpace: 'pre-wrap', margin: 0, lineHeight: '1.4', color: 'var(--text-light)' }}>
                              {msg.content}
                            </p>
                            <button 
                              onClick={() => handleDeleteMessage(msg.id)}
                              style={{ 
                                position: 'absolute', 
                                top: '0.5rem', 
                                right: '0.5rem', 
                                background: 'none', 
                                border: 'none', 
                                color: 'var(--accent-orange)', 
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                opacity: 0.7
                              }}
                              title="Sil"
                            >
                              🗑️
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Message creation form */}
                    {showMessageForm ? (
                      <form onSubmit={handleSaveMessage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px dashed var(--border-color)', paddingTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: showMessageForm === 'sent' ? 'var(--accent-yellow)' : 'var(--accent-teal)' }}>
                            {showMessageForm === 'sent' ? t.corrAddSent : t.corrAddReceived}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.corrDateLabel}:</label>
                            <input 
                              type="date" 
                              className="neo-input" 
                              style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                              value={newMessageDate}
                              onChange={e => setNewMessageDate(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <textarea 
                          className="neo-textarea" 
                          rows="4" 
                          placeholder={t.corrContentPlaceholder}
                          value={newMessageContent}
                          onChange={e => setNewMessageContent(e.target.value)}
                          required
                          style={{ fontSize: '0.85rem', lineHeight: '1.4' }}
                        />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <button type="submit" className="neo-button" style={{ flex: 1, padding: '0.5rem' }}>
                            {t.corrSaveBtn}
                          </button>
                          <button 
                            type="button" 
                            className="neo-button" 
                            style={{ flex: 1, padding: '0.5rem', backgroundColor: 'var(--bg-inner)', color: '#FFF' }}
                            onClick={() => setShowMessageForm(null)}
                          >
                            {t.corrCancelBtn}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button 
                          className="neo-button" 
                          style={{ flex: 1, padding: '0.6rem 0.5rem', fontSize: '0.8rem', backgroundColor: 'rgba(254, 211, 48, 0.15)', color: 'var(--accent-yellow)', border: '1px solid var(--accent-yellow)' }}
                          onClick={() => {
                            setShowMessageForm('sent');
                            setNewMessageDate(new Date().toISOString().split('T')[0]);
                          }}
                        >
                          📤 {t.corrAddSent}
                        </button>
                        <button 
                          className="neo-button" 
                          style={{ flex: 1, padding: '0.6rem 0.5rem', fontSize: '0.8rem', backgroundColor: 'rgba(46, 213, 115, 0.15)', color: 'var(--accent-teal)', border: '1px solid var(--accent-teal)' }}
                          onClick={() => {
                            setShowMessageForm('received');
                            setNewMessageDate(new Date().toISOString().split('T')[0]);
                          }}
                        >
                          📥 {t.corrAddReceived}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 📊 Durum Analizi Kutusu */}
                  <div className="neo-card" style={{ borderColor: 'var(--accent-purple)' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {t.analysisHeader}
                    </h3>
                    
                    {!correspondence.analysis && !analysisLoading && (
                      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        {(!correspondence.messages || correspondence.messages.length === 0) ? (
                          <p style={{ fontSize: '0.85rem', color: 'var(--accent-orange)', marginBottom: '1rem' }}>
                            ⚠️ {t.analysisEmpty}
                          </p>
                        ) : (
                          <button 
                            className="neo-button"
                            style={{ width: '100%', padding: '0.8rem' }}
                            onClick={handleAnalyzeCorrespondence}
                          >
                            {t.analysisBtn}
                          </button>
                        )}
                      </div>
                    )}

                    {analysisLoading && (
                      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{
                          display: 'inline-block',
                          width: '30px',
                          height: '30px',
                          border: '3px solid var(--accent-purple)',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                          marginBottom: '0.75rem'
                        }}></div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--accent-purple)' }}>{t.analysisLoading}</p>
                      </div>
                    )}

                    {correspondence.analysis && !analysisLoading && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div 
                          className="neo-textarea markdown-body" 
                          style={{ 
                            fontSize: '0.9rem', 
                            lineHeight: '1.5', 
                            backgroundColor: '#161413', 
                            padding: '1.25rem',
                            borderRadius: '8px',
                            maxHeight: '350px',
                            overflowY: 'auto'
                          }}
                        >
                          <ReactMarkdown>{correspondence.analysis}</ReactMarkdown>
                        </div>
                        {correspondence.messages && correspondence.messages.length > 0 && (
                          <button 
                            className="neo-button" 
                            style={{ alignSelf: 'flex-end', fontSize: '0.8rem', padding: '0.4rem 0.8rem', backgroundColor: 'var(--bg-inner)', color: '#FFF' }}
                            onClick={handleAnalyzeCorrespondence}
                          >
                            🔄 {lang === 'tr' ? 'Yeniden Analiz Et' : 'Re-Analyze'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                                {/* Strategy Generator Section */}
                <div style={{ marginTop: '2rem', borderTop: '2px dashed var(--border-color)', paddingTop: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ padding: '0.5rem', backgroundColor: 'var(--accent-teal)', borderRadius: '50%', color: '#000', border: '2px solid var(--border-color)', boxShadow: '2px 2px 0px #000' }}>
                      💡
                    </div>
                    <h3 style={{ margin: 0, color: 'var(--accent-teal)' }}>{t.strategyHeader}</h3>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {preGeneratedReports[selectedCompanyId] ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <button 
                            className="neo-button" 
                            style={{ backgroundColor: 'var(--accent-teal)', color: '#000', fontSize: '0.85rem' }} 
                            onClick={() => handleDownloadPdf(companies.find(c => c.id === selectedCompanyId)?.name || 'Sirket')}
                          >
                            ⬇️ {t.downloadPdfBtn}
                          </button>
                        </div>
                        <div 
                          id="strategy-report-content"
                          className="neo-textarea markdown-body" 
                          style={{ 
                            fontFamily: 'system-ui, -apple-system, sans-serif', 
                            fontSize: '0.95rem', 
                            lineHeight: '1.6', 
                            backgroundColor: '#1A1816',
                            padding: '1.5rem',
                            color: '#e2e8f0',
                            overflowY: 'auto',
                            maxHeight: '600px'
                          }}
                        >
                          <ReactMarkdown>{preGeneratedReports[selectedCompanyId]}</ReactMarkdown>
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', backgroundColor: 'var(--bg-inner)', borderRadius: '8px' }}>
                        {lang === 'tr' ? 'Bu şirket için hazır strateji raporu bulunamadı. Lütfen daha sonra tekrar deneyin veya sistemi yenileyin.' : 'No strategy report found for this company. Please try again later or refresh the system.'}
                      </div>
                    )}
                  </div>
                </div>

                {/* 🎙️ Şirketle İlgili Notlarım (Ses Kaydı & Notlar) */}
                <div style={{ marginTop: '2.5rem', borderTop: '2px dashed var(--border-color)', paddingTop: '2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.5rem', backgroundColor: 'var(--accent-orange)', borderRadius: '50%', color: '#000', border: '2px solid var(--border-color)', boxShadow: '2px 2px 0px #000' }}>
                      🎙️
                    </div>
                    <h3 style={{ margin: 0, color: 'var(--accent-orange)' }}>{t.notesHeader}</h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1.2fr)', gap: '2rem', flexWrap: 'wrap' }}>
                    {/* Left: Recording & Transcription Input */}
                    <div className="neo-card" style={{ background: 'var(--bg-inner)', display: 'flex', flexDirection: 'column', gap: '1.25rem', height: 'fit-content' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                          {isRecording ? t.notesRecording : (lang === 'tr' ? 'Yeni Not Kaydet' : 'Record New Note')}
                        </span>
                        
                        <button 
                          className="neo-button"
                          onClick={handleToggleRecording}
                          style={{ 
                            backgroundColor: isRecording ? 'var(--accent-orange)' : 'var(--bg-panel)',
                            color: isRecording ? '#000' : '#FFF',
                            borderColor: isRecording ? '#000' : 'var(--border-color)',
                            padding: '0.5rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <span style={{ 
                            display: 'inline-block', 
                            width: '12px', 
                            height: '12px', 
                            borderRadius: '50%', 
                            backgroundColor: isRecording ? '#000' : 'red',
                            animation: isRecording ? 'pulse 1.2s infinite' : 'none'
                          }}></span>
                          {isRecording ? t.notesStopRec : t.notesStartRec}
                        </button>
                      </div>

                      {/* Pulse Keyframes style */}
                      <style>{`
                        @keyframes pulse {
                          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7); }
                          70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(0, 0, 0, 0); }
                          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
                        }
                      `}</style>

                      {/* Raw Transcript Area */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.notesTranscriptLabel}</label>
                        <textarea
                          className="neo-textarea"
                          rows="6"
                          placeholder={lang === 'tr' ? 'Mikrofonu açıp konuşun veya buraya notunuzu yazın...' : 'Turn on the mic and speak, or write your note here...'}
                          value={rawTranscript}
                          onChange={e => setRawTranscript(e.target.value)}
                          style={{ fontSize: '0.85rem', lineHeight: '1.4' }}
                        />
                      </div>

                      {rawTranscript.trim() && (
                        <button 
                          className="neo-button"
                          onClick={handleFormatVoiceNote}
                          disabled={voiceNoteLoading}
                          style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--accent-orange)', color: '#000' }}
                        >
                          {voiceNoteLoading ? t.notesFormatting : t.notesFormatBtn}
                        </button>
                      )}
                    </div>

                    {/* Right: Saved Formatted Notes List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {(!correspondence.notes || correspondence.notes.length === 0) ? (
                        <div className="neo-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                          <p style={{ fontSize: '0.9rem' }}>{t.notesEmpty}</p>
                        </div>
                      ) : (
                        [...correspondence.notes].reverse().map(note => (
                          <div key={note.id} className="neo-card" style={{ borderColor: 'rgba(255, 127, 80, 0.3)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px dashed var(--border-color)', paddingBottom: '0.5rem' }}>
                              <span style={{ fontSize: '0.75rem', color: 'var(--accent-orange)', fontWeight: 'bold' }}>
                                📝 {t.notesFormattedLabel}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {new Date(note.created_at).toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US')}
                              </span>
                            </div>
                            <div className="markdown-body" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                              <ReactMarkdown>{note.formatted_text}</ReactMarkdown>
                            </div>
                            
                            {/* Collapsible raw transcript for debugging */}
                            <details style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              <summary style={{ cursor: 'pointer' }}>{lang === 'tr' ? 'Ham Metni Göster' : 'Show Raw Text'}</summary>
                              <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap', fontStyle: 'italic', backgroundColor: 'rgba(0,0,0,0.1)', padding: '0.5rem', borderRadius: '4px' }}>
                                {note.raw_transcript}
                              </p>
                            </details>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <VirtualInterview companyId={selectedCompanyId} companyName={companies.find(c => c.id === selectedCompanyId)?.name || ''} />
            </>
          )
        ) : (
          // Tab 2: RAG Manager
          <div className="neo-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <FlowerIcon size={32} />
              <h2>{t.ragTitle}</h2>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.5' }}>
              {t.ragInfo}
            </p>

            {ragEditData ? (
              <form onSubmit={handleSaveRag} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Serhat Section */}
                <div style={{ borderBottom: '2px dashed var(--bg-inner)', paddingBottom: '2rem' }}>
                  <h3 style={{ color: 'var(--accent-yellow)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {t.serhatRagHeader}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{t.nameTitle}</label>
                      <input 
                        type="text" 
                        className="neo-input" 
                        value={ragEditData?.serhat_kabais.title} 
                        onChange={e => {
                          const updated = { ...ragEditData };
                          updated.serhat_kabais.title = e.target.value;
                          setRagEditData(updated);
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{t.educationTitle}</label>
                      <input 
                        type="text" 
                        className="neo-input" 
                        value={ragEditData?.serhat_kabais.education} 
                        onChange={e => {
                          const updated = { ...ragEditData };
                          updated.serhat_kabais.education = e.target.value;
                          setRagEditData(updated);
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{t.websiteTitle}</label>
                      <input 
                        type="text" 
                        className="neo-input" 
                        value={ragEditData?.serhat_kabais.personal_website || ''} 
                        onChange={e => {
                          const updated = { ...ragEditData };
                          updated.serhat_kabais.personal_website = e.target.value;
                          setRagEditData(updated);
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{t.pedagogyTitle}</label>
                      <textarea 
                        className="neo-textarea" 
                        rows="3" 
                        value={ragEditData?.serhat_kabais.pedagogical_philosophy.approach} 
                        onChange={e => {
                          const updated = { ...ragEditData };
                          updated.serhat_kabais.pedagogical_philosophy.approach = e.target.value;
                          setRagEditData(updated);
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{t.anthroTitle}</label>
                      <textarea 
                        className="neo-textarea" 
                        rows="3" 
                        value={ragEditData?.serhat_kabais.digital_anthropology_vision || ''} 
                        onChange={e => {
                          const updated = { ...ragEditData };
                          updated.serhat_kabais.digital_anthropology_vision = e.target.value;
                          setRagEditData(updated);
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{t.tubitakTitle}</label>
                      <textarea 
                        className="neo-textarea" 
                        rows="5" 
                        value={ragEditData?.serhat_kabais.projects.tubitak_4009.description} 
                        onChange={e => {
                          const updated = { ...ragEditData };
                          updated.serhat_kabais.projects.tubitak_4009.description = e.target.value;
                          setRagEditData(updated);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Duygu Section */}
                <div style={{ borderBottom: '2px dashed var(--bg-inner)', paddingBottom: '2rem' }}>
                  <h3 style={{ color: 'var(--accent-purple)', marginBottom: '1.25rem' }}>{t.duyguRagHeader}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{t.nameTitle}</label>
                      <input 
                        type="text" 
                        className="neo-input" 
                        value={ragEditData?.duygu_kabais.title} 
                        onChange={e => {
                          const updated = { ...ragEditData };
                          updated.duygu_kabais.title = e.target.value;
                          setRagEditData(updated);
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{t.websiteTitle}</label>
                      <input 
                        type="text" 
                        className="neo-input" 
                        value={ragEditData?.duygu_kabais.portfolio_url} 
                        onChange={e => {
                          const updated = { ...ragEditData };
                          updated.duygu_kabais.portfolio_url = e.target.value;
                          setRagEditData(updated);
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{t.experienceTitle}</label>
                      <textarea 
                        className="neo-textarea" 
                        rows="4" 
                        value={ragEditData?.duygu_kabais.experience} 
                        onChange={e => {
                          const updated = { ...ragEditData };
                          updated.duygu_kabais.experience = e.target.value;
                          setRagEditData(updated);
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{t.booksTitle}</label>
                      <textarea 
                        className="neo-textarea" 
                        rows="3" 
                        value={ragEditData?.duygu_kabais.highlighted_books ? JSON.stringify(ragEditData?.duygu_kabais.highlighted_books, null, 2) : ''} 
                        onChange={e => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            const updated = { ...ragEditData };
                            updated.duygu_kabais.highlighted_books = parsed;
                            setRagEditData(updated);
                          } catch (err) {
                            // Let edit
                          }
                        }}
                        style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.8rem' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Netherlands Goals Section */}
                <div>
                  <h3 style={{ color: 'var(--accent-teal)', marginBottom: '1.25rem' }}>{t.netherlandsGoalsHeader}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{t.goalsTitle}</label>
                      <input 
                        type="text" 
                        className="neo-input" 
                        value={ragEditData?.netherlands_visit_goals.timeline_3_years} 
                        onChange={e => {
                          const updated = { ...ragEditData };
                          updated.netherlands_visit_goals.timeline_3_years = e.target.value;
                          setRagEditData(updated);
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{t.purposeTitle}</label>
                      <textarea 
                        className="neo-textarea" 
                        rows="2" 
                        value={ragEditData?.netherlands_visit_goals.trip_purpose} 
                        onChange={e => {
                          const updated = { ...ragEditData };
                          updated.netherlands_visit_goals.trip_purpose = e.target.value;
                          setRagEditData(updated);
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{t.offeringsTitle}</label>
                      <textarea 
                        className="neo-textarea" 
                        rows="4" 
                        value={JSON.stringify(ragEditData?.netherlands_visit_goals.partnership_offerings, null, 2)} 
                        onChange={e => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            const updated = { ...ragEditData };
                            updated.netherlands_visit_goals.partnership_offerings = parsed;
                            setRagEditData(updated);
                          } catch (err) {
                            // Let edit
                          }
                        }}
                        style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.8rem' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Save button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                  <button type="submit" className="neo-button" style={{ backgroundColor: 'var(--accent-teal)' }}>
                    {t.saveRagBtn}
                  </button>
                  {saveStatus && <span className="text-mono" style={{ color: 'var(--accent-teal)' }}>{saveStatus}</span>}
                </div>
              </form>
            ) : (
              <p>{lang === 'tr' ? 'Yükleniyor...' : 'Loading...'}</p>
            )}
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer style={{
        padding: '1.5rem 2rem',
        borderTop: 'var(--border-thick)',
        textAlign: 'center',
        background: 'var(--bg-panel)',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <p className="text-mono">Made with âœŒï¸ & ðŸŒ¸ for EdTech Innovation. Â© 2026</p>
      </footer>
    </div>
  );
}

export default App;
