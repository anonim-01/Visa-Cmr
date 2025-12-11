"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { Logo } from "@/components/logo"
import { COMPANY_INFO, SERVICES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  hizmetler: SERVICES.map((s) => ({ name: s.title, href: s.href })),
  sirket: [
    { name: "Hakkimizda", href: "/about" },
    { name: "Kariyer", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Basin", href: "/press" },
  ],
  destek: [
    { name: "Yardim Merkezi", href: "/help" },
    { name: "SSS", href: "/faq" },
    { name: "Iletisim", href: "/contact" },
    { name: "Canli Destek", href: "/chat" },
  ],
  yasal: [
    { name: "Gizlilik Politikasi", href: "/privacy" },
    { name: "Kullanim Kosullari", href: "/terms" },
    { name: "KVKK", href: "/kvkk" },
    { name: "Cerez Politikasi", href: "/cookies" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: COMPANY_INFO.social.facebook },
  { name: "Instagram", icon: Instagram, href: COMPANY_INFO.social.instagram },
  { name: "Twitter", icon: Twitter, href: COMPANY_INFO.social.twitter },
  { name: "LinkedIn", icon: Linkedin, href: COMPANY_INFO.social.linkedin },
  { name: "YouTube", icon: Youtube, href: COMPANY_INFO.social.youtube },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo size="lg" showText={true} />
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{COMPANY_INFO.description}</p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href={`tel:${COMPANY_INFO.contact.phone}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                {COMPANY_INFO.contact.phone}
              </a>
              <a
                href={`mailto:${COMPANY_INFO.contact.email}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {COMPANY_INFO.contact.email}
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {COMPANY_INFO.contact.address}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Hizmetler</h4>
            <ul className="space-y-3">
              {footerLinks.hizmetler.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Sirket</h4>
            <ul className="space-y-3">
              {footerLinks.sirket.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Destek</h4>
            <ul className="space-y-3">
              {footerLinks.destek.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Yasal</h4>
            <ul className="space-y-3">
              {footerLinks.yasal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h4 className="font-semibold text-foreground">Bultenimize Abone Olun</h4>
              <p className="text-sm text-muted-foreground mt-1">Vize haberleri ve ozel firsatlardan haberdar olun</p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <Input type="email" placeholder="E-posta adresiniz" className="lg:w-64" />
              <Button>Abone Ol</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Tum haklari saklidir.
            </p>
            <div className="flex items-center gap-4">
              <span>MERSIS No: {COMPANY_INFO.legal.mersisNo}</span>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <a
        href={`https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/\s/g, "").replace(/\+/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
        aria-label="WhatsApp ile iletisime gecin"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </footer>
  )
}
