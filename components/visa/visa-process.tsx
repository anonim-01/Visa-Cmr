"use client"

import { FileText, Upload, Search, Calendar, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "Basvuru Formu",
    description: "Online formu doldurun ve kisisel bilgilerinizi girin.",
  },
  {
    icon: Upload,
    title: "Belge Yukleme",
    description: "Gerekli belgelerinizi sisteme yukleyin.",
  },
  {
    icon: Search,
    title: "AI Kontrol",
    description: "Yapay zeka belgelerinizi kontrol eder ve eksikleri bildirir.",
  },
  {
    icon: Calendar,
    title: "Randevu",
    description: "Konsolosluk veya vize merkezi randevunuzu alin.",
  },
  {
    icon: CheckCircle,
    title: "Sonuc",
    description: "Vize sonucunuzu takip edin ve pasaportunuzu teslim alin.",
  },
]

export function VisaProcess() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Basvuru Sureci
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nasil Calisir?</h2>
          <p className="text-muted-foreground">5 kolay adimda vize basvurunuzu tamamlayin.</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Step Number */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <step.icon className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
