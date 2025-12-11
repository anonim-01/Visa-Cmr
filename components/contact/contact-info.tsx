"use client"

import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { COMPANY_INFO } from "@/lib/constants"

const contactItems = [
  {
    icon: Phone,
    title: "Telefon",
    content: COMPANY_INFO.contact.phone,
    href: `tel:${COMPANY_INFO.contact.phone}`,
    description: "Pazartesi - Cuma: 09:00 - 18:00",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    content: COMPANY_INFO.contact.whatsapp,
    href: `https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/\s/g, "").replace(/\+/g, "")}`,
    description: "7/24 Destek",
  },
  {
    icon: Mail,
    title: "E-posta",
    content: COMPANY_INFO.contact.email,
    href: `mailto:${COMPANY_INFO.contact.email}`,
    description: "24 saat icinde yanit",
  },
  {
    icon: MapPin,
    title: "Adres",
    content: COMPANY_INFO.contact.address,
    href: "#",
    description: "Merkez Ofis",
  },
]

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Iletisim Bilgileri</h3>
        <div className="space-y-4">
          {contactItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-primary">{item.content}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Working Hours */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Calisma Saatleri</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pazartesi - Cuma</span>
            <span className="text-foreground font-medium">09:00 - 18:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cumartesi</span>
            <span className="text-foreground font-medium">10:00 - 14:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pazar</span>
            <span className="text-foreground font-medium">Kapali</span>
          </div>
          <div className="pt-2 mt-2 border-t border-border">
            <span className="text-primary font-medium">WhatsApp: 7/24 Acik</span>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-card rounded-2xl overflow-hidden border border-border">
        <div className="aspect-video bg-muted flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Harita Yakinda</p>
          </div>
        </div>
      </div>
    </div>
  )
}
