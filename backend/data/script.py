import json, os

reports = {}

# 1. NewTechKids
reports['newtechkids'] = {
    'report_md': """# NewTechKids Strateji Raporu

## Firma Hakkında Derinlemesine Özet
NewTechKids, Amsterdam merkezli, ilkokul çağındaki çocuklara (4-12 yaş) algoritmik düşünme, bilgisayar bilimleri ve teknoloji okuryazarlığı öğreten öncü bir teknoloji akademisidir. Çocukları teknolojinin pasif tüketicileri olmaktan çıkarıp, aktif inovasyon yaratıcıları haline getirmeyi hedeflerler. LEGO robotik setleri gibi fiziksel materyallerle 'kavram-bağlam' (concept-context) öğrenimi sunarlar. Aynı zamanda yapay zeka (AI) okuryazarlığı üzerine pilot programlar yürütmekte ve düşük gelirli ailelerin çocuklarına ulaşmak için kapsayıcılık projeleri (Stadspas vb.) geliştirmektedirler. Avrupa EdTech ekosisteminin 'sosyal etki' (social impact) ve 'kapsayıcılık' trendleriyle tam uyumludurlar.

## Öne Çıkarılması Gereken Yetenekler
- **Serhat Kabaiş:** B2 Dijital Yetkinlik sertifikası, 'Yapay Zekâ ile Hayalimdeki Akıllı Köy' atölye tecrübesi, AI MOSAIC eTwinning projesi ve donanım odaklı STEAM (Sanal Pedal, İda Kaşifleri) deneyimi.
- **Duygu Kabaiş:** Soyut kavramları (algoritma, AI) somut ve sıcak görsellere dönüştürebilme yeteneği. Çocuklara yönelik teknoloji eğitim setlerinin UI/UX tasarımı ve karakter (maskot) illüstrasyonları.

## Potansiyel İş Birliği Alanları (Ekosistem Raporları Işığında)
Hollanda eğitim teknolojileri pazarı organik ağlara ve çevik yeniliklere (Dutch EdTech yapılanması) çok değer vermektedir. NewTechKids'in AI okuryazarlığı müfredatlarına, Serhat'ın eTwinning destekli prompt yazma ve yapay zeka ajanları entegrasyon atölyeleri doğrudan entegre edilebilir. Ayrıca Duygu'nun çizimleriyle 'AI' kavramını çocuklara anlatan çok dilli bir resimli kitap / eğitim kiti serisi geliştirilebilir. Kurumların dış ajans ihtiyacını sıfırlayan 'Uçtan Uca Çözüm' stratejiniz bu butik akademi için harika bir kazan-kazan modeli sunar.

## Görüşme Tüyoları
Firmanın halihazırda belirgin ve güçlü bir pedagojik modeli (kavram-bağlam) var. Masaya otururken 'size yeni bir pedagoji getirdik' yerine, 'mevcut metodolojinize uluslararası (eTwinning) geçerliliği kanıtlanmış bir AI atölye modülü ve premium görsel tasarım eklemek istiyoruz' şeklinde yaklaşılmalıdır. Sosyal etki ve kapsayıcılık vurgularını (özel gereksinimli veya dezavantajlı çocuklar) ön planda tutun.

## Sorulabilecek Stratejik 2 Soru
1. Hollanda genelindeki okullara teknoloji eğitimi müfredatınızı pazarlarken, öğretmenlerin dijital yetkinlik bariyerini (B2 düzeyine ulaşma ihtiyacını) nasıl aşmayı planlıyorsunuz ve bu konuda bizim eTwinning'deki 'eğiticinin eğitimi' tecrübelerimizden nasıl faydalanabilirsiniz?
2. Teknoloji okuryazarlığı derslerinizi görselleştirilmiş hikaye kitapları ve fiziksel/somut eğitim materyallerine dönüştürerek daha erken yaş gruplarına (okul öncesi) indirmeyi düşündünüz mü?
""",
    'why_recommended_tr': 'Çocuklara yönelik AI okuryazarlığı ve bilgisayar bilimleri odakları, Serhat\'ın AI MOSAIC projesi ve donanım atölyeleriyle birebir uyumludur. Duygu\'nun görsel tasarımlarıyla karmaşık teknoloji konuları çocuklaştırılabilir.',
    'why_recommended_en': 'Their focus on AI literacy and computer science for kids perfectly aligns with Serhat\'s AI MOSAIC project and hardware workshops. Duygu\'s visual designs can help child-proof complex tech subjects.',
    'strengths_tr': 'Serhat\'ın B2 Dijital Yetkinlik seviyesi, donanım atölyeleri ve AI tecrübesi. Duygu\'nun STEAM materyallerini pedagojik ve görsel açıdan zenginleştirebilmesi.',
    'strengths_en': 'Serhat\'s B2 Digital Competency, hardware workshops, and AI experience. Duygu\'s ability to pedagogically and visually enrich STEAM materials.',
    'weaknesses_tr': 'Kendilerine has köklü bir pedagojik metodolojileri olduğundan, dışarıdan gelen tamamen farklı bir müfredata kapalı olabilirler.',
    'weaknesses_en': 'Because they have a deep-rooted pedagogical methodology, they might be resistant to a completely different external curriculum.'
}

# 2. Bomberbot
reports['bomberbot'] = {
    'report_md': """# Bomberbot Strateji Raporu

## Firma Hakkında Derinlemesine Özet
Bomberbot, çocuklara kodlama ve algoritmik düşünceyi oyunlaştırarak öğreten, Hollanda merkezli bir EdTech platformudur. Hedef kitlesi ilkokul öğrencileri ve özellikle programlama geçmişi olmayan öğretmenlerdir. Platformları, öğretmenlerin kodlama dersi vermesini kolaylaştıran kapsamlı bir kontrol paneline sahiptir ve Hollanda'daki ilkokulların yaklaşık %30'unda kullanılmıştır. Rubio Impact Ventures gibi girişim sermayelerinden yatırım almış ve EdTech ekosisteminde ölçeklenebilir büyüme göstermiştir. Şirket, 'oyunlaştırma' ve 'kurumsal/öğretmen dostu araçlar' konusunda uzmanlaşmıştır.

## Öne Çıkarılması Gereken Yetenekler
- **Serhat Kabaiş:** 22 yıllık sınıf yönetimi tecrübesi ve öğretmen panellerinin kullanılabilirliği (UI/UX) üzerine pratik saha geri bildirimleri. Algoritmik düşünceyi oyunlaştıran Bağlantıcılık (Connectivism) prensipleri.
- **Duygu Kabaiş:** Oyun platformunun karakter tasarımları, avatarları ve görsel evreninin (UI/UX) güncellenmesi veya yeni genişleme paketleri (DLC) için sanat yönetmenliği.

## Potansiyel İş Birliği Alanları (Ekosistem Raporları Işığında)
Avrupa EdTech pazarında (özellikle Hollanda'da) girişimlerin başarılı olabilmesi için yerel müfredata uyum ve öğretmenlerin iş yükünü hafifletme ön plandadır. Bomberbot tam olarak bu alanda faaliyet gösteriyor. İş birliği, Serhat'ın öğretmen panellerine yapay zeka (LLM) destekli asistan modülleri önermesi veya oyun dünyasını fiziksel sınıfa taşıyan 'Sanal Pedal' tarzı hibrit donanım-yazılım fikirleri ile olabilir. Duygu'nun illüstrasyon gücüyle platformun görsel iletişimini daha modern ve uluslararası bir seviyeye taşıma potansiyeli çok yüksektir.

## Görüşme Tüyoları
Firma olgun bir aşamada ve halihazırda büyük okullarla çalışıyor. Yatırım almış bir şirket oldukları için 'ölçeklenebilirlik' dillerini konuşmalısınız. Öğretmenlerin sınıf içinde yazılımla nasıl etkileşime girdiği konusunda Serhat'ın derin saha tecrübesini bir danışmanlık değeri olarak sunun. Ayrıca 'uçtan uca çözüm' vurgunuzla, kurum içi çizer/pedagog istihdam etmek yerine proje bazlı dış iş birliğinin maliyet ve hız avantajına odaklanın.

## Sorulabilecek Stratejik 2 Soru
1. Bomberbot'un mevcut oyun evrenini fiziksel dünya ile birleştiren (örneğin sensörler veya Arduino tabanlı fiziksel atölyelerle) bir hibrit öğrenme modeline geçiş vizyonunuz var mı?
2. Platformunuzun Hollanda dışındaki pazarlara (veya İngilizce konuşan hedef kitleye) açılma sürecinde, uluslararası deneyime sahip bir ekip olarak çok dilli içerik ve pedagojik yerelleştirme konularında nasıl destek verebiliriz?
""",
    'why_recommended_tr': 'Kodlamayı oyunlaştırma ve öğretmeni merkeze alma misyonları, Serhat\'ın sınıf yönetimi uzmanlığı ve Duygu\'nun oyun/karakter tasarımı becerileriyle mükemmel bir örtüşme içindedir.',
    'why_recommended_en': 'Their mission to gamify coding and center the teacher aligns perfectly with Serhat\'s classroom management expertise and Duygu\'s game/character design skills.',
    'strengths_tr': 'Serhat\'ın 22 yıllık pratik sınıf tecrübesiyle platforma pedagojik geri bildirim sunması. Duygu\'nun oyun içi avatar ve arayüzler için premium tasarımlar üretebilmesi.',
    'strengths_en': 'Serhat\'s 22 years of practical classroom experience providing pedagogical feedback. Duygu\'s ability to produce premium designs for in-game avatars and interfaces.',
    'weaknesses_tr': 'Gelişimini büyük ölçüde tamamlamış, yatırım almış ve satılmış/el değiştirmiş olgun bir platform. Yeni radikal müfredat veya sanat stili değişikliklerine kapalı olabilirler.',
    'weaknesses_en': 'A mature, post-investment platform. They might be closed to radical new curriculum ideas or major art style overhauls.'
}

# 3. Classroomscreen
reports['classroomscreen'] = {
    'report_md': """# Classroomscreen Strateji Raporu

## Firma Hakkında Derinlemesine Özet
Classroomscreen, öğretmenlerin sınıf yönetimini optimize etmek için kullandığı, küresel ölçekte 5 milyondan fazla kullanıcıya ulaşan web tabanlı interaktif bir akıllı tahta uygulamasıdır. Zamanlayıcı, gürültü ölçer, rastgele öğrenci seçici, çalışma sembolleri (sessiz ol, birlikte çalış vb.) ve anketler gibi widget'lar barındırır. Hollanda (Utrecht) çıkışlı bu platform, sadeliği, kurum içi kurulum gerektirmemesi ve öğretmenlerin iş akışını anında iyileştirmesi nedeniyle büyük bir başarı yakalamıştır. EdTech sektöründeki 'öğretmen araçları' dikeyinin en başarılı küresel örneklerindendir.

## Öne Çıkarılması Gereken Yetenekler
- **Serhat Kabaiş:** Etkin bir İngilizce öğretmeni olarak bu tür sınıf yönetimi araçlarının sahadaki asıl kullanıcı profili. Sınıf içi dinamikler, dijital antropoloji (öğrenci topluluklarının araçlara tepkisi) ve AI destekli yeni widget fikirleri (LLM entegrasyonlu sınıf asistanları).
- **Duygu Kabaiş:** Sınıf ekranının çocuklar üzerinde bıraktığı görsel etkiyi iyileştirme. Premium, çocuk psikolojisine uygun temalar, arka planlar ve widget UI/UX yenilikleri.

## Potansiyel İş Birliği Alanları (Ekosistem Raporları Işığında)
EdTech pazarı, yazılımların sadece teknolojik değil sosyolojik olarak da sınıfa entegre olmasını beklemektedir. Classroomscreen çok başarılı bir 'araç' olsa da, Serhat'ın Bağlantıcılık ve Dijital Etnografi yaklaşımları, uygulamanın 'öğrenci sosyalleşmesi' (akran öğrenimi) yönünü güçlendirecek yeni widget'lar tasarlanması için kullanılabilir. Duygu'nun illüstratör kimliği, platformun standart görsel dünyasına özel bayram/sezon paketleri, yaş grubuna özel tema seçenekleri gibi yepyeni bir gelir modeli (freemium/premium eklentiler) kazandırabilir.

## Görüşme Tüyoları
Sadelik, Classroomscreen'in en büyük gücüdür. Karmaşık sistemler önermeyin. 'Sınıftaki öğretmenin tam olarak neye ihtiyacı olduğunu 22 yıllık deneyimle biliyorum' yaklaşımı çok etkilidir. Duygu'nun yeteneklerini ise platformu görsel olarak karmaşıklaştırmak için değil, 'Premium / Eğlenceli UI Kitleri' sunarak öğretmenlere estetik özelleştirme imkanı tanımak için konumlandırın.

## Sorulabilecek Stratejik 2 Soru
1. Öğretmenlerin ders sırasındaki yükünü daha da hafifletmek adına, arka planda çalışan ve ses/metin komutlarıyla yönetilebilen AI (Yapay Zeka) destekli widget'lar entegre etme planınız var mı?
2. Sadece genel bir araç olmaktan çıkıp, erken yaş grupları (okul öncesi ve ilkokul) için tamamen pedagojik çizimlerle donatılmış özel bir "Classroomscreen Kids" teması oluşturmayı düşündünüz mü?
""",
    'why_recommended_tr': 'Serhat\'ın 22 yıllık sınıf tecrübesi bu tür bir uygulamanın vizyonunu doğrudan şekillendirebilir. Duygu\'nun görsel tasarımları arayüze sıcak bir, çocuk-dostu estetik katabilir.',
    'why_recommended_en': 'Serhat\'s 22 years of classroom experience can directly shape the vision of such an app. Duygu\'s visual designs can add a warm, child-friendly aesthetic to the interface.',
    'strengths_tr': 'Öğretmen perspektifinden kusursuz içgörü sağlama yeteneği ve görsel arayüzü premiumlaştıracak çocuk kitabı standartlarında illüstrasyon desteği.',
    'strengths_en': 'Ability to provide flawless insight from a teacher\'s perspective and illustration support at children\'s book standards to premiumize the visual interface.',
    'weaknesses_tr': 'Uygulamanın felsefesi "aşırı sadelik" üzerine kurulu. Karmaşık AI veya pedagoji özellikleri bu felsefeyle çatışabilir.',
    'weaknesses_en': 'The app\'s philosophy is built on "extreme simplicity". Complex AI or pedagogical features might conflict with this philosophy.'
}

# 4. Mytoori
reports['mytoori'] = {
    'report_md': """# Mytoori Strateji Raporu

## Firma Hakkında Derinlemesine Özet
Mytoori, iki dilli kısa hikayeler aracılığıyla okuma ve anlama becerilerini geliştirmeye odaklanan web tabanlı bir dil öğrenme platformudur. Kullanıcılar, paragraf ve cümle düzeyinde anadil ve hedef dil arasında anında geçiş yapabilirler. Hikayelere entegre edilmiş sesli okuma (text-to-speech) özelliği, özellikle orta seviye dil öğrenicilerinin bağlam içinde kelime dağarcığını genişletmesine yardımcı olur. Dil eğitiminde geleneksel dilbilgisi matkapları yerine 'sürükleyici hikaye anlatıcılığını' (immersive storytelling) ve içerik bazlı öğrenimi merkeze alırlar.

## Öne Çıkarılması Gereken Yetenekler
- **Duygu Kabaiş:** 100'den fazla çocuk kitabı illüstrasyonu portföyü. Resimli hikayelerin görsel dünyasını kurgulama, dijital hikayecilik (visual storytelling) alanındaki tartışılmaz uzmanlığı.
- **Serhat Kabaiş:** İngilizce dil öğretimi (ELT) uzmanlığı, iki dilli okuma pedagojisi, bağlam içinde kelime edinimine yönelik akademik donanım ve çocuk hikayelerini LLM entegrasyonuyla kişiselleştirme vizyonu.

## Potansiyel İş Birliği Alanları (Ekosistem Raporları Işığında)
Mytoori'nin kalbinde 'hikaye' yatmaktadır ve sizin donanımınızın kalbinde 'hikaye ve dil' birleşimi (Duygu'nun çizimleri + Serhat'ın dil pedagojisi) bulunmaktadır. Ekosistem, kişiselleştirilmiş öğrenmeye doğru gitmektedir. İş birliği, tamamen yeni, özgün ve yüksek kaliteli çocuk hikayelerinin baştan sona (hikaye, pedagojik yapılandırma, illüstrasyon) sizin tarafınızdan üretilmesi (Uçtan Uca Çözüm) modeliyle olabilir. Ayrıca Serhat'ın AI ajanları tecrübesiyle, çocukların hikaye gidişatını kendilerinin belirleyebileceği interaktif (choose-your-own-adventure) hikaye modülleri geliştirilebilir.

## Görüşme Tüyoları
Mytoori genellikle mevcut hikayeleri veya haberleri çeviren metin ağırlıklı bir platform. Sizin katma değeriniz, bu platformu "Görsel olarak zenginleştirilmiş, çocuklara/gençlere yönelik premium bir resimli kitap kütüphanesi"ne dönüştürmek olmalıdır. Start-up bütçelerini göz önünde bulundurarak, doğrudan hizmet faturası kesmek yerine ortak gelir paylaşımlı (revenue-share) veya özel bir editoryal seri (Serhat & Duygu Orijinalleri) yaratma fikriyle masaya oturun.

## Sorulabilecek Stratejik 2 Soru
1. Metin odaklı mevcut hikayelerinizi, çocuk illüstrasyonlarıyla zenginleştirilmiş "interaktif resimli çocuk kitapları" formatına dönüştürerek daha küçük yaş gruplarına (K-12 alt kademe) ulaşmayı planlıyor musunuz?
2. Okuyucunun ilgi alanlarına veya dil seviyesine göre hikayenin akışını gerçek zamanlı olarak değiştiren Üretken Yapay Zeka (Generative AI) destekli, dinamik hikaye okuma deneyimleri kurgulamaya ne kadar açıksınız?
""",
    'why_recommended_tr': 'Hikaye anlatıcılığı ve dil edinimini birleştiren konsepti, Duygu\'nun çizerliği ve Serhat\'ın 22 yıllık İngilizce öğretmeni profiliyle %100 sinerji içindedir.',
    'why_recommended_en': 'The concept of combining storytelling and language acquisition has 100% synergy with Duygu\'s illustration and Serhat\'s 22-year English teaching profile.',
    'strengths_tr': 'Duygu\'nun 100+ çocuk kitabı deneyimiyle içerikleri görsel bir şölene dönüştürmesi. Serhat\'ın dilbilimsel ve pedagojik altyapısı.',
    'strengths_en': 'Duygu\'s 100+ children\'s book experience turning content into a visual feast. Serhat\'s linguistic and pedagogical background.',
    'weaknesses_tr': 'Şirket yetişkin/orta seviye metin odaklı okuyuculara odaklanmışsa, çocuk illüstrasyonları onlara hitap etmeyebilir; pivot etmeleri gerekebilir.',
    'weaknesses_en': 'If the company is focused on adult/intermediate text-focused readers, children\'s illustrations might not appeal to them; they might need to pivot.'
}

# 5. Taaly
reports['taaly'] = {
    'report_md': """# Taaly Strateji Raporu

## Firma Hakkında Derinlemesine Özet
Taaly, dil öğrenenlerin (özellikle yeni gelen göçmenlerin ve mültecilerin) ana dili konuşan gönüllülerle veya koçlarla birebir video görüşmeler üzerinden pratik yapmasını sağlayan, sosyal uyum ve entegrasyon odaklı bir mobil uygulamadır. Geleneksel sınıf ortamının stresini ortadan kaldırıp, gündelik ve esnek bir konuşma pratiği sunarlar. AI destekli sanal dil partneri ve kullanıcılara birbirine yardım ettikçe "Karma Coin" kazandıran oyunlaştırılmış bir kredi sistemiyle çalışırlar. Temel felsefeleri, dil bariyerini yıkarak Hollanda'da (ve globalde) sosyal entegrasyonu sağlamaktır.

## Öne Çıkarılması Gereken Yetenekler
- **Serhat Kabaiş:** İngilizce dili eğitimi, konuşma (speaking) odaklı müfredat geliştirme ve en önemlisi 'Dijital Etnografi' ve 'Bağlantıcılık (Connectivism)' üzerine yaptığı yüksek lisans araştırmaları. Dijital toplulukların dinamikleri Taaly'nin tam olarak faaliyet gösterdiği alandır.
- **Duygu Kabaiş:** Uygulamanın 'Karma Coin', hediye sistemi, başarı rozetleri ve AI partnerinin görsel kimliği gibi UI/UX ve oyunlaştırma elementlerinin pedagojik açıdan sıcak bir tasarımla yenilenmesi.

## Potansiyel İş Birliği Alanları (Ekosistem Raporları Işığında)
Hollanda eğitim ekosistemi, sadece akademik başarıyı değil, toplumsal entegrasyonu (social inclusion) da çok önemsemektedir. Taaly bu hedefin tam merkezindedir. İş birliği, Serhat'ın uygulamanın AI asistanını ve koçluk yönergelerini pedagojik olarak yapılandırması üzerine kurulabilir. Dijital toplulukların nasıl daha verimli dil öğrendiği üzerine akademik tez araştırmanız için Taaly mükemmel bir 'test laboratuvarı' olabilir. Ayrıca, Taaly'nin Felemenkçe odaklı yapısına 'İngilizce pratiği' eklentisi için direkt içerik/metodoloji ortaklığı yapılabilir.

## Görüşme Tüyoları
Görüşmede 'insanları dijital ortamda birbirine bağlayarak öğrenme (Connectivism)' kavramını çok vurgulayın. Uygulamanın kurucusunun kendi entegrasyon hikayesinden yola çıktığını unutmayın; empati odaklı, sosyal fayda sağlayan eğitim vizyonunuzu öne çıkarın. Ayrıca AI entegrasyonları yeni olduğundan, Serhat'ın AI ajanları ve prompt mühendisliği tecrübesi teknik tarafta ilgilerini çekecektir.

## Sorulabilecek Stratejik 2 Soru
1. Kullanıcıların dijital ortamda eşleşip öğrenme pratiklerini şekillendirdiği bu platformda, "Dijital Etnografi" araştırmaları ışığında, kültürlerarası iletişimi daha verimli kılacak pedagojik koçluk rehberleri (veya AI yönlendirmeleri) geliştirmeyi planlıyor musunuz?
2. "Karma Coin" oyunlaştırma modelinizi, Duygu'nun yetkinliğiyle daha çocuk-dostu ve sıcak bir rozet/ödül arayüzüne kavuşturarak, lise altı yaş gruplarının da güvenle pratik yapabileceği "Taaly Junior" versiyonunu inşa etmeyi düşündünüz mü?
""",
    'why_recommended_tr': 'Dil pratiği ve insanları birbirine bağlama modeli (Bağlantıcılık) Serhat\'ın vizyonuyla, sosyal etki ve oyunlaştırma ise Duygu\'nun tasarım becerileriyle eşleşir.',
    'why_recommended_en': 'The model of language practice and connecting people (Connectivism) matches Serhat\'s vision, while social impact and gamification match Duygu\'s design skills.',
    'strengths_tr': 'Serhat\'ın dijital etnografi alanındaki akademik yetkinliği ve iletişim odaklı dil öğretimi tecrübesi. Duygu\'nun oyunlaştırma arayüzleri tasarımı.',
    'strengths_en': 'Serhat\'s academic competence in digital ethnography and communication-focused language teaching experience. Duygu\'s design of gamification interfaces.',
    'weaknesses_tr': 'Taaly ağırlıklı olarak Hollandaca dil entegrasyonu ve yetişkin/genç mülteci nüfusu hedefliyor. Serhat\'ın uzmanlığı olan K-12 İngilizce eğitiminden farklı bir demografi.',
    'weaknesses_en': 'Taaly primarily targets Dutch language integration and the adult/youth refugee population, a different demographic from Serhat\'s K-12 English education expertise.'
}

os.makedirs(r'd:\CODING TOOLS\ANTIGRAVITY\dutchedtech\backend\data\temp_deep_reports', exist_ok=True)

for cid, data in reports.items():
    with open(rf'd:\CODING TOOLS\ANTIGRAVITY\dutchedtech\backend\data\temp_deep_reports\{cid}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print('Done creating 5 JSON files.')
