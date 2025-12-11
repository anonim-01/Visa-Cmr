"use client"

import type React from "react"

import { useState } from "react"
import { Search, CheckCircle, Clock, FileText, Calendar, AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const mockApplication = {
  id: "DV-2024-123456",
  applicant: "Ahmet Yilmaz",
  country: "Amerika",
  type: "Turistik Vize",
  status: "DOCUMENT_REVIEW",
  submittedAt: "2024-01-15",
  timeline: [
    { status: "SUBMITTED", date: "2024-01-15", completed: true },
    { status: "DOCUMENT_REVIEW", date: "2024-01-16", completed: true },
    { status: "EXPERT_REVIEW", date: null, completed: false },
    { status: "CONSULATE", date: null, completed: false },
    { status: "COMPLETED", date: null, completed: false },
  ],
}

const statusLabels: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  SUBMITTED: { label: "Basvuru Alindi", icon: FileText, color: "text-blue-500" },
  DOCUMENT_REVIEW: { label: "Belge Incelemede", icon: Search, color: "text-yellow-500" },
  EXPERT_REVIEW: { label: "Uzman Incelemede", icon: Clock, color: "text-purple-500" },
  CONSULATE: { label: "Konsoloslukta", icon: Calendar, color: "text-indigo-500" },
  COMPLETED: { label: "Tamamlandi", icon: CheckCircle, color: "text-green-500" },
  REJECTED: { label: "Reddedildi", icon: AlertTriangle, color: "text-red-500" },
}

export function VisaTracker() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [application, setApplication] = useState<typeof mockApplication | null>(null)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setError("")

    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (searchQuery.includes("DV-") || searchQuery.includes("@")) {
      setApplication(mockApplication)
    } else {
      setError("Basvuru bulunamadi. Lutfen basvuru numaranizi veya e-posta adresinizi kontrol edin.")
      setApplication(null)
    }

    setIsSearching(false)
  }

  return (
    <div>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-card rounded-2xl p-6 border border-border mb-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Basvuru Numarasi veya E-posta</Label>
            <div className="flex gap-3">
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="DV-2024-XXXXXX veya ornek@email.com"
                required
              />
              <Button type="submit" disabled={isSearching}>
                {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </form>

      {/* Application Status */}
      {application && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {/* Header */}
          <div className="bg-primary/5 p-6 border-b border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Basvuru Numarasi</p>
                <p className="text-xl font-bold font-mono text-foreground">{application.id}</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                  {statusLabels[application.status]?.label}
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Basvuru Sahibi</p>
                <p className="font-medium text-foreground">{application.applicant}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hedef Ulke</p>
                <p className="font-medium text-foreground">{application.country}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Vize Turu</p>
                <p className="font-medium text-foreground">{application.type}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Basvuru Sureci</h3>
              <div className="relative">
                {application.timeline.map((step, index) => {
                  const statusInfo = statusLabels[step.status]
                  const Icon = statusInfo?.icon || Clock
                  return (
                    <div key={index} className="flex gap-4 pb-6 last:pb-0">
                      {/* Line */}
                      {index < application.timeline.length - 1 && (
                        <div
                          className={cn(
                            "absolute left-5 top-10 w-0.5 h-[calc(100%-40px)]",
                            step.completed ? "bg-primary" : "bg-border",
                          )}
                          style={{ top: `${index * 64 + 40}px`, height: "24px" }}
                        />
                      )}

                      {/* Icon */}
                      <div
                        className={cn(
                          "relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                          step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <p className={cn("font-medium", step.completed ? "text-foreground" : "text-muted-foreground")}>
                          {statusInfo?.label}
                        </p>
                        {step.date && <p className="text-sm text-muted-foreground">{step.date}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
