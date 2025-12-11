"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Ahmet Yilmaz",
    role: "Is Insani",
    avatar: "/turkish-business-man-portrait.jpg",
    rating: 5,
    text: "Amerika vizemi Diamond Visa ile aldim. Surecin ne kadar hizli ve kolay olduguna inanamadim. Belgelerimi yukledikten sadece 5 gun sonra vizem elimdeydi. Kesinlikle tavsiye ederim!",
    country: "Amerika",
  },
  {
    id: 2,
    name: "Zeynep Kaya",
    role: "Ogrenci",
    avatar: "/turkish-young-woman-student-portrait.jpg",
    rating: 5,
    text: "Ingiltere ogrenci vizem icin basvurdum. AI sistemi sayesinde belge eksiklerimi hemen gordumi ve duzelttim. Ilk denemede vizem onaylandi. Mukemmel bir hizmet!",
    country: "Ingiltere",
  },
  {
    id: 3,
    name: "Mehmet Demir",
    role: "Yazilimci",
    avatar: "/turkish-man-developer-portrait.jpg",
    rating: 5,
    text: "Almanya is vizesi icin basvurdum. Diamond Visa ekibi her adimda bana yardimci oldu. Randevu ayarlamadan vize alana kadar her sey cok profesyoneldi.",
    country: "Almanya",
  },
  {
    id: 4,
    name: "Ayse Ozturk",
    role: "Turist",
    avatar: "/turkish-woman-traveler-portrait.jpg",
    rating: 5,
    text: "Japonya turisti vizesi aldim. eSIM hizmetini de kullandim. Ulkeye indigimde internet hemen aktifti. Hem vize hem eSIM icin tek adres!",
    country: "Japonya",
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Musteri Yorumlari
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Musterilerimiz Ne Diyor?</h2>
          <p className="text-muted-foreground">50,000'den fazla mutlu musterimizin deneyimlerini okuyun.</p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center z-10">
            <Quote className="h-6 w-6 text-primary" />
          </div>

          {/* Testimonial Card */}
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar and Info */}
              <div className="flex flex-col items-center md:items-start">
                <img
                  src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[activeIndex].name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
                />
                <div className="mt-4 text-center md:text-left">
                  <h4 className="font-semibold text-foreground">{testimonials[activeIndex].name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="flex-1">
                <p className="text-lg text-foreground leading-relaxed mb-4">"{testimonials[activeIndex].text}"</p>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {testimonials[activeIndex].country} Vizesi
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-card border border-border hover:bg-muted transition-colors"
              aria-label="Onceki yorum"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    activeIndex === i ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30",
                  )}
                  aria-label={`Yorum ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-card border border-border hover:bg-muted transition-colors"
              aria-label="Sonraki yorum"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
