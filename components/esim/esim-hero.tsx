"use client"

import Link from "next/link"
import { ArrowRight, Wifi, Globe, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  { icon: Globe, text: "190+ Ulke" },
  { icon: Zap, text: "Aninda Aktivasyon" },
  { icon: Wifi, text: "Yuksek Hiz" },
]

export function EsimHero() {
  return (
    <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Global eSIM
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Dunyanin Her Yerinde <span className="text-primary">Internet</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Roaming derdi olmadan, ulkenize indiginiz anda internete baglanin. 190'dan fazla ulkede gecerli eSIM
              paketleri.
            </p>

            <div className="flex flex-wrap gap-6 mb-10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-muted-foreground">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="btn-shine">
                <Link href="#plans">
                  Paketleri Incele
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent">
                <Link href="/esim/check">Cihaz Uyumlulugu</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square max-w-md mx-auto">
              <img
                src="/smartphone-esim-global-network-connection.jpg"
                alt="eSIM Global Baglanti"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl p-4 border border-border">
                <p className="text-3xl font-bold text-primary mb-1">190+</p>
                <p className="text-sm text-muted-foreground">Desteklenen Ulke</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
