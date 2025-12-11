"use client"

import { Heart, Zap, Shield, Users, Globe, Award } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Musteri Odaklilik",
    description: "Her kararda musterilerimizin ihtiyaclari ve memnuniyeti onceliklidir.",
  },
  {
    icon: Zap,
    title: "Inovasyon",
    description: "Surekli yenilik ve gelisim ile en iyi hizmeti sunmaya calisiyoruz.",
  },
  {
    icon: Shield,
    title: "Guvenilirlik",
    description: "Seffaf ve durust yaklasimimizla guveninizi kazaniyoruz.",
  },
  {
    icon: Users,
    title: "Takim Ruhu",
    description: "Birlikte calisarak en iyi sonuclari elde ediyoruz.",
  },
  {
    icon: Globe,
    title: "Globallik",
    description: "Dunya capinda hizmet vererek sinirlari ortadan kaldiriyoruz.",
  },
  {
    icon: Award,
    title: "Mukemmellik",
    description: "Her projede en yuksek kalite standartlarini hedefliyoruz.",
  },
]

export function AboutValues() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Degerlerimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Bizi Biz Yapan Degerler</h2>
          <p className="text-muted-foreground">
            Diamond Visa olarak her gun bu degerlerle hareket ediyor ve sizi en iyi sekilde hizmet vermeyi hedefliyoruz.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <value.icon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
