"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, X, FileText, Sparkles, ShieldCheck, GraduationCap, MapPin, Globe, ArrowRight, Bell } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { PageHero } from "@/components/public/page-hero"

interface UploadedFile {
  name: string
  url: string
}

export default function OnlineApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({})
  
  const [formData, setFormData] = useState({
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
  })

  const [documents, setDocuments] = useState<Record<string, UploadedFile | null>>({
    masterDegree: null,
    bachelorsDegree: null,
    diploma: null,
    grade12: null,
    cv: null,
    passport: null,
    ielts: null,
    oxfordELLT: null,
    others: null,
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileUpload = async (docType: string, file: File) => {
    setUploadingFiles(prev => ({ ...prev, [docType]: true }))

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }

      const data = await response.json()
      
      setDocuments(prev => ({
        ...prev,
        [docType]: {
          name: data.filename,
          url: data.url
        }
      }))

      toast.success(`${file.name} uploaded successfully`)
    } catch (error: any) {
      console.error("Error uploading file:", error)
      toast.error(error.message || "Failed to upload file")
    } finally {
      setUploadingFiles(prev => ({ ...prev, [docType]: false }))
    }
  }

  const handleFileDrop = (docType: string, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileUpload(docType, file)
    }
  }

  const handleFileSelect = (docType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(docType, file)
    }
  }

  const removeFile = (docType: string) => {
    setDocuments(prev => ({
      ...prev,
      [docType]: null
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        documents: documentUrls
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

      setFormData({
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
      })
      setDocuments({
        masterDegree: null,
        bachelorsDegree: null,
        diploma: null,
        grade12: null,
        cv: null,
        passport: null,
        ielts: null,
        oxfordELLT: null,
        others: null,
      })
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  return (
    <div className="flex flex-col gap-0 bg-transparent">
      <PageHero 
        title={<>Apply <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">Online</span></>}
        description="Start your journey today. Our strategic application portal ensures your details reach global institutions with precision."
        breadcrumbItems={[{ label: "Application Portal" }]}
        badge="Secure Application Portal"
      />

      {/* Main Form Content */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="container max-w-6xl">
          <div className="mb-20 text-center animate-in fade-in duration-700">
            <span className="text-rose-500 font-semibold uppercase tracking-[0.35em] text-xs mb-4 block">Direct Channel</span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-4">Strategic <span className="text-rose-500 underline decoration-rose-200 underline-offset-4">Enrollment</span></h2>
            <p className="text-slate-500 text-base md:text-lg font-medium">Transform your global education dreams into a verified reality.</p>
          </div>

          {/* Layout Container - NO transform here */}
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Sidebar Navigation - Sticky (outside form & motion) */}
            <aside className="lg:w-80 h-fit shrink-0 space-y-8 lg:sticky lg:top-24 self-start">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-5 rounded-[1.5rem] bg-slate-900 text-white shadow-lg shadow-slate-900/20 border border-white/10 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="font-semibold uppercase tracking-[0.3em] text-[10px]">Application Process</span>
                </div>
                {[
                  { label: "Personal Intelligence", icon: Users, id: "personal" },
                  { label: "Academic Foundation", icon: GraduationCap, id: "academic" },
                  { label: "Global Targets", icon: Globe, id: "targets" },
                  { label: "Document Verification", icon: ShieldCheck, id: "documents" }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center gap-3 p-5 rounded-[1.5rem] bg-white text-slate-600 font-semibold uppercase tracking-[0.22em] text-[10px] border border-slate-200 shadow-sm transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 group"
                  >
                    <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Bell className="w-12 h-12 text-rose-500" />
                </div>
                <h4 className="text-rose-500 font-semibold text-xs mb-3 uppercase tracking-[0.25em]">Support Line</h4>
                <p className="text-slate-900 font-semibold text-xl mb-4">Need help?</p>
                <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6">Our specialist mentors are available to guide you through the submission process.</p>
                <div className="w-12 h-1 bg-rose-200 rounded-full" />
              </div>
            </aside>

            {/* Form Content - motion.divs can live here safely */}
            <form onSubmit={handleSubmit} className="flex-1 space-y-24">
              {/* General Section */}
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} id="personal" className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white border border-slate-200 rounded-[1.5rem] flex items-center justify-center text-slate-900 shadow-sm">
                    <Users className="w-7 h-7" />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Personal Profile</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-600 ml-1">Full Legal Name</label>
                    <Input 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Johnathan Doe" 
                      className="bg-white h-16 rounded-2xl border border-slate-200 px-6 text-sm font-semibold text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100 transition-all outline-none" 
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-600 ml-1">Contact Number</label>
                    <Input 
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="e.g. +977 4820 900" 
                      className="bg-white h-16 rounded-2xl border border-slate-200 px-6 text-sm font-semibold text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100 transition-all outline-none" 
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-600 ml-1">Email Address</label>
                    <Input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="e.g. jdoe@example.com" 
                      className="bg-white h-16 rounded-2xl border border-slate-200 px-6 text-sm font-semibold text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100 transition-all outline-none" 
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-600 ml-1">Permanent Address</label>
                    <Input 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. Kathmandu, Nepal" 
                      className="bg-white h-16 rounded-2xl border border-slate-200 px-6 text-sm font-semibold text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100 transition-all outline-none" 
                    />
                  </div>
                </div>
              </motion.div>

              {/* Academic History */}
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} id="academic" className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white border border-rose-200 rounded-[1.5rem] flex items-center justify-center text-rose-600 shadow-sm">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Academic Targets</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-600 ml-1">Last Academic Qualification</label>
                    <Input 
                      name="lastAcademicQualification"
                      value={formData.lastAcademicQualification}
                      onChange={handleChange}
                      placeholder="e.g. Bachelor's in CS" 
                      className="bg-white h-16 rounded-2xl border border-slate-200 px-6 text-sm font-semibold text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-600 ml-1">Academic Scores (GPA/%)</label>
                    <Input 
                      name="academicScores"
                      value={formData.academicScores}
                      onChange={handleChange}
                      placeholder="e.g. 3.8 / 85%" 
                      className="bg-white h-16 rounded-2xl border border-slate-200 px-6 text-sm font-semibold text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-600 ml-1">English Proficiency Test</label>
                    <Input 
                      name="englishTest"
                      value={formData.englishTest}
                      onChange={handleChange}
                      placeholder="e.g. IELTS / PTE" 
                      className="bg-white h-16 rounded-2xl border border-slate-200 px-6 text-sm font-semibold text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-600 ml-1">Test Scores</label>
                    <Input 
                      name="englishScores"
                      value={formData.englishScores}
                      onChange={handleChange}
                      placeholder="e.g. 7.5 Overall" 
                      className="bg-white h-16 rounded-2xl border border-slate-200 px-6 text-sm font-semibold text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100 transition-all outline-none" 
                    />
                  </div>
                </div>
              </motion.div>

              {/* Study Targets */}
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} id="targets" className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white border border-slate-200 rounded-[1.25rem] flex items-center justify-center text-slate-900 shadow-sm">
                    <Globe className="w-7 h-7" />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Global Targets</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-600 ml-1">Destination Country</label>
                    <Input 
                      name="interestedCountry"
                      value={formData.interestedCountry}
                      onChange={handleChange}
                      placeholder="e.g. United Kingdom" 
                      className="bg-white h-16 rounded-2xl border border-slate-200 px-6 text-sm font-semibold text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-600 ml-1">Preferred University</label>
                    <Input 
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      placeholder="e.g. University of Manchester" 
                      className="bg-white h-16 rounded-2xl border border-slate-200 px-6 text-sm font-semibold text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-600 ml-1">Target Intake</label>
                    <Input 
                      name="intake"
                      value={formData.intake}
                      onChange={handleChange}
                      placeholder="e.g. September 2025" 
                      className="bg-white h-16 rounded-2xl border border-slate-200 px-6 text-sm font-semibold text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-600 ml-1">Interested Course</label>
                    <Input 
                      name="interestedCourse"
                      value={formData.interestedCourse}
                      onChange={handleChange}
                      placeholder="e.g. MBA / MSc Data Science" 
                      className="bg-white h-16 rounded-2xl border border-slate-200 px-6 text-sm font-semibold text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100 transition-all outline-none" 
                    />
                  </div>
                </div>
              </motion.div>

              {/* Documents */}
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} id="documents" className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white border border-rose-200 rounded-[1.5rem] flex items-center justify-center text-rose-600 shadow-sm">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Document Verification</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(documentLabels).map(([docType, label]) => (
                    <div key={docType} className="group flex flex-col p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-rose-200 hover:shadow-lg transition-all duration-300">
                      <h4 className="font-semibold text-slate-700 text-sm mb-6 uppercase tracking-[0.25em]">{label}</h4>
                      
                      {documents[docType] ? (
                        <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-6 flex flex-col items-center text-center gap-4">
                          <FileText className="h-10 w-10 text-emerald-600" />
                          <div className="space-y-1">
                            <span className="text-slate-900 font-semibold text-sm block truncate max-w-[200px]">
                              {documents[docType]!.name}
                            </span>
                            <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-[0.25em]">Verified Ready</span>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeFile(docType)}
                            className="bg-white hover:bg-emerald-600 hover:text-white border-emerald-200 text-emerald-600 rounded-xl px-6 h-10 transition-all font-semibold"
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div
                          onDrop={(e) => handleFileDrop(docType, e)}
                          onDragOver={(e) => e.preventDefault()}
                          className="relative flex-1 border-2 border-dashed border-slate-200 rounded-[1.5rem] p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-rose-400 hover:bg-rose-50/40 transition-all duration-300"
                        >
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileSelect(docType, e)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            disabled={uploadingFiles[docType]}
                          />
                          <Upload className="w-10 h-10 text-slate-300 mb-4 group-hover:text-rose-500 group-hover:scale-110 transition-all duration-500" />
                          {uploadingFiles[docType] ? (
                            <p className="text-sm font-semibold text-slate-900 animate-pulse">Scanning...</p>
                          ) : (
                            <>
                              <p className="text-sm font-semibold text-slate-900 mb-1">
                                Drop or <span className="text-rose-500">Select</span>
                              </p>
                              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.25em]">
                                PDF, DOCX • MAX 25MB
                              </p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="flex pt-12">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto min-w-[320px] bg-slate-900 hover:bg-slate-800 text-white h-20 text-xl font-semibold rounded-[1.5rem] transition-all duration-500 shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-4 group"
                >
                  {isSubmitting ? "Processing Application..." : "Submit Application"}
                  {!isSubmitting && <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Signifier */}
      <section className="pb-32">
        <div className="container">
          <div className="bg-slate-950 rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-transparent opacity-50" />
            <div className="relative z-10">
              <ShieldCheck className="w-20 h-20 text-rose-400 mx-auto mb-8" />
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Secured & <span className="text-rose-400">Private.</span></h2>
              <p className="text-slate-200/70 transition-all text-lg font-medium max-w-2xl mx-auto">
                Unity Group utilizes enterprise-grade encryption for all document transmissions. Your academic data is protected by the highest global security standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Users(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
