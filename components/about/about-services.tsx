"use client"

import {
  Stamp,
  FileCheck,
  Calendar,
  AlertTriangle,
  Plane,
  Smartphone,
  Car,
  CreditCard,
  Shield,
  HeadphonesIcon,
} from "lucide-react"

const services = [
  {
    icon: Stamp,
    title: "Akilli Vize Yonetim Sistemi",
    description: "Tam otomatik vize basvuru takip ve yonetim paneli ile sureclerinizi kolayca yonetin.",
  },
  {
    icon: FileCheck,
    title: "AI Destekli Evrak Yonetimi",
    description: "Belge hazirlama, kontrol ve yukleme islemleri yapay zeka destegi ile otomatik gerceklestir.",
  },
  {
    icon: Calendar,
    title: "Randevu Yonetimi",
    description: "Konsolosluk ve vize merkezi randevularinizi otomatik sistemimizle kolayca alin.",
  },
  {
    icon: AlertTriangle,
    title: "Red Itiraz Sureci",
    description: "Vize reddi durumlarinda otomatik itiraz dilekcesi hazirlama ve takip hizmeti.",
  },
  {
    icon: Plane,
    title: "Seyahat Entegrasyonu",
    description: "Ucak bileti, otel rezervasyonu ve transfer hizmetleri ile entegre cozumler.",
  },
  {
    icon: Smartphone,
    title: "Global eSIM",
    description: "190'dan fazla ulkede kesintisiz internet baglantisi icin eSIM satis ve aktivasyon.",
  },
  {
    icon: Car,
    title: "Arac Kiralama",
    description: "Gideceginiz ulkede guvenli ve konforlu ulasim icin genis arac secenekleri.",
  },
  {
    icon: CreditCard,
    title: "Guvenli Odeme",
    description: "Kredi karti, banka transferi ve kripto para ile guvenli odeme secenekleri.",
  },
  {
    icon: Shield,
    title: "Veri Guvenligi",
    description: "256-bit SSL sertifikasi ve KVKK uyumlu veri koruma sistemleri.",
  },
  {
    icon: HeadphonesIcon,
    title: "7/24 Destek",
    description: "Uzman ekibimiz her an yanınizda, sorularinizi cevaplamaya hazir.",
  },
]

export function AboutServices() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Hizmetlerimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Sunduğumuz Kapsamli Hizmetler</h2>
          <p className="text-muted-foreground">
            Diamond Visa olarak seyahatinizin her asamasinda yaninizdayiz. Vize islemlerinden eSIM'e kadar tum
            ihtiyaclariniz tek platformda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
