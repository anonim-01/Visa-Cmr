"use client"

import { FileText, Search, Calendar, CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Basvuru Formu",
    description:
      "Online formumuzu doldurun ve gerekli bilgilerinizi girin. AI sistemimiz basit ve hizli bir deneyim saglar.",
  },
  {
    number: "02",
    icon: Search,
    title: "Belge Kontrolu",
    description: "Belgelerinizi yukleyin. AI sistemimiz otomatik kontrol yapar ve eksikleri size bildirir.",
  },
  {
    number: "03",
    icon: Calendar,
    title: "Randevu Planlama",
    description: "Uygun randevu tarihlerini secin. Konsolosluk veya vize merkezi randevunuzu biz ayarliyoruz.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Vize Onay",
    description: "Basvurunuzu takip edin. Sonuc geldiginde size hemen bildirim gonderiyoruz.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nasil Calisir?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">4 Kolay Adimda Vize Basvurusu</h2>
          <p className="text-muted-foreground">
            Diamond Visa ile vize basvuru sureci hic bu kadar kolay olmamisti. Adim adim size rehberlik ediyoruz.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border">
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                </div>
              )}

              <div className="relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all">
                {/* Step Number */}
                <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
