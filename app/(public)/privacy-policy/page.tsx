import { PageHero } from "@/components/public/page-hero"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        title={<>Privacy <span className="text-rose-400">Policy</span></>}
        description="How we collect, use, and protect your information across our services."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
        badge="Data Protection"
      />

      <section className="py-20 md:py-24 bg-white">
        <div className="container max-w-4xl space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">1. Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed">
              We collect information you provide directly, such as contact details, academic history, and documents submitted through forms and applications.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">2. How We Use Information</h2>
            <p className="text-slate-600 leading-relaxed">
              Your information is used to deliver counseling services, submit applications to partner institutions, and communicate updates relevant to your journey.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">3. Sharing & Disclosure</h2>
            <p className="text-slate-600 leading-relaxed">
              We share data only with trusted partners and service providers as required to deliver services. We do not sell personal information.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">4. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We implement administrative and technical safeguards to protect your data. While no system is fully secure, we continuously improve our protections.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">5. Your Choices</h2>
            <p className="text-slate-600 leading-relaxed">
              You may request updates or deletion of your information subject to applicable laws and institutional requirements.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-bold text-slate-900">Questions about privacy?</h3>
            <p className="mt-2 text-slate-600">
              Contact us via the Contact page and we will assist you with privacy-related requests.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
