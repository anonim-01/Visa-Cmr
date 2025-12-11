"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqItems = [
  {
    question: "eSIM nedir?",
    answer:
      "eSIM (embedded SIM), fiziksel SIM kart yerine telefonunuza dijital olarak yuklenen bir SIM karttir. Fiziksel kart degistirme gerekmmeden farkli operatorlere gecis yapabilirsiniz.",
  },
  {
    question: "Telefonum eSIM destekliyor mu?",
    answer:
      "iPhone XS ve sonrasi tum iPhone modelleri, Samsung Galaxy S20 ve sonrasi, Google Pixel 3 ve sonrasi cihazlar eSIM desteklemektedir. Ayarlar > Hucresel > eSIM Ekle bolumunden kontrol edebilirsiniz.",
  },
  {
    question: "eSIM nasil aktive edilir?",
    answer:
      "Satin aldiktan sonra size gonderilen QR kodu telefonunuzun kamerasi ile tarayin. Ekrandaki talimatlari takip ederek birkaç dakika icinde aktivasyon tamamlanir.",
  },
  {
    question: "Birden fazla eSIM kullanabilir miyim?",
    answer:
      "Evet, cogu telefon birden fazla eSIM profilini destekler. Ancak ayni anda yalnizca bir eSIM aktif olabilir. Profiller arasinda kolayca gecis yapabilirsiniz.",
  },
  {
    question: "Paketim biterse ne olur?",
    answer:
      "Paketiniz bittiginde internet erisimi duracaktir. Yeni bir paket satin alarak veya mevcut paketi yukseltereK devam edebilirsiniz.",
  },
]

export function EsimFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              SSS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Sik Sorulan Sorular</h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-foreground pr-4">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform",
                      openIndex === index && "rotate-180",
                    )}
                  />
                </button>
                <div className={cn("overflow-hidden transition-all", openIndex === index ? "max-h-96" : "max-h-0")}>
                  <p className="px-5 pb-5 text-muted-foreground">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
