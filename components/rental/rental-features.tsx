"use client"

import { Shield, Clock, CreditCard, MapPin, Headphones, CheckCircle } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Kapsamli Sigorta",
    description: "Tum araclarimiz kapsamli sigorta ile korunmaktadir.",
  },
  {
    icon: Clock,
    title: "7/24 Hizmet",
    description: "Gunun her saati arac teslim ve iade imkani.",
  },
  {
    icon: CreditCard,
    title: "Esnek Odeme",
    description: "Kredi karti, banka karti veya nakit odeme secenekleri.",
  },
  {
    icon: MapPin,
    title: "Farkli Nokta Teslim",
    description: "Farkli lokasyonlarda arac teslim ve iade imkani.",
  },
  {
    icon: Headphones,
    title: "Yol Yardim",
    description: "Aciل durumlarda 7/24 yol yardim hizmeti.",
  },
  {
    icon: CheckCircle,
    title: "Sinirsiz Km",
    description: "Cogu paketimizde sinirsiz kilometre hakki.",
  },
]

export function RentalFeatures() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Avantajlar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Neden Bizi Secmelisiniz?</h2>
          <p className="text-muted-foreground">Guvenli ve konforlu kiralama deneyimi icin.</p>
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
