"use client"

import { useMemo, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  FileText,
  Globe,
  GraduationCap,
  Loader2,
  ShieldCheck,
  Upload,
  User,
} from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { PageHero } from "@/components/public/page-hero"

interface UploadedFile {
  name: string
  url: string
}

type FormState = {
  fullName: string
  contact: string
  email: string
  address: string
  interestedCountry: string
  university: string
  intake: string
  interestedCourse: string
  lastAcademicQualification: string
  academicScores: string
  englishTest: string
  englishScores: string
  passedYear: string
  yearIntake: string
}

type DocumentState = Record<string, UploadedFile | null>

const steps = [
  { id: 0, label: "Personal", icon: User, description: "Basic profile and contact details" },
  { id: 1, label: "Academic", icon: GraduationCap, description: "Qualification and test records" },
  { id: 2, label: "Targets", icon: Globe, description: "Study plan and destination choices" },
  { id: 3, label: "Documents", icon: ShieldCheck, description: "Upload and submit application" },
]

const documentLabels: Record<string, string> = {
  masterDegree: "Master Degree Certificate",
  bachelorsDegree: "Bachelors Degree Certificate",
  diploma: "Diploma",
  grade12: "Grade 12 Certificate",
  cv: "CV",
  passport: "Passport",
  ielts: "IELTS",
  oxfordELLT: "Oxford (ELLT) English",
  others: "Others",
}

const initialFormData: FormState = {
  fullName: "",
  contact: "",
  email: "",
  address: "",
  interestedCountry: "",
  university: "",
  intake: "",
  interestedCourse: "",
  lastAcademicQualification: "",
  academicScores: "",
  englishTest: "",
  englishScores: "",
  passedYear: "",
  yearIntake: "",
}

const initialDocuments: DocumentState = {
  masterDegree: null,
  bachelorsDegree: null,
  diploma: null,
  grade12: null,
  cv: null,
  passport: null,
  ielts: null,
  oxfordELLT: null,
  others: null,
}

export default function OnlineApplicationPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({})
  const [formData, setFormData] = useState<FormState>(initialFormData)
  const [documents, setDocuments] = useState<DocumentState>(initialDocuments)

  const uploadedCount = useMemo(
    () => Object.values(documents).filter(Boolean).length,
    [documents],
  )

  const progress = ((activeStep + 1) / steps.length) * 100

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileUpload = async (docType: string, file: File) => {
    setUploadingFiles((prev) => ({ ...prev, [docType]: true }))

    try {
      const uploadData = new FormData()
      uploadData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }

      const data = await response.json()

      setDocuments((prev) => ({
        ...prev,
        [docType]: {
          name: data.filename,
          url: data.url,
        },
      }))

      toast.success(`${file.name} uploaded successfully`)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to upload file"
      console.error("Error uploading file:", error)
      toast.error(message)
    } finally {
      setUploadingFiles((prev) => ({ ...prev, [docType]: false }))
    }
  }

  const handleFileDrop = (docType: string, e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileUpload(docType, file)
    }
  }

  const handleFileSelect = (docType: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(docType, file)
    }
  }

  const removeFile = (docType: string) => {
    setDocuments((prev) => ({
      ...prev,
      [docType]: null,
    }))
  }

  const isCurrentStepValid = () => {
    if (activeStep === 0) {
      return formData.fullName.trim() && formData.contact.trim() && formData.email.trim()
    }
    return true
  }

  const handleNext = () => {
    if (!isCurrentStepValid()) {
      toast.error("Please complete Full Name, Contact Number, and Email to continue.")
      return
    }

    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (activeStep < steps.length - 1) {
      handleNext()
      return
    }

    setIsSubmitting(true)

    try {
      const documentUrls: Record<string, string> = {}
      Object.entries(documents).forEach(([key, value]) => {
        if (value) {
          documentUrls[key] = value.url
        }
      })

      const applicationData = {
        ...formData,
        documents: documentUrls,
      }

      const response = await fetch("/api/online-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      toast.success("Your application has been submitted successfully.")
      setFormData(initialFormData)
      setDocuments(initialDocuments)
      setActiveStep(0)
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-0 bg-slate-50">
      <PageHero
        title={
          <>
            Online <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">Application</span>
          </>
        }
        description="Complete your profile step-by-step and submit a verified application package to our counseling team."
        breadcrumbItems={[{ label: "Online Application" }]}
        badge="Guided Application Wizard"
      />

      <section className="relative -mt-14 pb-24">
        <div className="container max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-8">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Step {activeStep + 1} of {steps.length}</p>
                  <h2 className="mt-1 text-lg font-semibold text-slate-900">{steps[activeStep].description}</h2>
                </div>
                <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {uploadedCount} / {Object.keys(documentLabels).length} files uploaded
                </div>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {steps.map((step) => {
                  const Icon = step.icon
                  const isActive = activeStep === step.id
                  const isCompleted = activeStep > step.id

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setActiveStep(step.id)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left transition ${
                        isActive
                          ? "border-slate-900 bg-slate-900 text-white"
                          : isCompleted
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-semibold uppercase tracking-[0.14em]">{step.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_320px]">
              <form onSubmit={handleSubmit} className="space-y-8">
                {activeStep === 0 && (
                  <div className="space-y-6">
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Full Name" required>
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. John Doe"
                          className="h-12 rounded-xl border-slate-300 bg-slate-50"
                          required
                        />
                      </Field>
                      <Field label="Contact Number" required>
                        <Input
                          name="contact"
                          value={formData.contact}
                          onChange={handleChange}
                          placeholder="e.g. +977 9800000000"
                          className="h-12 rounded-xl border-slate-300 bg-slate-50"
                          required
                        />
                      </Field>
                      <Field label="Email" required>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. name@example.com"
                          className="h-12 rounded-xl border-slate-300 bg-slate-50"
                          required
                        />
                      </Field>
                      <Field label="Address">
                        <Input
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="e.g. Kathmandu, Nepal"
                          className="h-12 rounded-xl border-slate-300 bg-slate-50"
                        />
                      </Field>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Last Academic Qualification">
                        <Input
                          name="lastAcademicQualification"
                          value={formData.lastAcademicQualification}
                          onChange={handleChange}
                          placeholder="e.g. Bachelor in CS"
                          className="h-12 rounded-xl border-slate-300 bg-slate-50"
                        />
                      </Field>
                      <Field label="Academic Score (GPA / %)">
                        <Input
                          name="academicScores"
                          value={formData.academicScores}
                          onChange={handleChange}
                          placeholder="e.g. 3.6 / 82%"
                          className="h-12 rounded-xl border-slate-300 bg-slate-50"
                        />
                      </Field>
                      <Field label="English Test">
                        <Input
                          name="englishTest"
                          value={formData.englishTest}
                          onChange={handleChange}
                          placeholder="e.g. IELTS / PTE"
                          className="h-12 rounded-xl border-slate-300 bg-slate-50"
                        />
                      </Field>
                      <Field label="English Score">
                        <Input
                          name="englishScores"
                          value={formData.englishScores}
                          onChange={handleChange}
                          placeholder="e.g. IELTS 7.0"
                          className="h-12 rounded-xl border-slate-300 bg-slate-50"
                        />
                      </Field>
                      <Field label="Passed Year">
                        <Input
                          name="passedYear"
                          value={formData.passedYear}
                          onChange={handleChange}
                          placeholder="e.g. 2024"
                          className="h-12 rounded-xl border-slate-300 bg-slate-50"
                        />
                      </Field>
                      <Field label="Planned Intake Year">
                        <Input
                          name="yearIntake"
                          value={formData.yearIntake}
                          onChange={handleChange}
                          placeholder="e.g. 2026"
                          className="h-12 rounded-xl border-slate-300 bg-slate-50"
                        />
                      </Field>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Interested Country">
                        <Input
                          name="interestedCountry"
                          value={formData.interestedCountry}
                          onChange={handleChange}
                          placeholder="e.g. United Kingdom"
                          className="h-12 rounded-xl border-slate-300 bg-slate-50"
                        />
                      </Field>
                      <Field label="Preferred University">
                        <Input
                          name="university"
                          value={formData.university}
                          onChange={handleChange}
                          placeholder="e.g. University of Manchester"
                          className="h-12 rounded-xl border-slate-300 bg-slate-50"
                        />
                      </Field>
                      <Field label="Target Intake">
                        <Input
                          name="intake"
                          value={formData.intake}
                          onChange={handleChange}
                          placeholder="e.g. September 2026"
                          className="h-12 rounded-xl border-slate-300 bg-slate-50"
                        />
                      </Field>
                      <Field label="Interested Course">
                        <Input
                          name="interestedCourse"
                          value={formData.interestedCourse}
                          onChange={handleChange}
                          placeholder="e.g. MSc Data Science"
                          className="h-12 rounded-xl border-slate-300 bg-slate-50"
                        />
                      </Field>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                      Upload relevant academic and identity documents. You can submit the form even if some files are pending.
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {Object.entries(documentLabels).map(([docType, label]) => {
                        const uploaded = documents[docType]
                        const uploading = uploadingFiles[docType]

                        return (
                          <div key={docType} className="rounded-2xl border border-slate-200 bg-white p-4">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">{label}</p>

                            {uploaded ? (
                              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                                <div className="flex items-start gap-3">
                                  <FileText className="mt-0.5 h-5 w-5 text-emerald-600" />
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-emerald-800">{uploaded.name}</p>
                                    <p className="mt-1 text-xs text-emerald-700">Uploaded successfully</p>
                                  </div>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => removeFile(docType)}
                                  className="mt-3 h-9 rounded-lg border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white"
                                >
                                  Remove file
                                </Button>
                              </div>
                            ) : (
                              <div
                                onDrop={(e) => handleFileDrop(docType, e)}
                                onDragOver={(e) => e.preventDefault()}
                                className="relative rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-red-300 hover:bg-red-50/40"
                              >
                                <input
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={(e) => handleFileSelect(docType, e)}
                                  className="absolute inset-0 cursor-pointer opacity-0"
                                  disabled={uploading}
                                />
                                <Upload className="mx-auto h-8 w-8 text-slate-400" />
                                <p className="mt-2 text-sm font-semibold text-slate-800">
                                  {uploading ? "Uploading..." : "Drop file or click to upload"}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">PDF, DOC, DOCX up to 25MB</p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
                  <Button
                    type="button"
                    onClick={handleBack}
                    disabled={activeStep === 0 || isSubmitting}
                    variant="outline"
                    className="h-11 rounded-xl border-slate-300 px-5"
                  >
                    Back
                  </Button>

                  {activeStep < steps.length - 1 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={isSubmitting}
                      className="h-11 rounded-xl bg-slate-900 px-5 text-white hover:bg-red-600"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 rounded-xl bg-slate-900 px-6 text-white hover:bg-red-600"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <CheckCircle2 className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>

              <aside className="space-y-4 lg:sticky lg:top-24">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    <Bell className="h-3.5 w-3.5" />
                    Application Notes
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      Keep your contact details accurate for follow-up.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      Upload documents in clear and readable format.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      After submission, our team will review and contact you.
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-red-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">Need help?</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    If you are unsure about course or destination, submit anyway and our counselor will guide your next steps.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="ml-1 text-red-600">*</span> : null}
      </label>
      {children}
    </div>
  )
}
