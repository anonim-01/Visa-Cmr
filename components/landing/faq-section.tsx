"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { FAQ_ITEMS } from "@/lib/constants"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="lg:sticky lg:top-32">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              SSS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Sik Sorulan Sorular</h2>
            <p className="text-muted-foreground mb-8">
              Vize basvuru sureci, eSIM aktivasyonu ve diger hizmetlerimiz hakkinda en cok sorulan sorularin cevaplari.
            </p>
            <p className="text-sm text-muted-foreground">
              Sorunuzun cevabini bulamadınız mi?{" "}
              <a href="/contact" className="text-primary hover:underline">
                Bize ulasin
              </a>
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-foreground pr-4">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                      openIndex === index && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index ? "max-h-96" : "max-h-0",
                  )}
                >
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
