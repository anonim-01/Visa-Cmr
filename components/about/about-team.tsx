"use client"

import { Linkedin, Twitter, Mail } from "lucide-react"

const team = [
  {
    name: "Ali Yildirim",
    role: "Kurucu & CEO",
    image: "/professional-turkish-man-ceo-portrait.jpg",
    bio: "15 yillik turizm ve teknoloji deneyimi",
    social: { linkedin: "#", twitter: "#", email: "ali@diamondvisa.com" },
  },
  {
    name: "Selin Aksoy",
    role: "Operasyon Direktoru",
    image: "/professional-turkish-woman-director-portrait.jpg",
    bio: "Uluslararasi vize operasyonlarinda 10 yil tecrube",
    social: { linkedin: "#", twitter: "#", email: "selin@diamondvisa.com" },
  },
  {
    name: "Emre Koc",
    role: "Teknoloji Direktoru",
    image: "/professional-turkish-man-tech-director-portrait.jpg",
    bio: "AI ve yazilim gelistirmede 12 yillik deneyim",
    social: { linkedin: "#", twitter: "#", email: "emre@diamondvisa.com" },
  },
  {
    name: "Deniz Celik",
    role: "Musteri Iliskileri Muduru",
    image: "/professional-turkish-woman-customer-service-portra.jpg",
    bio: "Musteri deneyimi ve destek hizmetlerinde uzman",
    social: { linkedin: "#", twitter: "#", email: "deniz@diamondvisa.com" },
  },
]

export function AboutTeam() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Ekibimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Uzman Ekibimizle Tanışin</h2>
          <p className="text-muted-foreground">
            Deneyimli ve tutkulu ekibimiz, size en iyi hizmeti sunmak icin calisıyor.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all group"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  <a
                    href={member.social.linkedin}
                    className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
