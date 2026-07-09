import json
import os

data_heutink = {
    "report_md": """## Firma Hakkında Derinlemesine Özet
Heutink, 1911'den beri faaliyet gösteren, eğitim materyalleri, sanat ve zanaat ürünleri, mobilya ve ICT çözümleri sunan Hollanda merkezli dev bir aile şirketidir. Montessori eğitim materyallerinde (Nienhuis Montessori markasıyla) küresel lider konumundadır ve ürünlerini 80'den fazla ülkeye ihraç etmektedir. Yakın zamanda İskandinav EdTech lideri Lekolar Group ile birleşerek Avrupa'nın en büyük eğitim materyali tedarikçilerinden biri haline gelmiştir. Heutink Foundation aracılığıyla dezavantajlı çocuklara kültürel ve sanatsal eğitim fırsatları da sunmaktadırlar.

## Öne Çıkarılması Gereken Yetenekler
*   **Serhat Kabaiş:** Arduino, sensör mimarileri ve donanım entegrasyonu tecrübesi (TÜBİTAK 4009 projeleri, Sanal Pedal, Akıllı Kümes). Geleneksel eğitim materyallerini teknolojiyle buluşturma yetkinliği.
*   **Duygu Kabaiş:** 100'den fazla çocuk kitabı portfolyosu. Fiziksel (tangible) eğitim materyalleri ve kutu oyunları için pedagojik olarak uygun, sıcak ve çocuk dostu görsel tasarım/illüstrasyon becerileri.

## Potansiyel İş Birliği Alanları (Ekosistem Raporları Işığında)
Heutink'in geniş donanım ve materyal üretim gücü ile Serhat ve Duygu'nun "Uçtan Uca Çözüm" sunabilme kapasitesi birleştiğinde;
*   İçerisinde sensörler, temel seviye kodlama ve doğa bilincini barındıran (İda Kaşifleri tarzı) **hibrit STEAM setleri** tasarlanması ve Heutink markasıyla okullara sunulması.
*   Montessori yaklaşımına uygun, dokunsal ve teknolojik yeni nesil materyallerin görsel karakterlerinin Duygu tarafından kurgulanması.

## Görüşme Tüyoları
Heutink çok büyük ve köklü bir kurum olduğu için, vizyon satmaktan ziyade "prototipi hazır, okullarda test edilmiş ve hemen ölçeklenebilir" somut ürün konseptleri ile masaya oturmak kritik olacaktır. TÜBİTAK ve eTwinning projelerinde yüzlerce çocukla sahada test edilmiş atölye materyallerinizi referans olarak kullanın.

## Sorulabilecek Stratejik 2 Soru
1. Geleneksel Montessori materyallerini yapay zeka veya dijital sensörlerle harmanlayan "Hibrit EdTech" ürün gamı planlarınız var mı? Varsa bu materyallerin pedagojik arayüzlerini kim tasarlıyor?
2. Küresel pazar stratejinizde, bizim aktif olarak yer aldığımız Avrupa eTwinning ağı üzerinden yeni STEAM kitlerinizi pilot olarak uygulamak ilgilinizi çeker mi?""",
    "why_recommended_tr": "Hollanda'nın en büyük eğitim materyali sağlayıcısı olarak, tasarladığınız fiziksel (tangible) STEAM ve doğa-bilim setlerini (İda Kaşifleri) okullara ulaştırmak için en güçlü dağıtım kanalı ve üretim ortağıdır.",
    "why_recommended_en": "As the largest educational material provider in the Netherlands, they are the strongest distribution channel and manufacturing partner for scaling your physical STEAM and nature-science kits (İda Kaşifleri).",
    "strengths_tr": "Serhat Bey'in sahada test edilmiş sensörlü eğitim prototipleri ve Duygu Hanım'ın bu setlere kurumsal/görsel kimlik kazandırma yeteneği Heutink'in ürün gamına doğrudan katkı sağlayabilir.",
    "strengths_en": "Serhat's field-tested sensor-based education prototypes combined with Duygu's ability to create visual identities for these kits can directly add value to Heutink's product lines.",
    "weaknesses_tr": "Devasa bir şirket olduklarından bürokratik karar alma süreçleri yavaş olabilir; fikir aşamasındaki projelerden ziyade tamamlanmış donanım/eğitim prototipleri görmeyi tercih ederler.",
    "weaknesses_en": "Due to their massive corporate size, decision-making can be bureaucratic; they prefer seeing finished hardware/educational prototypes rather than early-stage ideas."
}

data_kidskonnect = {
    "report_md": """## Firma Hakkında Derinlemesine Özet
KidsKonnect, Hollanda'nın kreş, anaokulu ve ilkokul sektörü için en yaygın kullanılan entegre yazılım (SaaS) çözümlerinden biridir. 0-12 yaş çocukların gelişimi, personel planlaması ve okul-veli iletişimi alanlarında 1500'den fazla kuruma hizmet veren platform, Rothschild & Co destekli bir büyüme stratejisi izlemektedir. Ebeveynlerin çocuklarının gün içindeki durumunu, gelişimini ve etkinliklerini takip ettikleri bir portal sunarlar ve ParnasSys gibi diğer okul yönetim sistemleriyle entegre çalışırlar.

## Öne Çıkarılması Gereken Yetenekler
*   **Duygu Kabaiş:** Erken yaş grubu için (Smart Cookies, Smart Stars) UI/UX prensiplerine uygun, sıcak, renkli ve pedagojik illüstrasyon deneyimi. Arayüzleri "soğuk idari yazılımlar" olmaktan çıkarıp ebeveyn ve çocuk dostu hale getirme yetkinliği.
*   **Serhat Kabaiş:** Dijital Antropoloji bağlamında, dijital araçların ebeveyn-öğretmen-çocuk sosyalleşmesi üzerindeki etkisi ve erken yaş grubu sınıf yönetimi (Bağlantıcılık) tecrübesi.

## Potansiyel İş Birliği Alanları (Ekosistem Raporları Işığında)
*   **Veliler için Görsel Gelişim Raporları:** Sistem içerisindeki çocuk gelişim takip modüllerinin, Duygu'nun tasarlayacağı dijital rozetler (badges), avatar sistemleri ve hikayeleştirilmiş (gamified) gelişim haritaları ile zenginleştirilmesi.
*   Uygulama içi veli iletişim modüllerinde, kültürlerarası ailelerin (göçmenler/expatlar) dijital entegrasyonu için Serhat'ın pedagojik danışmanlık yapması.

## Görüşme Tüyoları
KidsKonnect temelinde çok güçlü bir "idari ve finansal yazılım" altyapısına sahiptir. Ancak asıl kullanıcılar ebeveynler ve çocuklardır. Sunumunuzu "yazılımın çalışması" üzerine değil, "kullanıcı arayüzünün ebeveynde yarattığı sıcaklık ve güven duygusunu (visual pedagogy) artırmak" üzerine kurun.

## Sorulabilecek Stratejik 2 Soru
1. Veli iletişim portallarınızda kullanıcı etkileşimini artırmak ve çocuk gelişim verilerini daha anlaşılır kılmak için görsel hikaye anlatıcılığından ve oyunlaştırmadan (gamification) ne kadar faydalanıyorsunuz?
2. Sisteminizin anaokullarından ilkokullara (ParnasSys entegrasyonu) "sıcak geçiş" (warm transfer) yaptığı dönemde, çocukların bu değişime adaptasyonunu kolaylaştıracak dijital rozet veya hikaye kartı modüllerini denemeyi düşünür müsünüz?""",
    "why_recommended_tr": "0-12 yaş pazarında Hollanda'nın lider SaaS platformu olmaları, ebeveyn iletişim uygulamalarında Duygu Hanım'ın çocuk dostu illüstrasyon ve UI/UX becerileri için devasa bir kitle sağlar.",
    "why_recommended_en": "Being the leading SaaS platform for the 0-12 age market in the Netherlands provides a massive audience for Duygu's child-friendly illustration and UI/UX skills in their parent communication apps.",
    "strengths_tr": "Duygu Hanım'ın soğuk idari yazılımları, sıcak ve ebeveyn/çocuk dostu görsel evrenlere dönüştürme (visual pedagogy) yeteneği. Serhat Bey'in dijital etnografi bağlamında veli-okul iletişimine dair pedagojik vizyonu.",
    "strengths_en": "Duygu's ability to transform cold administrative software into warm, parent/child-friendly visual universes (visual pedagogy). Serhat's pedagogical vision regarding parent-school communication through digital ethnography.",
    "weaknesses_tr": "Ürün geliştirme yol haritaları idari ve yasal modüllere odaklanmış olabilir; görsel/pedagojik iyileştirmeler için bütçe ayırmalarının önemini kanıtlamak gerekir.",
    "weaknesses_en": "Their product roadmap might be heavily focused on administrative and compliance modules; you must prove the ROI of allocating budget for visual and pedagogical enhancements."
}

data_edumersive = {
    "report_md": """## Firma Hakkında Derinlemesine Özet
Edumersive, Rotterdam merkezli, kurumların kendi sanal gerçeklik (VR) ve artırılmış gerçeklik (AR) eğitimlerini yaratmasına ve Meta Quest gibi cihazlara dağıtmasına olanak tanıyan bir SaaS platformudur. 360 derece video, 2D fotoğraf ve sunumları sürükle-bırak mantığıyla interaktif eğitim senaryolarına (çoktan seçmeli sorular vb.) dönüştürme imkanı sunar. Ağırlıklı olarak denizcilik, sağlık ve endüstriyel güvenlik alanlarına odaklansalar da okullar için trafik eğitimi gibi projelerle K-12 alanına da girmektedirler.

## Öne Çıkarılması Gereken Yetenekler
*   **Serhat Kabaiş:** TEKNOFEST "Sanal Pedal" VR Bisiklet projesi deneyimi. VR teknolojisini sınıf içine entegre etme, donanımla eşleştirme ve öğrencilerin hareket tabanlı öğrenimini kurgulama becerisi.
*   **Duygu Kabaiş:** Sürükleyici (immersive) VR senaryolarında kullanılacak görsel assetlerin, karakterlerin ve ortam tasarımlarının çocukların bilişsel seviyesine uygun olarak kurgulanması.

## Potansiyel İş Birliği Alanları (Ekosistem Raporları Işığında)
*   Edumersive'in mevcut VR altyapısını kullanarak, K-12 okulları için "Assos Antik Kenti Kazı Simülasyonu" veya "Akıllı Tarım VR Gezisi" (TÜBİTAK 4009 başlıkları) gibi pedagojik senaryolar oluşturmak.
*   Serhat'ın "Sanal Pedal" donanım vizyonunu Edumersive yazılımıyla birleştirerek okullara "Aktif Hareketli VR Seti" sunmak.

## Görüşme Tüyoları
Edumersive bir yazılım sağlayıcısıdır (authoring tool). Kendilerini bir içerik stüdyosundan ziyade araç olarak konumlandırırlar. Onlara "Biz sizin platformunuzu kullanarak okullara (veya Hollanda eğitim ekosistemine) satılabilecek çok güçlü eğitim içerikleri (veya donanım entegrasyonları) tasarlayabiliriz" mesajı verilmelidir.

## Sorulabilecek Stratejik 2 Soru
1. Mevcut VR oluşturma araçlarınızı kullanarak K-12 okullarına özel, donanım destekli (örneğin hareket sensörlü bisikletlerle entegre) yeni bir "Hareketli VR Öğrenme" paketi tasarlamak stratejik hedefleriniz arasında mı?
2. Eğitim modüllerinizdeki görsel materyallerin, çocukların yaş gruplarına ve bilişsel gelişimlerine uygun olmasını sağlamak adına pedagojik arayüz (UI/UX) tasarımı konusunda dışarıdan destek alıyor musunuz?""",
    "why_recommended_tr": "Platformlarının temel amacı VR/AR eğitim içeriği oluşturmak. Sanal Pedal (VR Bisiklet) projenizin doğrudan Hollanda okullarına SaaS formatında ölçeklenmesi için mükemmel bir yazılım partneridir.",
    "why_recommended_en": "Their platform's core purpose is VR/AR training creation. They are a perfect software partner to scale your Sanal Pedal (VR Bicycle) project into Dutch schools as a SaaS solution.",
    "strengths_tr": "Serhat Bey'in donanım/sensör ve VR'ı birleştiren pratik saha tecrübesi (Sanal Pedal). Duygu Hanım'ın bu VR senaryolarını ilkokul öğrencileri için görsel olarak oyunlaştırma becerisi.",
    "strengths_en": "Serhat's practical field experience combining hardware/sensors with VR (Sanal Pedal). Duygu's skill in visually gamifying these VR scenarios for primary school students.",
    "weaknesses_tr": "K-12'den ziyade yetişkin eğitimi (denizcilik, endüstri) pazarından gelir elde ediyorlar; ilkokul pazarına girmek için ikna edilmeleri gerekebilir.",
    "weaknesses_en": "They currently generate revenue mostly from adult/corporate training (maritime, industry); they may need convincing to invest heavily in the K-12 market."
}

data_mediawegwijs = {
    "report_md": """## Firma Hakkında Derinlemesine Özet
Mediawegwijs, Hollanda genelindeki ilk ve ortaokullara giderek öğrencilere "medya okuryazarlığı", "dijital vatandaşlık" ve "yapay zeka (AI) okuryazarlığı" eğitimleri veren, ayrıca öğretmenleri eğiten öncü bir kurumdur. VR gözlükleri, 3D kalemler ve robotik setlerle dolu mobil ekipleriyle ("On Tour") okullara giderek yaparak öğrenme (learning-by-doing) odaklı atölyeler düzenlerler. Müfredatları SLO (Hollanda Müfredat Geliştirme Vakfı) hedefleriyle tam uyumludur.

## Öne Çıkarılması Gereken Yetenekler
*   **Serhat Kabaiş:** "AI MOSAIC" eTwinning projesindeki AI okuryazarlığı tecrübesi, "Yapay Zekâ ile Hayalimdeki Akıllı Köy" (Prompt Yazma Atölyesi) tecrübesi ve Educators' Digital Competencies B2 sertifikası.
*   **Duygu Kabaiş:** "Minik Aristo" (Sinema, Optik, Camera Obscura) atölyesiyle medya ve görsel kültürün bilimsel temellerini çocuklara aktarabilme gücü.

## Potansiyel İş Birliği Alanları (Ekosistem Raporları Işığında)
*   **Yeni Atölye Modülleri:** Serhat'ın Prompt Yazma atölyesi ve Duygu'nun "Minik Aristo" medya/sinema atölyesinin Mediawegwijs'in okullara sunduğu "atölye menüsüne" eklenmesi.
*   **Öğretmen Eğitimleri (Train-the-Trainer):** Serhat'ın 22 yıllık öğretmenlik tecrübesiyle Hollandalı öğretmenlere "Sınıfta LLM ve AI Araçlarının Kullanımı" üzerine hizmet içi eğitimler vermesi.

## Görüşme Tüyoları
Sizin profiliniz onların aradığı tam bir "Master Trainer" (Uzman Eğitmen) veya "İçerik Geliştirici" profilidir. Onlara Türkiye'de (TÜBİTAK 4009) ve uluslararası ağlarda (eTwinning) yüzlerce çocukla uyguladığınız "hazır paket" atölyeleriniz olduğunu, bunları anında Hollanda müfredatına adapte edebileceğinizi söyleyin.

## Sorulabilecek Stratejik 2 Soru
1. Sınıf içi yapay zeka okuryazarlığı atölyelerinizde, prompt mühendisliğinin çocukların yaratıcı düşünmesine olan etkisini ölçümlüyor musunuz? (Bu alanda deneyimli olduğunuzu hissettirin).
2. Hazırladığımız pedagojik atölye içeriklerini (örneğin Minik Aristo Medya Atölyesi) öğretmen eğitim programlarınıza (Train-the-trainer) veya 'On Tour' konseptinize bir lisans veya partnerlik modeliyle entegre etmeye açık mısınız?""",
    "why_recommended_tr": "Okullara doğrudan dijital ve AI okuryazarlığı atölyeleri satıyorlar. Sizin TÜBİTAK 4009 ve eTwinning tecrübeleriniz, onların tam da okullara sunduğu 'yaparak öğrenme' konseptiyle birebir aynıdır.",
    "why_recommended_en": "They directly sell digital and AI literacy workshops to schools. Your TÜBİTAK 4009 and eTwinning experiences are identical to the 'learning-by-doing' concepts they deliver.",
    "strengths_tr": "Serhat Bey'in halihazırda test edilmiş Prompt Yazma ve VR atölyeleri. Duygu Hanım'ın görsel kültür ve sinema/medya (Minik Aristo) atölye tecrübesi.",
    "strengths_en": "Serhat's field-tested Prompt Writing and VR workshops. Duygu's experience with visual culture and cinema/media workshops (Minik Aristo).",
    "weaknesses_tr": "Operasyonları ağırlıklı olarak Felemenkçe dilde yürütülüyor olabilir. İngilizce atölyelerin veya göçmen/uluslararası okulların hedeflenmesi (veya materyallerin çevrilmesi) gerekecektir.",
    "weaknesses_en": "Their operations are likely heavily Dutch-language dependent. You will need to target international/expat schools or translate your materials to fit their workflow."
}

base_path = r"d:\\CODING TOOLS\\ANTIGRAVITY\\dutchedtech\\backend\\data\\temp_deep_reports"
os.makedirs(base_path, exist_ok=True)

with open(os.path.join(base_path, "heutink.json"), "w", encoding="utf-8") as f:
    json.dump(data_heutink, f, ensure_ascii=False, indent=2)

with open(os.path.join(base_path, "kidskonnect.json"), "w", encoding="utf-8") as f:
    json.dump(data_kidskonnect, f, ensure_ascii=False, indent=2)

with open(os.path.join(base_path, "edumersive.json"), "w", encoding="utf-8") as f:
    json.dump(data_edumersive, f, ensure_ascii=False, indent=2)

with open(os.path.join(base_path, "mediawegwijs.json"), "w", encoding="utf-8") as f:
    json.dump(data_mediawegwijs, f, ensure_ascii=False, indent=2)

print("All reports generated successfully.")
