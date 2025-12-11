"use client"

import { Zap, Shield, Headphones, CreditCard, Smartphone, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Aninda Aktivasyon",
    description: "Satin aldiktan saniyeler icinde QR kodunuzu alin ve hemen aktive edin.",
  },
  {
    icon: Shield,
    title: "Guvenli Baglanti",
    description: "Sifrelenmis baglanti ile guvenli internet erisimi.",
  },
  {
    icon: Headphones,
    title: "7/24 Destek",
    description: "Her zaman yanınizda olan musteri destek ekibi.",
  },
  {
    icon: CreditCard,
    title: "Kolay Odeme",
    description: "Kredi karti, banka karti ve kripto para ile odeme.",
  },
  {
    icon: Smartphone,
    title: "Tum Cihazlar",
    description: "iPhone, Samsung, Google Pixel ve diger eSIM destekli cihazlar.",
  },
  {
    icon: RefreshCw,
    title: "Yenileme Kolayligi",
    description: "Paketiniz bittiginde kolayca yenileyin veya yukstin.",
  },
]

export function EsimFeatures() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Ozellikler
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Neden Diamond eSIM?</h2>
          <p className="text-muted-foreground">En iyi seyahat deneyimi icin tasarlanmis ozellikler.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
