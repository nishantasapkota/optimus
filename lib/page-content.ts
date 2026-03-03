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
