import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { getBusinessDetails } from "@/lib/db-utils"
import Link from "next/link"
import Image from "next/image"

export async function Footer() {
  const details = await getBusinessDetails()

    const businessName = details?.name || "Unity Group"
  const firstName = businessName.split(" ")[0]

  return (
    <footer className="bg-blue-950 text-white py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Brand Brief */}
          <div className="md:col-span-4 space-y-8">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              {details?.logo ? (
                <Image src={details.logo} alt={businessName} width={250} height={100} className="object-contain brightness-0 invert" />
              ) : (
                <div className="h-12 w-12 rounded-xl bg-red-600 flex items-center justify-center text-white  font-bold transform -skew-x-6 shadow-2xl shadow-red-600/20">
                  {firstName[0]}
                </div>
              )}
            </Link>
            <p className="text-blue-100/60 text-lg font-medium leading-relaxed">
              Unity Group is the global architecture for educational success, bridging the gap between local potential and international excellence.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: details?.socialLinks?.facebook },
                { icon: Twitter, href: details?.socialLinks?.twitter },
                { icon: Instagram, href: details?.socialLinks?.instagram },
                { icon: Linkedin, href: details?.socialLinks?.linkedin },
                { icon: Youtube, href: details?.socialLinks?.youtube }
              ].map((social, i) => social.href && (
                <Link 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-100 hover:bg-red-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="md:col-span-2 space-y-8">
            <h3 className="text-xs  font-bold uppercase tracking-[0.3em] text-red-600">Intelligence</h3>
            <ul className="space-y-4">
              {[
                { label: "Our Story", href: "/about-us" },
                { label: "Services", href: "/services" },
                { label: "Courses", href: "/courses" },
                { label: "Global Events", href: "/event" },
                { label: "Knowledge Hub", href: "/blogs" },
                { label: "Portal Access", href: "/online-application" }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-blue-100/40 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Infrastructure */}
          <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
               <h3 className="text-xs  font-bold uppercase tracking-[0.3em] text-red-600">Headquarters</h3>
               <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-red-500" />
                    </div>
                    <span className="text-blue-100/80 font-medium text-sm leading-relaxed">{details?.address || "Kathmandu, Nepal"}</span>
                 </div>
                 {details?.phones?.map((phone, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-red-500" />
                      </div>
                      <span className="text-blue-100/80 font-medium text-sm">{phone}</span>
                   </div>
                 ))}
               </div>
            </div>

            <div className="space-y-8">
               <h3 className="text-xs  font-bold uppercase tracking-[0.3em] text-red-600">Digital Support</h3>
               <div className="space-y-6">
                 {details?.emails?.map((email, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-red-500" />
                      </div>
                      <span className="text-blue-100/80 font-medium text-sm">{email}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-8 items-center">
          <p className="text-blue-100/30 text-[10px]  font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {businessName}. Unified Intelligence System.
          </p>
          <div className="flex gap-10">
            <span className="text-blue-100/30 text-[10px]  font-bold uppercase tracking-[0.2em] cursor-pointer hover:text-red-500 transition-colors">Safety Protocols</span>
            <span className="text-blue-100/30 text-[10px]  font-bold uppercase tracking-[0.2em] cursor-pointer hover:text-red-500 transition-colors">Digital Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
