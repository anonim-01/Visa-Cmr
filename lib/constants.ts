// Diamond Visa - Sirket Bilgileri
export const COMPANY_INFO = {
  name: "Diamond Visa",
  fullName: "Diamond Visa Global Seyahat Hizmetleri",
  slogan: "Dunyanin Kapilarini Aciyoruz",
  description: "AI destekli akilli vize yonetim sistemi ile dunyanin her yerine kolay ve guvenli seyahat",
  founded: "2024",

  contact: {
    email: "info@diamondvisa.com",
    phone: "+90 212 555 0000",
    whatsapp: "+90 532 555 0000",
    address: "Levent, Istanbul, Turkiye",
  },

  social: {
    instagram: "https://instagram.com/diamondvisa",
    facebook: "https://facebook.com/diamondvisa",
    twitter: "https://twitter.com/diamondvisa",
    linkedin: "https://linkedin.com/company/diamondvisa",
    youtube: "https://youtube.com/@diamondvisa",
  },

  legal: {
    companyNumber: "123456789",
    taxNumber: "987654321",
    mersisNo: "0123456789012345",
  },
}

// Hizmetler
export const SERVICES = [
  {
    id: "visa",
    title: "Vize Hizmetleri",
    description: "50'den fazla ulke icin profesyonel vize danismanligi",
    icon: "Stamp",
    href: "/visa",
    features: ["AI Destekli Basvuru", "Belge Hazirlama", "Randevu Yonetimi", "Red Itirazi"],
  },
  {
    id: "esim",
    title: "eSIM Satis",
    description: "Dunya capinda kesintisiz internet baglantisi",
    icon: "Smartphone",
    href: "/esim",
    features: ["190+ Ulke", "Aninda Aktivasyon", "Uygun Fiyat", "7/24 Destek"],
  },
  {
    id: "rental",
    title: "Arac Kiralama",
    description: "Gideceginiz ulkede guvenli ve konforlu ulasim",
    icon: "Car",
    href: "/rental",
    features: ["Genis Arac Secenegi", "Sigorta Dahil", "Sofor Secenegi", "Transfer Hizmeti"],
  },
  {
    id: "tours",
    title: "Tur ve Tatil",
    description: "Ozel tasarlanmis tur paketleri ve tatil planlari",
    icon: "Plane",
    href: "/tours",
    features: ["Grup Turlari", "Ozel Turlar", "Otel Rezervasyon", "Ucak Bileti"],
  },
]

// Populer Ulkeler
export const POPULAR_COUNTRIES = [
  { code: "US", name: "Amerika", flag: "🇺🇸", processingTime: "5-7 is gunu" },
  { code: "GB", name: "Ingiltere", flag: "🇬🇧", processingTime: "3-5 is gunu" },
  { code: "DE", name: "Almanya", flag: "🇩🇪", processingTime: "10-15 is gunu" },
  { code: "FR", name: "Fransa", flag: "🇫🇷", processingTime: "10-15 is gunu" },
  { code: "IT", name: "Italya", flag: "🇮🇹", processingTime: "10-15 is gunu" },
  { code: "ES", name: "Ispanya", flag: "🇪🇸", processingTime: "10-15 is gunu" },
  { code: "NL", name: "Hollanda", flag: "🇳🇱", processingTime: "10-15 is gunu" },
  { code: "CA", name: "Kanada", flag: "🇨🇦", processingTime: "20-30 is gunu" },
  { code: "AU", name: "Avustralya", flag: "🇦🇺", processingTime: "15-20 is gunu" },
  { code: "JP", name: "Japonya", flag: "🇯🇵", processingTime: "5-7 is gunu" },
  { code: "AE", name: "BAE", flag: "🇦🇪", processingTime: "3-5 is gunu" },
  { code: "SG", name: "Singapur", flag: "🇸🇬", processingTime: "3-5 is gunu" },
]

// Vize Turleri
export const VISA_TYPES = [
  { id: "tourist", name: "Turistik Vize", icon: "Camera" },
  { id: "business", name: "Is Vizesi", icon: "Briefcase" },
  { id: "student", name: "Ogrenci Vizesi", icon: "GraduationCap" },
  { id: "work", name: "Calisma Vizesi", icon: "Building" },
  { id: "transit", name: "Transit Vize", icon: "ArrowRightLeft" },
  { id: "medical", name: "Tedavi Vizesi", icon: "Heart" },
]

// Basvuru Durumlari
export const APPLICATION_STATUS = {
  DRAFT: { label: "Taslak", color: "gray" },
  PENDING: { label: "Beklemede", color: "yellow" },
  DOCUMENT_REVIEW: { label: "Belge Incelemede", color: "blue" },
  EXPERT_REVIEW: { label: "Uzman Incelemede", color: "purple" },
  SUBMITTED: { label: "Konsolosluga Iletildi", color: "indigo" },
  APPROVED: { label: "Onaylandi", color: "green" },
  REJECTED: { label: "Reddedildi", color: "red" },
  APPEAL: { label: "Itiraz Surecinde", color: "orange" },
}

// SSS
export const FAQ_ITEMS = [
  {
    question: "Vize basvuru sureci nasil isliyor?",
    answer:
      "Diamond Visa ile vize basvuru surecini 4 kolay adimda tamamlayabilirsiniz: 1) Online basvuru formunu doldurun, 2) Gerekli belgeleri yukleyin, 3) AI sistemimiz belgelerinizi kontrol etsin, 4) Randevunuzu alin ve vize merkezine gidin.",
  },
  {
    question: "Vize red durumunda ne yapabilirim?",
    answer:
      "Vize reddi durumunda Diamond Visa olarak itiraz dilekcenizi hazirliyor ve sureci sizin adıniza takip ediyoruz. AI destekli sistemimiz red nedenlerini analiz ederek en etkili itiraz stratejisini belirler.",
  },
  {
    question: "eSIM nasil aktive edilir?",
    answer:
      "eSIM satin aldiktan sonra size gonderilen QR kodu telefonunuzun kamerasıyla tarayin. Birkaç dakika icinde internetiniz aktif olacaktir. iOS ve Android cihazlar desteklenmektedir.",
  },
  {
    question: "Odeme yontemleri nelerdir?",
    answer:
      "Kredi karti, banka karti, havale/EFT ve kripto para ile odeme yapabilirsiniz. Tum odemeleriniz 256-bit SSL sertifikasi ile korunmaktadir.",
  },
  {
    question: "Musterilerinizin vize onay orani nedir?",
    answer:
      "Diamond Visa olarak %94 vize onay oranina sahibiz. AI destekli belge kontrolu ve uzman danismanlarimiz sayesinde basvurularınizi en yuksek basari sansiyla tamamliyoruz.",
  },
]

// Istatistikler
export const STATS = [
  { label: "Mutlu Musteri", value: "50,000+", icon: "Users" },
  { label: "Onaylanan Vize", value: "45,000+", icon: "CheckCircle" },
  { label: "Destek Verilen Ulke", value: "50+", icon: "Globe" },
  { label: "Onay Orani", value: "%94", icon: "TrendingUp" },
]
