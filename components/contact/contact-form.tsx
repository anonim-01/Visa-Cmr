"use client"

import type React from "react"

import { useState } from "react"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const subjects = [
  { value: "visa", label: "Vize Danismanligi" },
  { value: "esim", label: "eSIM Hizmetleri" },
  { value: "rental", label: "Arac Kiralama" },
  { value: "tour", label: "Tur ve Tatil" },
  { value: "support", label: "Teknik Destek" },
  { value: "other", label: "Diger" },
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-card rounded-2xl p-8 border border-border text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
          <Send className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Mesajiniz Alindi!</h3>
        <p className="text-muted-foreground">En kisa surede sizinle iletisime gececegiz. Tesekkur ederiz.</p>
        <Button className="mt-6 bg-transparent" variant="outline" onClick={() => setSubmitted(false)}>
          Yeni Mesaj Gonder
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 border border-border">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Bize Yazin</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Adiniz Soyadiniz *</Label>
          <Input id="name" placeholder="Adiniz Soyadiniz" required />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">E-posta Adresiniz *</Label>
          <Input id="email" type="email" placeholder="ornek@email.com" required />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon Numaraniz</Label>
          <Input id="phone" type="tel" placeholder="+90 5XX XXX XX XX" />
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject">Konu *</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Konu Secin" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.value} value={subject.value}>
                  {subject.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="message">Mesajiniz *</Label>
          <Textarea id="message" placeholder="Mesajinizi buraya yazin..." rows={5} required />
        </div>

        {/* Privacy */}
        <div className="md:col-span-2">
          <label className="flex items-start gap-3">
            <input type="checkbox" required className="mt-1" />
            <span className="text-sm text-muted-foreground">
              <a href="/privacy" className="text-primary hover:underline">
                Gizlilik Politikasi
              </a>
              'ni okudum ve kabul ediyorum. *
            </span>
          </label>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Gonderiliyor...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Mesaj Gonder
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
