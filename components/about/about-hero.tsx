"use client"

import { Building, Globe, Users, Award } from "lucide-react"

const stats = [
  { icon: Building, value: "2024", label: "Kurulus Yili" },
  { icon: Globe, value: "50+", label: "Ulke" },
  { icon: Users, value: "50,000+", label: "Mutlu Musteri" },
  { icon: Award, value: "%94", label: "Basari Orani" },
]

export function AboutHero() {
  return (
    <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Hakkimizda
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Diamond <span className="text-primary">Visa</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Dunyanin Kapilarini Acan, AI Destekli Akilli Vize Yonetim Sistemi
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
