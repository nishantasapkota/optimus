import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { getBusinessDetails } from "@/lib/db-utils"
import Link from "next/link"
import Image from "next/image"

export async function Footer() {
  const details = await getBusinessDetails()

  const businessName = details?.name || "Unity Group"
  const firstName = businessName.split(" ")[0]

  const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Services", href: "/services" },
    { label: "Courses", href: "/courses" },
    { label: "Global Events", href: "/event" },
    { label: "Blogs", href: "/blogs" },
  ]

  const studentLinks = [
    { label: "Online Consultation", href: "/online-consultation" },
    { label: "Online Application", href: "/online-application" },
    { label: "Student Counseling", href: "/student-counseling" },
    { label: "Success Stories", href: "/#testimonials" },
    { label: "Contact Us", href: "/contact" },
  ]

  const legalLinks = [
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ]

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-[-5%] h-80 w-80 rounded-full bg-red-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0)_0%,rgba(15,23,42,0.55)_55%,rgba(2,6,23,0.95)_100%)]" />
      </div>

      <div className="container relative z-10 py-20 max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              {details?.logo ? (
                <Image
                  src={details.logo}
                  alt={businessName}
                  width={200}
                  height={60}
                  className="object-contain brightness-0 invert"
                />
              ) : (
                <div className="h-12 w-12 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shadow-2xl shadow-red-600/20">
                  {firstName[0]}
                </div>
              )}
            </Link>
            <p className="text-white/70 text-sm md:text-base leading-relaxed font-medium max-w-sm">
              Unity Group is the global architecture for educational success, bridging the gap between local potential and international excellence.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Facebook, href: details?.socialLinks?.facebook },
                { icon: Twitter, href: details?.socialLinks?.twitter },
                { icon: Instagram, href: details?.socialLinks?.instagram },
                { icon: Linkedin, href: details?.socialLinks?.linkedin },
                { icon: Youtube, href: details?.socialLinks?.youtube },
              ].map(
                (social, i) =>
                  social.href && (
                    <Link
                      key={i}
                      href={social.href}
                      target="_blank"
                      className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <social.icon className="h-5 w-5" />
                    </Link>
                  ),
              )}
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-5 lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">Explore</h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm font-semibold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Services */}
          <div className="space-y-5 lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">Student Services</h3>
            <ul className="space-y-3">
              {studentLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm font-semibold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5 lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">Contact</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-red-400" />
                </div>
                <span className="text-white/70 font-medium text-sm leading-relaxed">
                  {details?.address || "Kathmandu, Nepal"}
                </span>
              </div>
              {details?.phones?.map((phone, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-red-400" />
                  </div>
                  <span className="text-white/70 font-medium text-sm">{phone}</span>
                </div>
              ))}
              {details?.emails?.map((email, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-red-400" />
                  </div>
                  <span className="text-white/70 font-medium text-sm">{email}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 items-center">
          <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.25em]">
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/50 hover:text-white text-[11px] font-bold uppercase tracking-[0.25em] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
