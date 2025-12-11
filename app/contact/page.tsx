import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"

export const metadata = {
  title: "Iletisim - Diamond Visa",
  description: "Diamond Visa ile iletisime gecin. Vize danismanligi ve destek icin bize ulasin.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 lg:pt-40 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Iletisim
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Bizimle Iletisime Gecin</h1>
            <p className="text-muted-foreground text-lg">
              Sorulariniz icin bize ulasin. Uzman ekibimiz en kisa surede size donecek.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
