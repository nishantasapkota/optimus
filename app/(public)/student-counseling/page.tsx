"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Sparkles, Users, GraduationCap, Globe, BookOpen, ArrowRight, Info } from "lucide-react"
import { PageHero } from "@/components/public/page-hero"

export default function StudentCounselingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    howDidYouKnow: "",
    referredBy: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/student-counseling", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      toast.success("Your counseling request has been submitted successfully.")

      setFormData({
        howDidYouKnow: "",
        referredBy: "",
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
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-0 bg-transparent">
      <PageHero 
        title={<>One-on-One <br /> <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">Expert Guidance.</span></>}
        description="Unlock your potential with personalized strategic counseling tailored to your global academic goals."
        breadcrumbItems={[{ label: "Mentorship Channel" }]}
        badge="Strategic Mentorship"
      />

      {/* Form Section */}
      <section className="py-24 md:py-32">
        <div className="container max-w-6xl">
          {/* Layout Container - NO transform here */}
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Context Sidebar - Sticky */}
            <aside className="lg:w-80 h-fit shrink-0 space-y-8 lg:sticky lg:top-24 self-start">
              <div className="space-y-6">
                <h2 className="text-4xl  font-bold text-blue-950 tracking-tight leading-tight">Start Your <br /><span className="text-red-600 underline">Strategic Path</span></h2>
                <p className="text-gray-500 font-medium leading-relaxed">Fill out the intelligence brief below. Our senior mentors will analyze your profile before our initial session.</p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Profile Analysis", icon: Users },
                  { title: "University Mapping", icon: MapPinIcon },
                  { title: "Visa Eligibility", icon: MapPinIcon }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-5 bg-gray-50 rounded-[1.5rem] group hover:bg-white hover:shadow-xl transition-all duration-500">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className=" font-bold uppercase tracking-widest text-[10px] text-blue-900">{item.title}</span>
                  </div>
                ))}
              </div>

              <div className="p-10 bg-red-50/50 rounded-[2.5rem] border border-red-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="w-12 h-12 text-red-600" />
                </div>
                <h4 className="text-red-600  font-bold text-sm mb-3 uppercase italic tracking-tighter">Fast Track</h4>
                <p className="text-blue-950  font-bold text-xl mb-4">Priority Response</p>
                <p className="text-blue-900/60 text-xs font-medium leading-relaxed mb-6">Our mentors respond within 24 business hours to all counseling requests.</p>
                <div className="w-12 h-1 bg-red-600/20 rounded-full" />
              </div>
            </aside>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="flex-1 space-y-12 bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-blue-900/5">
              
              {/* Source Tracking */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 ml-2">How did you hear about us?</label>
                  <Input 
                    name="howDidYouKnow"
                    value={formData.howDidYouKnow}
                    onChange={handleChange}
                    placeholder="e.g. Social Media, Friend, Event" 
                    className="bg-gray-50 h-16 rounded-2xl border-none focus:ring-2 focus:ring-red-600/10 px-6 font-bold text-blue-900" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 ml-2">Referred By (Optional)</label>
                  <Input 
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleChange}
                    placeholder="Name or Organization" 
                    className="bg-gray-50 h-16 rounded-2xl border-none focus:ring-2 focus:ring-red-600/10 px-6 font-bold text-blue-900" 
                  />
                </div>
              </div>

              {/* Identity */}
              <div className="space-y-8 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-red-600" />
                  <h3 className="text-xl  font-bold text-blue-950 uppercase tracking-tight">Identity Intelligence</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 ml-2">Full Legal Name</label>
                    <Input 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Legal Name" 
                      className="bg-gray-50/50 h-16 rounded-[1.25rem] border-gray-100 px-6 font-bold text-blue-900 focus:bg-white focus:ring-4 focus:ring-red-600/5 transition-all outline-none" 
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 ml-2">Primary Phone</label>
                    <Input 
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="Primary Phone" 
                      className="bg-gray-50/50 h-16 rounded-[1.25rem] border-gray-100 px-6 font-bold text-blue-900 focus:bg-white focus:ring-4 focus:ring-red-600/5 transition-all outline-none" 
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 ml-2">Professional Email</label>
                    <Input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Professional Email" 
                      className="bg-gray-50/50 h-16 rounded-[1.25rem] border-gray-100 px-6 font-bold text-blue-900 focus:bg-white focus:ring-4 focus:ring-red-600/5 transition-all outline-none" 
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 ml-2">Current Location</label>
                    <Input 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Current Location" 
                      className="bg-gray-50/50 h-16 rounded-[1.25rem] border-gray-100 px-6 font-bold text-blue-900 focus:bg-white focus:ring-4 focus:ring-red-600/5 transition-all outline-none" 
                    />
                  </div>
                </div>
              </div>

              {/* Academic Context */}
              <div className="space-y-8 pt-6 border-t border-gray-50">
                 <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-red-600" />
                  <h3 className="text-xl  font-bold text-blue-950 uppercase tracking-tight">Background & Targets</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 ml-2">Last Qualification</label>
                    <Input 
                      name="lastAcademicQualification"
                      value={formData.lastAcademicQualification}
                      onChange={handleChange}
                      placeholder="Last Qualification" 
                      className="bg-gray-50/50 h-16 rounded-[1.25rem] border-gray-100 px-6 font-bold text-blue-900 focus:bg-white focus:ring-4 focus:ring-red-600/5 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 ml-2">Scores (GPA/%)</label>
                    <Input 
                      name="academicScores"
                      value={formData.academicScores}
                      onChange={handleChange}
                      placeholder="Scores (GPA/%)" 
                      className="bg-gray-50/50 h-16 rounded-[1.25rem] border-gray-100 px-6 font-bold text-blue-900 focus:bg-white focus:ring-4 focus:ring-red-600/5 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 ml-2">Target Country</label>
                    <Input 
                      name="interestedCountry"
                      value={formData.interestedCountry}
                      onChange={handleChange}
                      placeholder="Target Country" 
                      className="bg-gray-50/50 h-16 rounded-[1.25rem] border-gray-100 px-6 font-bold text-blue-900 focus:bg-white focus:ring-4 focus:ring-red-600/5 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 ml-2">Preferred Major</label>
                    <Input 
                      name="interestedCourse"
                      value={formData.interestedCourse}
                      onChange={handleChange}
                      placeholder="Preferred Major" 
                      className="bg-gray-50/50 h-16 rounded-[1.25rem] border-gray-100 px-6 font-bold text-blue-900 focus:bg-white focus:ring-4 focus:ring-red-600/5 transition-all outline-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-blue-950 text-white h-20 text-xl  font-bold rounded-[2rem] transition-all duration-500 shadow-2xl shadow-red-600/20 flex items-center justify-center gap-4 group"
                >
                  {isSubmitting ? "Processing Request..." : "Secure My Consultation"}
                  {!isSubmitting && <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />}
                </Button>
                <p className="mt-6 text-[10px] text-center  font-bold uppercase tracking-[0.2em] text-gray-400 flex items-center justify-center gap-2">
                  <Info className="w-3 h-3" />
                  A mentor will contact you within 24 business hours.
                </p>
              </div>

            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

function MapPinIcon(props:any) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

