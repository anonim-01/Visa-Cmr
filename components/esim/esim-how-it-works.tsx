"use client"

import { ShoppingCart, QrCode, Smartphone, Wifi } from "lucide-react"

const steps = [
  {
    icon: ShoppingCart,
    title: "Paket Secin",
    description: "Gideceginiz ulke veya bolge icin uygun paketi secin.",
  },
  {
    icon: QrCode,
    title: "QR Kod Alin",
    description: "Odeme sonrasi QR kodunuz aninda e-posta ile gonderilir.",
  },
  {
    icon: Smartphone,
    title: "Tarayin",
    description: "Telefonunuzun kamerasi ile QR kodu tarayin.",
  },
  {
    icon: Wifi,
    title: "Baglanin",
    description: "Ulkenize vardiginizda otomatik olarak internete baglanin.",
  },
]

export function EsimHowItWorks() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nasil Calisir?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">4 Kolay Adim</h2>
          <p className="text-muted-foreground">eSIM aktivasyonu sadece birkaç dakika surer.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 shadow-lg">
                <step.icon className="h-9 w-9" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-primary text-primary text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
