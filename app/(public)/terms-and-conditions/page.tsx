import { PageHero } from "@/components/public/page-hero"

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        title={<>Terms & <span className="text-rose-400">Conditions</span></>}
        description="Clear guidelines that outline how we work together and how to use our services."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
        badge="Legal Framework"
      />

      <section className="py-20 md:py-24 bg-white">
        <div className="container max-w-4xl space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing or using Optimus Global services, you agree to these Terms & Conditions. If you do not agree, please discontinue use of our website and services.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">2. Services</h2>
            <p className="text-slate-600 leading-relaxed">
              We provide education counseling, admissions support, and related services. Service availability may vary by country, program, or partner institution.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">3. User Responsibilities</h2>
            <p className="text-slate-600 leading-relaxed">
              You agree to provide accurate, complete information and keep documents current. Any misuse, fraudulent submissions, or misrepresentation may lead to service refusal.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">4. Third-Party Institutions</h2>
            <p className="text-slate-600 leading-relaxed">
              Admissions decisions are made solely by partner institutions. We facilitate applications but cannot guarantee acceptance, timelines, or outcomes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">5. Changes to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update these terms to reflect service or legal changes. Continued use of the website after changes indicates acceptance of the updated terms.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-bold text-slate-900">Need clarity?</h3>
            <p className="mt-2 text-slate-600">
              If you have questions about these terms, please reach out through the Contact page and our team will assist you.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
