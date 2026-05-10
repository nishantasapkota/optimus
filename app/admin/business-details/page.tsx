"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Save, Plus, X, Globe, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"
import { normalizeBusinessOffices, type BusinessOffice } from "@/lib/business-contact"

type BusinessDetailsForm = {
  name: string
  logo: string
  address: string
  emails: string[]
  phones: string[]
  offices: BusinessOffice[]
  socialLinks: {
    facebook: string
    twitter: string
    linkedin: string
    instagram: string
    youtube: string
  }
}

const emptyOffice: BusinessOffice = {
  label: "",
  address: "",
  emails: [],
  phones: [""],
}

export default function BusinessDetailsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [details, setDetails] = useState<BusinessDetailsForm>({
    name: "Synergy Scholars",
    logo: "",
    address: "",
    emails: ["info@synergyscholars.com"],
    phones: ["+977 9800000000"],
    offices: [{ ...emptyOffice, label: "Head Office" }],
    socialLinks: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      youtube: ""
    }
  })

  useEffect(() => {
    fetchDetails()
  }, [])

  async function fetchDetails() {
    try {
      const res = await fetch("/api/business-details")
      const data = await res.json()
      if (data.details) {
        const normalizedOffices = normalizeBusinessOffices(data.details)

        setDetails({
          ...data.details,
          emails: data.details.emails || [],
          phones: data.details.phones || [],
          offices: normalizedOffices.length > 0 ? normalizedOffices : [{ ...emptyOffice, label: "Head Office" }],
          socialLinks: {
            facebook: data.details.socialLinks?.facebook || "",
            twitter: data.details.socialLinks?.twitter || "",
            linkedin: data.details.socialLinks?.linkedin || "",
            instagram: data.details.socialLinks?.instagram || "",
            youtube: data.details.socialLinks?.youtube || ""
          }
        })
      }
    } catch (error) {
      toast.error("Failed to load business details")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const offices = details.offices
      .map((office) => ({
        label: office.label.trim() || "Office",
        address: office.address.trim(),
        phones: office.phones.map((phone) => phone.trim()).filter(Boolean),
        emails: office.emails.map((email) => email.trim()).filter(Boolean),
      }))
      .filter((office) => office.address || office.phones.length > 0 || office.emails.length > 0)
    const fallbackPhones = details.phones.map((phone) => phone.trim()).filter(Boolean)
    const fallbackEmails = details.emails.map((email) => email.trim()).filter(Boolean)
    const payload = {
      ...details,
      offices,
      phones: fallbackPhones.length > 0 ? fallbackPhones : offices.flatMap((office) => office.phones),
      emails: fallbackEmails.length > 0 ? fallbackEmails : offices.flatMap((office) => office.emails),
      address: offices.map((office) => `${office.label}: ${office.address}`).join("\n"),
    }

    try {
      const res = await fetch("/api/business-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        toast.success("Business details updated successfully")
      } else {
        toast.error("Failed to update details")
      }
    } catch (error) {
      toast.error("An error occurred while saving")
    } finally {
      setSaving(false)
    }
  }

  const addItem = (field: 'emails' | 'phones') => {
    setDetails({
      ...details,
      [field]: [...details[field], ""]
    })
  }

  const removeItem = (field: 'emails' | 'phones', index: number) => {
    const newList = [...details[field]]
    newList.splice(index, 1)
    setDetails({ ...details, [field]: newList })
  }

  const updateItem = (field: 'emails' | 'phones', index: number, value: string) => {
    const newList = [...details[field]]
    newList[index] = value
    setDetails({ ...details, [field]: newList })
  }

  const addOffice = () => {
    setDetails({
      ...details,
      offices: [...details.offices, { ...emptyOffice }],
    })
  }

  const removeOffice = (index: number) => {
    const offices = [...details.offices]
    offices.splice(index, 1)
    setDetails({ ...details, offices: offices.length > 0 ? offices : [{ ...emptyOffice, label: "Head Office" }] })
  }

  const updateOffice = (index: number, field: "label" | "address", value: string) => {
    const offices = [...details.offices]
    offices[index] = { ...offices[index], [field]: value }
    setDetails({ ...details, offices })
  }

  const addOfficeItem = (officeIndex: number, field: "phones" | "emails") => {
    const offices = [...details.offices]
    offices[officeIndex] = {
      ...offices[officeIndex],
      [field]: [...offices[officeIndex][field], ""],
    }
    setDetails({ ...details, offices })
  }

  const removeOfficeItem = (officeIndex: number, field: "phones" | "emails", itemIndex: number) => {
    const offices = [...details.offices]
    const items = [...offices[officeIndex][field]]
    items.splice(itemIndex, 1)
    offices[officeIndex] = { ...offices[officeIndex], [field]: items }
    setDetails({ ...details, offices })
  }

  const updateOfficeItem = (officeIndex: number, field: "phones" | "emails", itemIndex: number, value: string) => {
    const offices = [...details.offices]
    const items = [...offices[officeIndex][field]]
    items[itemIndex] = value
    offices[officeIndex] = { ...offices[officeIndex], [field]: items }
    setDetails({ ...details, offices })
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 p-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Business Details</h1>
        <p className="text-muted-foreground mt-1">Manage global site details, contact info and social links.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General Info
            </CardTitle>
            <CardDescription>Main identity of your business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Business Name</label>
                <Input 
                  value={details.name}
                  onChange={(e) => setDetails({ ...details, name: e.target.value })}
                  placeholder="e.g. Synergy Scholars"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Logo URL</label>
                <Input 
                  value={details.logo}
                  onChange={(e) => setDetails({ ...details, logo: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-500" />
                Office Locations
              </CardTitle>
              <CardDescription>Add each address with its relevant phone numbers and emails.</CardDescription>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addOffice}>
              <Plus className="h-4 w-4 mr-1" /> Add Office
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4">
            {details.offices.map((office, officeIndex) => (
              <div key={officeIndex} className="rounded-xl border bg-muted/20 p-4 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid flex-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Office Name</label>
                      <Input
                        value={office.label}
                        onChange={(e) => updateOffice(officeIndex, "label", e.target.value)}
                        placeholder="Head Office"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Address</label>
                      <Textarea
                        value={office.address}
                        onChange={(e) => updateOffice(officeIndex, "address", e.target.value)}
                        placeholder="Putalisadak, Kathmandu, Nepal"
                        required
                      />
                    </div>
                  </div>
                  {details.offices.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeOffice(officeIndex)}>
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Office Phones</label>
                      <Button type="button" variant="ghost" size="sm" onClick={() => addOfficeItem(officeIndex, "phones")}>
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    {office.phones.map((phone, phoneIndex) => (
                      <div key={phoneIndex} className="flex gap-2">
                        <Input
                          value={phone}
                          onChange={(e) => updateOfficeItem(officeIndex, "phones", phoneIndex, e.target.value)}
                          placeholder="+977 1234567890"
                        />
                        {office.phones.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeOfficeItem(officeIndex, "phones", phoneIndex)}>
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Office Emails <span className="text-muted-foreground">(optional)</span></label>
                      <Button type="button" variant="ghost" size="sm" onClick={() => addOfficeItem(officeIndex, "emails")}>
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    {office.emails.length === 0 ? (
                      <p className="rounded-lg border border-dashed bg-background px-3 py-2 text-sm text-muted-foreground">
                        No email added for this branch.
                      </p>
                    ) : (
                      office.emails.map((email, emailIndex) => (
                        <div key={emailIndex} className="flex gap-2">
                          <Input
                            value={email}
                            onChange={(e) => updateOfficeItem(officeIndex, "emails", emailIndex, e.target.value)}
                            placeholder="info@example.com"
                            type="email"
                          />
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeOfficeItem(officeIndex, "emails", emailIndex)}>
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Emails */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-500" />
                  Fallback Emails
                </CardTitle>
                <CardDescription>General emails for legacy/footer contact display.</CardDescription>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => addItem('emails')}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {details.emails.map((email, index) => (
                <div key={index} className="flex gap-2">
                  <Input 
                    value={email}
                    onChange={(e) => updateItem('emails', index, e.target.value)}
                    placeholder="info@example.com"
                    type="email"
                  />
                  {details.emails.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeItem('emails', index)}>
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Phones */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-green-500" />
                  Fallback Phone Numbers
                </CardTitle>
                <CardDescription>General numbers for legacy/footer contact display.</CardDescription>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => addItem('phones')}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {details.phones.map((phone, index) => (
                <div key={index} className="flex gap-2">
                  <Input 
                    value={phone}
                    onChange={(e) => updateItem('phones', index, e.target.value)}
                    placeholder="+977 1234567890"
                  />
                  {details.phones.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeItem('phones', index)}>
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>URLs to your social media profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-blue-600" /> Facebook
                </label>
                <Input 
                  value={details.socialLinks.facebook}
                  onChange={(e) => setDetails({ ...details, socialLinks: { ...details.socialLinks, facebook: e.target.value } })}
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-sky-500" /> X (Twitter)
                </label>
                <Input 
                  value={details.socialLinks.twitter}
                  onChange={(e) => setDetails({ ...details, socialLinks: { ...details.socialLinks, twitter: e.target.value } })}
                  placeholder="https://x.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-blue-700" /> LinkedIn
                </label>
                <Input 
                  value={details.socialLinks.linkedin}
                  onChange={(e) => setDetails({ ...details, socialLinks: { ...details.socialLinks, linkedin: e.target.value } })}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-600" /> Instagram
                </label>
                <Input 
                  value={details.socialLinks.instagram}
                  onChange={(e) => setDetails({ ...details, socialLinks: { ...details.socialLinks, instagram: e.target.value } })}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-600" /> YouTube
                </label>
                <Input 
                  value={details.socialLinks.youtube}
                  onChange={(e) => setDetails({ ...details, socialLinks: { ...details.socialLinks, youtube: e.target.value } })}
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full h-12 text-lg" disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
          Save Business Details
        </Button>
      </form>
    </div>
  )
}
