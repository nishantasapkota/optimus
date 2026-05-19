export type HomePageContent = {
  hero: {
    badge: string
    titlePrefix: string
    titleHighlight: string
    titleSuffix: string
    description: string
    ctaLabel: string
    floatingStats: {
      value: string
      labelTop: string
      labelBottom: string
    }[]
  }
  statsBar: {
    items: {
      value: string
      label: string
    }[]
  }
  destinations: {
    eyebrow: string
    title: string
    viewAllLabel: string
    items: {
      name: string
      image: string
    }[]
  }
  consultancy: {
    eyebrow: string
    title: string
    description: string
    stats: {
      value: string
      label: string
    }[]
    formTitle: string
    formDescription: string
    formButtonLabel: string
  }
  middleCta: {
    eyebrow: string
    title: string
    description: string
    primaryCtaLabel: string
    secondaryCtaLabel: string
  }
  features: {
    eyebrow: string
    title: string
    description: string
    items: {
      title: string
      description: string
    }[]
  }
  blog: {
    eyebrow: string
    title: string
    description: string
  }
  partners: {
    titlePrefix: string
    titleHighlight: string
    titleSuffix: string
    description: string
  }
  testimonials: {
    eyebrow: string
    titlePrefix: string
    titleHighlight: string
    description: string
  }
  contact: {
    eyebrow: string
    title: string
    description: string
    submitLabel: string
    mapStatLabel: string
    mapStatValue: string
  }
  ctaJourney: {
    title: string
    description: string
    buttonLabel: string
  }
}

export type AboutPageContent = {
  hero: {
    badge: string
    title: string
    description: string
  }
  whoWeAre: {
    eyebrow: string
    titlePrimary: string
    titleAccent: string
    description: string
    tags: string[]
    promiseTitle: string
    promiseText: string
  }
  story: {
    eyebrow: string
    title: string
    focusLabel: string
    focusText: string
    paragraphs: string[]
  }
  video: {
    eyebrow: string
    title: string
  }
  mission: {
    items: {
      title: string
      description: string
    }[]
  }
  team: {
    eyebrow: string
    title: string
    description: string
  }
}

export type FounderPageContent = {
  seo: {
    title: string
    description: string
  }
  hero: {
    badge: string
    title: string
    description: string
  }
  founder: {
    eyebrow: string
    name: string
    role: string
    paragraphs: string[]
    highlight: string
    quote: string
  }
}

export type LegalPageContent = {
  hero: {
    badge: string
    title: string
    highlight: string
    description: string
  }
  body: string
}

export const homeDefaultContent: HomePageContent = {
  hero: {
    badge: "2025",
    titlePrefix: "Applications are open for",
    titleHighlight: "2025",
    titleSuffix: "intake",
    description:
      "Take the first step towards your global education. Our experts are here to guide you through every step of the process.",
    ctaLabel: "Check For Your Eligibility",
    floatingStats: [
      {
        value: "700+",
        labelTop: "Partners",
        labelBottom: "Worldwide",
      },
      {
        value: "12y",
        labelTop: "Experience",
        labelBottom: "Trusted Advice",
      },
    ],
  },
  statsBar: {
    items: [
      {
        value: "700+",
        label: "Global Partners",
      },
      {
        value: "6000+",
        label: "Students Guided",
      },
      {
        value: "2021",
        label: "Estd. Date",
      },
      {
        value: "15000+",
        label: "Applications",
      },
    ],
  },
  destinations: {
    eyebrow: "Study Abroad",
    title: "Choose the destination you want to study",
    viewAllLabel: "View All",
    items: [
      {
        name: "USA",
        image: "/destinations/usa.png",
      },
      {
        name: "Australia",
        image: "/destinations/australia.png",
      },
      {
        name: "Germany",
        image: "/destinations/germany.png",
      },
      {
        name: "Canada",
        image: "/destinations/canada.png",
      },
    ],
  },
  consultancy: {
    eyebrow: "About Us",
    title: "We are an Educational Consultancy",
    description:
      "Optimus Global is a premier educational consultancy dedicated to helping students achieve their dreams of studying abroad. With years of experience and a track record of success, we provide comprehensive guidance and support throughout your educational journey.",
    stats: [
      {
        value: "700+",
        label: "Global Partners",
      },
      {
        value: "6000+",
        label: "Students Guided",
      },
      {
        value: "15000+",
        label: "Applications",
      },
    ],
    formTitle: "Book an appointment",
    formDescription: "Fill out the form below to schedule a free consultation.",
    formButtonLabel: "Book An Appointment",
  },
  middleCta: {
    eyebrow: "Optimus",
    title: "We are an Educational Consultancy",
    description:
      "Our team of experts is dedicated to providing you with the best guidance and support for your international education journey.",
    primaryCtaLabel: "Contact Us",
    secondaryCtaLabel: "Services",
  },
  features: {
    eyebrow: "Our Services",
    title: "Services we provide",
    description: "Comprehensive support for every aspect of your international education journey.",
    items: [
      {
        title: "Visa Preparation",
        description: "Expert guidance for your visa application process with high success rates.",
      },
      {
        title: "Test Interpretation",
        description: "Understanding your test scores and how they affect your applications.",
      },
      {
        title: "Pre-Departure and Post-Departure",
        description: "Support before you leave and after you arrive at your destination.",
      },
      {
        title: "Logistics training",
        description: "Practical training for managing your logistics in a new country.",
      },
    ],
  },
  blog: {
    eyebrow: "Blogs",
    title: "Insights & Resources",
    description: "Stay updated with the latest trends and guides in international education.",
  },
  partners: {
    titlePrefix: "Our Leading",
    titleHighlight: "Partner",
    titleSuffix: "Universities",
    description: "Optimus Global is proud to be officially representative of prestigious institutions worldwide.",
  },
  testimonials: {
    eyebrow: "Success Stories",
    titlePrefix: "Voice of Our",
    titleHighlight: "Scholars",
    description:
      "Real experiences from students who transformed their global education dreams into reality with Optimus Global.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Contact Us",
    description: "Reach out to us for any inquiries or support throughout your journey.",
    submitLabel: "Send Message",
    mapStatLabel: "Success Rate",
    mapStatValue: "98% Satisfied Students",
  },
  ctaJourney: {
    title: "Book a free consultation",
    description:
      "Take the first step towards your global education destiny. Our expertos are here to guide you through every step of the process.",
    buttonLabel: "Start Your Journey With Us",
  },
}

export const termsDefaultContent: LegalPageContent = {
  hero: {
    badge: "Legal Framework",
    title: "Terms &",
    highlight: "Conditions",
    description: "Clear guidelines that outline how we work together and how to use our services.",
  },
  body: `
    <h2>1. Acceptance of Terms</h2>
    <p>By accessing or using Optimus Global services, you agree to these Terms &amp; Conditions. If you do not agree, please discontinue use of our website and services.</p>
    <h2>2. Services</h2>
    <p>We provide education counseling, admissions support, and related services. Service availability may vary by country, program, or partner institution.</p>
    <h2>3. User Responsibilities</h2>
    <p>You agree to provide accurate, complete information and keep documents current. Any misuse, fraudulent submissions, or misrepresentation may lead to service refusal.</p>
    <h2>4. Third-Party Institutions</h2>
    <p>Admissions decisions are made solely by partner institutions. We facilitate applications but cannot guarantee acceptance, timelines, or outcomes.</p>
    <h2>5. Changes to Terms</h2>
    <p>We may update these terms to reflect service or legal changes. Continued use of the website after changes indicates acceptance of the updated terms.</p>
    <h3>Need clarity?</h3>
    <p>If you have questions about these terms, please reach out through the Contact page and our team will assist you.</p>
  `.trim(),
}

export const privacyDefaultContent: LegalPageContent = {
  hero: {
    badge: "Data Protection",
    title: "Privacy",
    highlight: "Policy",
    description: "How we collect, use, and protect your information across our services.",
  },
  body: `
    <h2>1. Information We Collect</h2>
    <p>We collect information you provide directly, such as contact details, academic history, and documents submitted through forms and applications.</p>
    <h2>2. How We Use Information</h2>
    <p>Your information is used to deliver counseling services, submit applications to partner institutions, and communicate updates relevant to your journey.</p>
    <h2>3. Sharing &amp; Disclosure</h2>
    <p>We share data only with trusted partners and service providers as required to deliver services. We do not sell personal information.</p>
    <h2>4. Data Security</h2>
    <p>We implement administrative and technical safeguards to protect your data. While no system is fully secure, we continuously improve our protections.</p>
    <h2>5. Your Choices</h2>
    <p>You may request updates or deletion of your information subject to applicable laws and institutional requirements.</p>
    <h3>Questions about privacy?</h3>
    <p>Contact us via the Contact page and we will assist you with privacy-related requests.</p>
  `.trim(),
}

export const aboutDefaultContent: AboutPageContent = {
  hero: {
    badge: "Institutional Grade Excellence",
    title: "About Us",
    description: "Empowering students to achieve their global academic dreams through expert guidance and support.",
  },
  whoWeAre: {
    eyebrow: "Who we are",
    titlePrimary: "Building Connections,",
    titleAccent: "Creating Impact",
    description:
      "Optimus Global Now offers accommodation services. 100% FREE Education Counselling and Application Processing. We bridge the gap between your aspirations and world-class educational opportunities.",
    tags: ["100% Free Counselling", "Accommodation Support", "Application Processing"],
    promiseTitle: "Our Promise",
    promiseText: "We bridge the gap between your aspirations and world-class educational opportunities.",
  },
  story: {
    eyebrow: "Our Story",
    title: "About us",
    focusLabel: "Our Focus",
    focusText: "Guidance that keeps pace with a fast moving world.",
    paragraphs: [
      "In today's fast moving world it is not at all possible or prudent to do all personal investments on your own. Only today's fast moving world it is not at all possible or prudent to do all personal investments on your own. One can't keep pace with the quick moving markets and data stream on an everyday promise can I keep pace with the quick moving markets and data stream on an everyday promise.",
      "In today's fast moving world it is not at all possible or prudent to do all personal investments on your own. One can't keep pace with the quick moving markets and data stream on an everyday promise.",
    ],
  },
  video: {
    eyebrow: "Inside Optimus",
    title: "A closer look at how we guide students.",
  },
  mission: {
    items: [
      {
        title: "Mission",
        description:
          "Our mission is to empower students through personalized guidance and seamless application processing.",
      },
      {
        title: "Values",
        description: "We prioritize integrity, excellence, and student-centric support in every step of our journey.",
      },
      {
        title: "Vision",
        description:
          "To be the most trusted portal for global education, creating a worldwide network of successful scholars.",
      },
    ],
  },
  team: {
    eyebrow: "Leadership",
    title: "Our Team",
    description: "Dedicated to guiding students at every step of their global education journey.",
  },
}

export const founderDefaultContent: FounderPageContent = {
  seo: {
    title: "Ashim Sharma Mainali | Founder of Optimus Global",
    description:
      "Learn about Ashim Sharma Mainali, CEO and Founder of Optimus Global Education Consultancy Pvt. Ltd., and his journey supporting Nepalese students abroad.",
  },
  hero: {
    badge: "Founder Story",
    title: "Meet the founder behind Optimus Global.",
    description:
      "A student-first journey that grew into an education consultancy helping Nepalese students navigate admissions, scholarships, visas, and career planning.",
  },
  founder: {
    eyebrow: "Meet the Founder",
    name: "Ashim Sharma Mainali",
    role: "CEO & Founder - Optimus Global Education Consultancy Pvt. Ltd.",
    paragraphs: [
      "Ashim started his journey at a young age after facing the same difficulties countless Nepali students encounter while researching foreign universities. What began as a student-focused mobile app evolved into a full-fledged consultancy that has helped hundreds of students pursue international education.",
      "A mentor, entrepreneur, and student counselor, Ashim brings 7+ years of expertise across admissions, scholarships, visas, and career planning.",
    ],
    highlight: "7+ years of expertise",
    quote:
      "We don't just send students abroad - we help create globally educated individuals who can one day transform Nepal.",
  },
}

function mergeDeep<T>(base: T, incoming: Partial<T> | undefined): T {
  if (incoming === undefined) {
    return base
  }

  if (Array.isArray(base)) {
    return (Array.isArray(incoming) ? (incoming as T) : base)
  }

  if (typeof base === "object" && base !== null) {
    const result: Record<string, any> = Array.isArray(base) ? [] : { ...base }
    const incomingRecord = (incoming ?? {}) as Record<string, any>

    Object.keys(base as Record<string, any>).forEach((key) => {
      result[key] = mergeDeep((base as Record<string, any>)[key], incomingRecord[key])
    })

    Object.keys(incomingRecord).forEach((key) => {
      if (!(key in result)) {
        result[key] = incomingRecord[key]
      }
    })

    return result as T
  }

  return (incoming ?? base) as T
}

export function mergeHomeContent(incoming?: Partial<HomePageContent>) {
  return mergeDeep(homeDefaultContent, incoming)
}

export function mergeAboutContent(incoming?: Partial<AboutPageContent>) {
  return mergeDeep(aboutDefaultContent, incoming)
}

export function mergeFounderContent(incoming?: Partial<FounderPageContent>) {
  return mergeDeep(founderDefaultContent, incoming)
}

export function mergeTermsContent(incoming?: Partial<LegalPageContent>) {
  return mergeDeep(termsDefaultContent, incoming)
}

export function mergePrivacyContent(incoming?: Partial<LegalPageContent>) {
  return mergeDeep(privacyDefaultContent, incoming)
}
