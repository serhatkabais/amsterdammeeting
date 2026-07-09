import json, os

reports = {}

# 1. Classigogo
reports['classigogo'] = {
    "report_md": """# Classigogo Strateji Raporu

## Firma Hakkında Derinlemesine Özet
Classigogo, Hollanda ve Belçika'daki ilkokullar (groep 3-8) için geliştirilmiş, 'hareketli öğrenme' (bewegend leren) konseptine dayanan yenilikçi bir EdTech aracıdır. Öğrencilerin test sorularını sınıfta ayağa kalkıp fiziksel hareketlerle cevaplamasını sağlayan oyunlaştırılmış bir platform sunar. Öğretmenler AI yardımıyla hızlıca quizler oluşturabilir. Öğrencilerin enerjisini atmasını, odaklanmasını ve iş birliği yapmasını sağlarken öğretmene anında veri analitiği sunar. Sınıf içinde uzun süre oturmanın getirdiği hareketsizliği kırmayı hedefler.

## Öne Çıkarılması Gereken Yetenekler
- **Serhat Kabaiş:** Sensör ve donanım odaklı 'Sanal Pedal' VR Bisiklet projesi tecrübesi, fiziksel hareket ile öğrenmeyi birleştiren pedagojik altyapı. 22 yıllık sınıf yönetimi becerisi.
- **Duygu Kabaiş:** Hareket animasyonları, görsel geri bildirim arayüzleri, çocukların ilgisini çekecek avatar ve maskot tasarımları.

## Potansiyel İş Birliği Alanları (Ekosistem Raporları Işığında)
Şu anda sınıflarda kamera kurulumu gibi donanımsal bariyerleri aşmaya çalışıyorlar. Serhat Bey'in Arduino ve sensör mimarisi deneyimiyle, kamera harici (belki giyilebilir veya basit sensörlü) alternatif hareket algılama konseptleri üzerine fikir alışverişi yapılabilir. Ayrıca platformun uluslararasılaşması veya Türkiye pazarı/İngilizce dil öğrenimi modülleri için içerik üreticiliği (quiz tasarımı) ve bu içeriklerin Duygu Hanım tarafından görselleştirilmesi teklif edilebilir.

## Görüşme Tüyoları
Sistemi sadece bir 'quiz aracı' olarak değil, pedagojik bir 'sınıf canlandırıcısı' (energizer) olarak gördüğünüzü vurgulayın. Hareketli öğrenmenin (bewegend leren) Connectivism (Bağlantıcılık) ve sosyal öğrenme ile nasıl kesiştiğinden bahsedin.

## Sorulabilecek Stratejik 2 Soru
1. Öğretmenlerin quiz üretim sürecini AI ile hızlandırıyorsunuz; ilerleyen aşamalarda çocukların kendi hareketleriyle kendi sorularını tasarladığı akran öğrenimi (peeragogy) modülleri eklemeyi düşünüyor musunuz?
2. Donanım (kamera/cihaz) bağımlılığını azaltmak adına, sınıflardaki mevcut akıllı tahtalarla daha entegre ve pürüzsüz çalışacak hibrit çözümler üzerine bir yol haritanız var mı?
""",
    "why_recommended_tr": "Serhat Bey'in 'Sanal Pedal' projesindeki hareket ve eğitim felsefesiyle (bewegend leren) doğrudan örtüşür.",
    "why_recommended_en": "Directly aligns with Serhat's 'Sanal Pedal' project and its core philosophy of 'moving learning' (bewegend leren).",
    "strengths_tr": "Sınıf içi fiziksel aktivite (Sanal Pedal tecrübesi) ve oyunlaştırma odaklı görsel tasarım (Duygu Hanım'ın portfolyosu).",
    "strengths_en": "Expertise in classroom physical activity (Sanal Pedal) and gamified visual design (Duygu's portfolio).",
    "weaknesses_tr": "Platformun kamera veya donanım gereksinimleri okul satış döngülerini yavaşlatıyor olabilir.",
    "weaknesses_en": "Hardware dependencies (like classroom cameras) might be slowing down their sales cycles."
}

# 2. Greenscreenbox
reports['greenscreenbox'] = {
    "report_md": """# Greenscreenbox Strateji Raporu

## Firma Hakkında Derinlemesine Özet
Greenscreenbox, çocukların kendi videolarını, animasyonlarını ve stop-motion hikayelerini yaratabilmeleri için fiziksel yeşil ekran kutuları ve buna entegre mobil/web uygulamaları üreten ödüllü bir Hollanda girişimidir. Duvarları boyamak veya büyük perdeler kurmak yerine, masaya konabilen pratik bir ahşap kutu sunarlar. IPON ödüllerine aday gösterilmiş bu sistem, dil, tarih, bilim gibi derslerde medya okuryazarlığı ve yaratıcı ifade yeteneğini geliştirmek için Hollanda okullarında yaygın olarak kullanılmaktadır.

## Öne Çıkarılması Gereken Yetenekler
- **Duygu Kabaiş:** 100'den fazla çocuk kitabı illüstrasyonu. Yeşil ekran uygulamasının içine eklenebilecek dijital arka planlar (orman, uzay, masal diyarları vb.) ve karakter setleri tasarımı.
- **Serhat Kabaiş:** İda Kaşifleri ve TÜBİTAK atölyelerindeki medya/bilim birleşimi. Hikaye anlatıcılığının İngilizce öğrenimine entegrasyonu.

## Potansiyel İş Birliği Alanları (Ekosistem Raporları Işığında)
Duygu Hanım bu şirket için adeta biçilmiş kaftandır. Şirket halihazırda öğretmenlere adım adım kullanım kılavuzları ve projeler (background'lar dahil) veriyor. Duygu Hanım, şirketin "Premium Dijital İçerik Paketi" için çizer ve art direktör olarak konumlanabilir. Serhat Bey ise bu kutuların İngilizce dil eğitiminde nasıl kullanılabileceğine dair yeni müfredat modülleri (lesson plans) yazabilir.

## Görüşme Tüyoları
Sadece ahşap kutuyu değil, kutunun içini dolduracak 'hikayeyi' satabileceğinizi gösterin. Dijital uygulamanın içindeki kütüphaneyi zenginleştirmenin, kutu satışlarını doğrudan artıracağını veriyle/portfolyonuzla hissettirin.

## Sorulabilecek Stratejik 2 Soru
1. Fiziksel ahşap kutu satışınızın yanı sıra, Greenscreenbox App içerisindeki dijital varlık kütüphanenizi (backgrounds, characters) bir abonelik (SaaS) modeline dönüştürme planınız var mı?
2. İngilizce dil edinimine özel, çocukların yabancı dilde haber sunduğu veya hikaye anlattığı hazır pedagojik senaryo paketleri oluşturmak ister misiniz?
""",
    "why_recommended_tr": "Duygu Hanım'ın görsel hikaye anlatıcılığı yetenekleri ile Serhat Bey'in 'İda Kaşifleri' medya atölyesi deneyiminin kusursuz bir birleşimidir.",
    "why_recommended_en": "A perfect blend for Duygu's visual storytelling skills and Serhat's 'İda Kaşifleri' media workshop experience.",
    "strengths_tr": "Duygu Hanım'ın çocuk dünyasına hitap eden eşsiz arka plan ve karakter tasarımları sunabilmesi.",
    "strengths_en": "Duygu's ability to provide unique background and character designs that strongly appeal to children.",
    "weaknesses_tr": "Donanım (fiziksel kutu) satışlarına çok odaklı olmaları, sadece yazılım/içerik iş birliğini ikna etmeyi gerektirebilir.",
    "weaknesses_en": "Their heavy focus on physical box sales might require strong persuasion to partner solely on software/content."
}

# 3. Atermon
reports['atermon'] = {
    "report_md": """# Atermon Strateji Raporu

## Firma Hakkında Derinlemesine Özet
Atermon, eğitim kurumları, müzeler ve STK'lar için Minecraft Education platformu üzerinden özel oyun dünyaları, modlar ve 'öğretici (learnified)' deneyimler inşa eden Amsterdam merkezli bir stüdyodur. Oyunlaştırmadan ziyade, öğrenim kazanımlarının oyunun mekaniklerine ve hikayesine yedirildiği (learnification) bir yaklaşımı benimserler. STEAM, medya okuryazarlığı (Minding Media), sağlık (HealthCraft) ve çevre/biyoçeşitlilik (Sustain) gibi konularda Avrupa çapında konsorsiyum projeleri üretirler.

## Öne Çıkarılması Gereken Yetenekler
- **Serhat Kabaiş:** Dijital Etnografi vizyonu. Oyuncuların oyun içi dijital kültürlerini analiz etme, prompt mühendisliği ve yapay zeka ajanları ile Minecraft NPC'lerini akıllandırma fikirleri.
- **Duygu Kabaiş:** Minik Aristo gibi atölyelerden gelen hikaye yapılandırma ve bölüm tasarımı (level design/storyboarding) tecrübesi.

## Potansiyel İş Birliği Alanları (Ekosistem Raporları Işığında)
Atermon yoğun olarak Erasmus+ ve Horizon projelerinde yer alıyor. Serhat Bey'in AI MOSAIC eTwinning tecrübesi ve Erasmus konsorsiyumlarındaki dış uzmanlığı (external expert) çok büyük bir kozdur. Ortak bir AB hibe projesi yazılabilir. Ayrıca LLM'lerin (Büyük Dil Modelleri) Minecraft içindeki NPC'lere entegre edilerek oyun içi dil pratiği yapılması üzerine inovatif bir modül geliştirme fikri sunulabilir.

## Görüşme Tüyoları
Atermon'un "gamification" kelimesinden ziyade "learnification" felsefesine değer verdiğini unutmayın. Sadece oyun oynamak değil, oyunun içindeki dijital antropolojiyi ve bağlantıcılığı (connectivism) nasıl incelediğinizi vurgulayın.

## Sorulabilecek Stratejik 2 Soru
1. Minecraft içerisindeki statik NPC'leri, çocuklarla gerçek zamanlı ve eğitsel diyalog kurabilen (LLM destekli) yapay zeka ajanlarına dönüştürme konusunda bir Ar-Ge çalışmanız var mı?
2. Geliştirdiğiniz dünyalarda çocukların birbiriyle kurduğu sosyal etkileşimi (dijital etnografiyi) ölçümleyerek öğretmenlere anlamlı analitik raporlar sunmayı planlıyor musunuz?
""",
    "why_recommended_tr": "Minecraft oyunlaştırması, Serhat Bey'in bağlantıcı (connectivist) dijital ağlar ve Duygu Hanım'ın hikaye atölyeleriyle yüksek uyum taşır.",
    "why_recommended_en": "Minecraft learnification aligns perfectly with Serhat's connectivist digital networks and Duygu's storytelling workshops.",
    "strengths_tr": "LLM'lerin oyun içi ajanlara dönüştürülmesi (Serhat) ve oyun görevlerinin hikayeleştirilmesi (Duygu).",
    "strengths_en": "Integration of LLMs into in-game agents (Serhat) and pedagogical storyboarding (Duygu).",
    "weaknesses_tr": "Microsoft/Minecraft ekosistemine %100 bağımlı olmaları bağımsız yazılım geliştirmeyi sınırlar.",
    "weaknesses_en": "Being 100% reliant on the Microsoft/Minecraft ecosystem limits independent software development."
}

# 4. StudyGo
reports['studygo'] = {
    "report_md": """# StudyGo (Futurewhiz) Strateji Raporu

## Firma Hakkında Derinlemesine Özet
Eski adıyla WRTS olan StudyGo, Hollanda'nın en popüler kelime ezberleme ve sınav hazırlık platformlarından biridir. Futurewhiz şemsiyesi altında (Squla ile kardeş şirket) yer alır. Başlangıçta sadece bir kelime öğrenme (flashcard) aracı iken, şu an Matematik, Fizik, Biyoloji gibi tüm dersleri kapsayan, konu anlatım videoları barındıran devasa bir platforma dönüşmüştür. Öğrencilere Sokratik yöntemle yardım eden yapay zeka destekli bir 'AI Tutor' sistemine sahiptir.

## Öne Çıkarılması Gereken Yetenekler
- **Serhat Kabaiş:** 22 yıllık İngilizce öğretmenliği, dil ediniminde dijital araç kullanımı. Eğitim Teknolojileri yüksek lisansındaki "Yapay Zeka Ajanları" ve Sokratik sorgulama (prompt engineering) araştırmaları.

## Potansiyel İş Birliği Alanları (Ekosistem Raporları Işığında)
Devasa bir B2C ve B2B oyuncusudur. Serhat Bey, StudyGo'nun dil öğrenimi (özellikle İngilizce) içeriklerinin pedagojik denetmeni, Sokratik AI Tutor'un istem (prompt) yapılandırıcısı veya Hollanda dışı (Türkiye) pazarlara açılma stratejisti olarak konumlanabilir. Serhat Bey'in 'AI MOSAIC' projesindeki AI ajan tecrübeleri, StudyGo'nun botlarını daha 'insansı' ve pedagojik hale getirmek için kullanılabilir.

## Görüşme Tüyoları
Futurewhiz çok büyük bir kurumsal yapıdır. Startup refleksinden ziyade ölçeklenebilirlik, veri analitiği ve müfredat uyumluluğu dillerini konuşmalısınız. Doğrudan "Head of Product" veya "VP of Content" gibi rolleri hedefleyin. Sokratik AI Tutor'un halüsinasyon (hallucination) risklerini nasıl yöneteceğinize dair akademik bir güven verin.

## Sorulabilecek Stratejik 2 Soru
1. Sokratik AI Tutor'unuz şu an sadece soru çözümlerine mi yardım ediyor, yoksa öğrencinin motivasyon eksikliğini veya pedagojik tıkanıklığını sezip duygusal/motivasyonel geri bildirim verecek (Connectivist) bir seviyeye taşınacak mı?
2. WRTS'den StudyGo'ya geçişinizde dil eğitiminin yanına STEM derslerini de eklediniz; dil öğrenim modüllerini oyunlaştırmak adına uluslararası eTwinning tarzı akran etkileşimini sisteme dahil etme vizyonunuz var mı?
""",
    "why_recommended_tr": "Hollanda'nın en büyük eğitim platformlarından biridir ve Sokratik AI Tutor vizyonu, Serhat Bey'in Yüksek Lisans araştırma alanıyla birebir kesişir.",
    "why_recommended_en": "One of the largest platforms in the Netherlands; its Socratic AI Tutor vision intersects perfectly with Serhat's MA research.",
    "strengths_tr": "Serhat Bey'in 22 yıllık İngilizce pedagojisi ve AI prompt mühendisliği konularındaki derin tecrübesi.",
    "strengths_en": "Serhat's 22-year pedagogy in English and deep expertise in educational AI prompt engineering.",
    "weaknesses_tr": "Çok büyük bir kurumsal yapı oldukları için karar alma süreçleri yavaştır ve startup esnekliği göstermezler.",
    "weaknesses_en": "As a large corporate entity, their decision-making processes are slow and lack startup flexibility."
}

# 5. BookaBooka
reports['bookabooka'] = {
    "report_md": """# BookaBooka Strateji Raporu

## Firma Hakkında Derinlemesine Özet
BookaBooka, 2-10 yaş arası çocukların okuma sevgisini ve dil gelişimini desteklemek amacıyla tasarlanmış, Hollanda merkezli (De Bilt) interaktif bir resimli kitap kütüphanesidir. Uygulama, disleksi dostu arayüzler, "karaoke" modu (okunan kelimelerin vurgulanması) ve 30'a yakın dilde (çift dilli okuma dahil) destek sunar. En büyük özellikleri, çocukların dikkatini dağıtmamak için oyunlaştırma (gamification) ve bağımlılık yapıcı unsurlardan bilinçli olarak uzak durmalarıdır.

## Öne Çıkarılması Gereken Yetenekler
- **Duygu Kabaiş:** Bugüne kadar çizdiği 100'den fazla basılı çocuk kitabı portfolyosu. Bu kitapların BookaBooka'nın kütüphanesine dijital olarak kazandırılması.
- **Serhat Kabaiş:** İngilizce-Türkçe çift dilli (bilingual) erken çocukluk dönemi okuma pedagojisi uzmanlığı.

## Potansiyel İş Birliği Alanları (Ekosistem Raporları Işığında)
Duygu Hanım'ın mevcut ve gelecekteki kitapları için BookaBooka muazzam bir yayıncı ortak olabilir. Duygu Hanım kendi IP (Fikri Mülkiyet) haklarına sahip olduğu kitap serilerini platforma ekleyebilir. Ayrıca Serhat Bey, platformun "İngilizce Dil Öğrenimi" kapasitesini artırmak için yeni okuma anlama (reading comprehension) metrikleri veya anaokullarına yönelik öğretmen kılavuzları hazırlayabilir.

## Görüşme Tüyoları
BookaBooka'nın "oyunlaştırma karşıtı" ve pür okuma odaklı misyonunu takdir ettiğinizi belirtin. Görsel şatafat yerine pedagojik dinginliği öven bir dille Duygu Hanım'ın illüstrasyon tarzının ne kadar uygun olduğunu gösterin.

## Sorulabilecek Stratejik 2 Soru
1. Platformda oyunlaştırmadan bilinçli olarak uzak durduğunuzu biliyoruz; peki hikayelerin içine çocukların pasif dinleyici olmaktan çıkıp kararlara katılabileceği (Choose Your Own Adventure) interaktif dallanmalar eklemeye nasıl bakıyorsunuz?
2. Türkiye ve MENA bölgesindeki çok dilli ebeveynlere ulaşmak adına, portfolyomuzdaki mevcut 100+ kitabın dijitalleştirilip platforma özel animasyonlu versiyonlarının üretilmesi konusunda bir "Revenue-Share" (Gelir Paylaşımı) modeline açık mısınız?
""",
    "why_recommended_tr": "Duygu Hanım'ın 100'ü aşkın çocuk kitabı çizimini dijitalleştirmek ve uluslararası bir platformda çift dilli yayımlamak için eşsiz bir fırsattır.",
    "why_recommended_en": "A unique opportunity to digitize Duygu's 100+ children's books and publish them bilingually on an international platform.",
    "strengths_tr": "Duygu Hanım'ın devasa hazır portfolyosu ve Serhat Bey'in çift dilli okuma pedagojisi.",
    "strengths_en": "Duygu's massive ready-to-publish portfolio and Serhat's bilingual reading pedagogy.",
    "weaknesses_tr": "Platform tamamen kitap formatına sıkışmıştır, teknolojik veya donanımsal EdTech inovasyonlarına (VR, AI) çok kapalıdırlar.",
    "weaknesses_en": "The platform is strictly confined to the book format, making them resistant to hardware or deep tech (AI, VR) EdTech innovations."
}

os.makedirs(r"d:\CODING TOOLS\ANTIGRAVITY\dutchedtech\backend\data\temp_deep_reports", exist_ok=True)

for company_id, data in reports.items():
    file_path = fr"d:\CODING TOOLS\ANTIGRAVITY\dutchedtech\backend\data\temp_deep_reports\{company_id}.json"
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("All reports generated successfully.")
