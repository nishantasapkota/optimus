import { normalizeBusinessOffices } from "@/lib/business-contact"
import type { BusinessDetails } from "@/lib/db-utils"
import { absoluteUrl, siteName } from "@/lib/seo"

function sanitizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "")
}

function buildPostalAddress(address: string) {
  return {
    "@type": "PostalAddress",
    streetAddress: address,
    addressCountry: "NP",
  }
}

export function buildSitewideJsonLd(details?: BusinessDetails | null) {
  const offices = normalizeBusinessOffices(details)
  const sameAs = Object.values(details?.socialLinks ?? {}).filter(Boolean)
  const phones = (details?.phones ?? []).filter(Boolean)
  const emails = (details?.emails ?? []).filter(Boolean)
  const firstOffice = offices[0]

  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": absoluteUrl("/#organization"),
    name: details?.name || siteName,
    url: absoluteUrl("/"),
    logo: absoluteUrl(details?.logo || "/placeholder-logo.png"),
    description:
      "Optimus Global provides study abroad counselling, admissions support, visa guidance, and education consulting for international students.",
    telephone: phones[0] ? sanitizePhone(phones[0]) : undefined,
    email: emails[0],
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    address: firstOffice?.address ? buildPostalAddress(firstOffice.address) : undefined,
    contactPoint:
      phones.length > 0 || emails.length > 0
        ? [
            {
              "@type": "ContactPoint",
              contactType: "customer support",
              telephone: phones[0] ? sanitizePhone(phones[0]) : undefined,
              email: emails[0],
              areaServed: ["NP"],
              availableLanguage: ["English", "Nepali"],
            },
          ]
        : undefined,
    department:
      offices.length > 0
        ? offices.map((office) => ({
            "@type": "EducationalOrganization",
            name: `${details?.name || siteName} - ${office.label}`,
            address: buildPostalAddress(office.address),
            telephone: office.phones[0] ? sanitizePhone(office.phones[0]) : undefined,
            email: office.emails[0],
          }))
        : undefined,
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: details?.name || siteName,
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
  }

  return [organization, website]
}

export function buildBreadcrumbJsonLd(
  items: Array<{
    name: string
    path: string
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
